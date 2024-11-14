import { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import type { Chat } from '../scripts/jsonToLLM.ts';
import { optimizeChatsForLLM } from '../scripts/jsonToLLM.ts';
import SummaryCard from './SummaryCard';

const CONTEXT_WINDOW = 2500; // setting a conservative context window (max no of tokens the model can process at once)
const MODEL_NAME = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

const DEFAULT_SUMMARY = {
  title: "No Data Available",
  summary: "No chat data found. Please upload a chat file first.",
  highlights: [],
  coverage: "0%"
};

const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are a chat summarizer that creates summaries. You are given a json input of format {"n": "m"} where n is the name and m is the message content.
            Follow these rules strictly:
            1. Title must be under 50 characters
            2. Summary about 300 characters
            3. Exactly 3 highlights, about 100 characters
            4. Output must be complete, valid JSON matching this structure:
            {
              "title": "Brief title",
              "summary": "Concise summary",
              "highlights": ["key point 1", "key point 2", "key point 3"],
            }
            5. Address sender by name in the summary`
};

type LoadingState = {
  isLoading: boolean;
  progress: string;
};

const Summarizer = () => {
  const [summary, setSummary] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false, progress: '' });
  const engineRef = useRef(null);  // ref to maintain ML engine instance across renders

  // initialize the ML engine and process data when component mounts
  useEffect(() => {
    (async () => {
      setLoadingState({ isLoading: true, progress: 'Initializing Summarizer...' });
      
      try {
        engineRef.current = await CreateMLCEngine(MODEL_NAME, {
          initProgressCallback: (p) => {
            setLoadingState(prev => ({ 
              ...prev, 
              progress: `Loading model: ${(p.progress * 100).toFixed(2)}%` 
            }));
          }
        });

        // check and retrieve chat data is available in session storage
        const storedData = sessionStorage.getItem('message_json');
        if (!storedData) {
          setSummary(JSON.stringify(DEFAULT_SUMMARY));
          return;
        }

        const chatData: Chat[] = JSON.parse(storedData);
        await generateSummary(chatData);
      } catch (error) {
        console.error('Initialization error:', error);
        setSummary(JSON.stringify({
          ...DEFAULT_SUMMARY,
          summary: "Error initializing. Please try again."
        }));
      } finally {
        setLoadingState(prev => ({ ...prev, isLoading: false }));
      }
    })();
  }, []);

  // generate summary from chat data
  const generateSummary = async (chatData: Chat[]) => {
    try {
      // For this implementation, we are just messages that fit within context window
      // batch processing to summarize entire text paused for now : current model only has context window 4096 tokens
      const messagesInContextWindow = optimizeChatsForLLM(chatData, CONTEXT_WINDOW);
      const totalMessages = chatData.length;
      const summarizedMessages = messagesInContextWindow.length;
      const percentageCovered = ((summarizedMessages / totalMessages) * 100).toFixed(1);

      setLoadingState(prev => ({ 
        ...prev, 
        progress: `Summarizing ${summarizedMessages} messages (${percentageCovered}% of total)...` 
      }));
      console.log('Messages in context window:', messagesInContextWindow);
      const chatInput = {
        messages: messagesInContextWindow,
        stats: {
          total: totalMessages,
          summarized: summarizedMessages,
          coverage: `${percentageCovered}%`
        }
      };
      console.log('Chat input:', chatInput);
      const response = await engineRef.current.chat.completions.create({
        messages: [
          SYSTEM_PROMPT,
          { role: 'user', content: JSON.stringify(chatInput.messages) }
        ],
        temperature: 0.1,
        max_tokens: 800,
        response_format: { type: "json_object" }
      });
      console.log('Summary response:', response);

      const summaryObj = JSON.parse(response.choices[0].message.content);
      setSummary(JSON.stringify({
        ...summaryObj,
      }, null, 2));

    } catch (error) {
      console.error('Summary generation error:', error);
      setSummary(JSON.stringify({
        ...DEFAULT_SUMMARY,
        title: "Error Generating Summary",
        summary: "An error occurred while generating the summary. Please try again."
      }));
    }
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex-grow overflow-y-auto p-2">
        {loadingState.isLoading ? (
          <div className="text-[#FBFEF2]">{loadingState.progress}</div>
        ) : (
          summary && <SummaryCard summary={summary} />
        )}
      </div>
    </div>
  );
};

export default Summarizer;