// Summarizer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import type { Chat, OptimizedMessage } from '../scripts/jsonToLLM';
import { optimizeChatsForLLM } from '../scripts/jsonToLLM';

const Summarizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [batchProgress, setBatchProgress] = useState('');
  const engineRef = useRef<any>(null);

  useEffect(() => {
    initEngine();
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setSummary('');
    setBatchProgress('');

    const systemPrompt = {
      role: 'system',
      content: 'You are a chat summarizer. Given a file containing whatsapp data, provide a summary of the conversation. Make the summary stuctured like a story of the input conversation. Give the summary inside the JSON object like {"title": "...", "summary": "...", "highlights": ["...", "..."]}'
    };

    try {
      // Parse input JSON and optimize
      const chatData: Chat[] = JSON.parse(input);
      const optimizedBatches = optimizeChatsForLLM(chatData);
      
      // Process each batch
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

      // Combine summaries if there were multiple batches
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
      setSummary('Error generating summary. Please ensure valid JSON input and try again.');
    } finally {
      setIsLoading(false);
      setBatchProgress('');
    }
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded h-40 mb-2"
          placeholder="Paste your JSON here..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          Summarize JSON
        </button>
      </form>
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