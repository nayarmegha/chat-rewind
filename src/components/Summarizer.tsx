import React, { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import type { Chat } from '../scripts/jsonToLLM.ts';
import { optimizeChatsForLLM } from '../scripts/jsonToLLM.ts';

const Summarizer: React.FC = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [batchProgress, setBatchProgress] = useState('');
  const engineRef = useRef<any>(null);

  useEffect(() => {
    const initAndProcess = async () => {
      await initEngine();
      await processStoredData();
    };

    initAndProcess();
  }, []);

  const initEngine = async () => {
    setIsLoading(true);
    setProgress('Initializing Summarizer...');
    
    try {
      engineRef.current = await CreateMLCEngine(
        "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
        {
          initProgressCallback: (p) => {
            setProgress(`Loading model: ${(p.progress * 100).toFixed(2)}%`);
          }
        }
      );
      setProgress('Model loaded successfully!');
    } catch (error) {
      console.error('Error initializing WebLLM engine:', error);
      setProgress('Error loading model. Please try again.');
    }
  };

  const processStoredData = async () => {
    try {
      setProgress('Fetching chat data...');
      const storedData = sessionStorage.getItem('message_json');
      
      if (!storedData) {
        setSummary('No chat data found. Please upload a chat file first.');
        setIsLoading(false);
        return;
      }

      // Parse the stored JSON data
      const chatData: Chat[] = JSON.parse(storedData);
      
      setProgress('Generating summary...');
      await generateSummary(chatData);
      
    } catch (error) {
      console.error('Error processing stored data:', error);
      setSummary('Error processing chat data. Please try uploading the file again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = async (chatData: Chat[]) => {
    const systemPrompt = {
      role: 'system',
      content: 'You are a chat summarizer. Given a file containing whatsapp data, provide a summary of the conversation. Make the summary stuctured like a story of the input conversation. Give the summary inside the JSON object like {"title": "...", "summary": "...", "highlights": ["...", "..."]}'
    };

    try {
      const optimizedBatches = optimizeChatsForLLM(chatData);
      const allSummaries = [];
      
      for (let i = 0; i < optimizedBatches.length; i++) {
        setBatchProgress(`Processing batch ${i + 1} of ${optimizedBatches.length}...`);
        
        const response = await engineRef.current.chat.completions.create({
          messages: [
            systemPrompt,
            { role: 'user', content: JSON.stringify(optimizedBatches[i]) }
          ],
          temperature: 0.5,
          max_tokens: 1000,
          response_format: { type: "json_object" }
        });

        const summaryObj = JSON.parse(response.choices[0].message.content);
        allSummaries.push(summaryObj);
      }

      if (allSummaries.length > 1) {
        const combinedSummary = {
          title: "Chat Summary (Multiple Parts)",
          summary: allSummaries.map(s => s.summary).join('\n\n'),
          highlights: allSummaries.flatMap(s => s.highlights),
          sarcastic_comment: allSummaries.map(s => s.sarcastic_comment).join('\n')
        };
        setSummary(JSON.stringify(combinedSummary, null, 2));
      } else {
        setSummary(JSON.stringify(allSummaries[0], null, 2));
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Error generating summary. Please try again.');
    }
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex-grow overflow-y-auto p-2 border rounded">
        <h2 className="text-xl font-bold mb-2">Summary:</h2>
        {isLoading ? (
          <div>
            <div>{progress}</div>
            {batchProgress && <div className="mt-2">{batchProgress}</div>}
          </div>
        ) : (
          <pre className="whitespace-pre-wrap">{summary}</pre>
        )}
      </div>
    </div>
  );
};

export default Summarizer;