import { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import type { Chat } from '../scripts/jsonToLLM.ts';
import { optimizeChatsForLLM } from '../scripts/jsonToLLM.ts';
import SummaryCard from './SummaryCard';

const CONTEXT_WINDOW = 3000; // setting a conservative context window (max no of tokens the model can process at once)
const MODEL_NAME = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

const DEFAULT_SUMMARY = {
  title: "No Data Available",
  summary: "No chat data found. Please upload a chat file first.",
  highlights: [],
  coverage: "0%"
};

const SYSTEM_PROMPT = {
  role: 'system',
  content: 'You are a chat summarizer. Summarize the WhatsApp conversation, focusing on key themes and notable exchanges. Format output as JSON: {"title": "<brief title>", "summary": "<concise story>", "highlights": ["2-3 key points"]}'
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
      const messagesInContextWindow = optimizeChatsForLLM(chatData, CONTEXT_WINDOW)[0];
      console.log("Messages in context window: ", messagesInContextWindow);
      const totalMessages = chatData.length;
      const summarizedMessages = messagesInContextWindow.length;
      const percentageCovered = ((summarizedMessages / totalMessages) * 100).toFixed(1);

      setLoadingState(prev => ({ 
        ...prev, 
        progress: `Summarizing ${summarizedMessages} messages (${percentageCovered}% of total)...` 
      }));

      const chatInput = {
        messages: messagesInContextWindow.map(m => `${m.n}: ${m.m}`),
        stats: {
          total: totalMessages,
          summarized: summarizedMessages,
          coverage: `${percentageCovered}%`
        }
      };

      const response = await engineRef.current.chat.completions.create({
        messages: [
          SYSTEM_PROMPT,
          { role: 'user', content: JSON.stringify(chatInput) }
        ],
        temperature: 0.5,
        max_tokens: 800,
        response_format: { type: "json_object" }
      });

      const summaryObj = JSON.parse(response.choices[0].message.content);
      console.log("Summary response: ", summaryObj);
      setSummary(JSON.stringify({
        ...summaryObj,
        coverage: `This summary covers the last ${summarizedMessages} messages (${percentageCovered}% of the total ${totalMessages} messages)`
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