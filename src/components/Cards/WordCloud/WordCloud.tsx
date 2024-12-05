import React, { useEffect, useState } from 'react';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import styles from './WordCloud.module.css';

interface WordData {
  text: string;
  value: number;
}

const WordCloudCard = () => {
  const [words, setWords] = useState<WordData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const excludeWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 
    'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there',
    'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
    'which', 'go', 'me', 'is', 'was', 'just', 'like', 'can', 'into'
  ]);

  const findTopWords = (jsonData: Record<string, { content: { text: string } }>) => {
    const wordCounts: { [key: string]: number } = {};
    
    for (const key in jsonData) {
      if (jsonData[key] && jsonData[key]['content']['text']) {
        const message = jsonData[key]['content']['text'].toLowerCase();
        const words = message.split(/\s+/);

        for (let word of words) {
          word = word.replace(/[.,!?'"()]/g, '');
          
          if (word.length < 3 || excludeWords.has(word) || /^\d+$/.test(word)) {
            continue;
          }

          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      }
    }

    const wordcloudData = Object.entries(wordCounts)
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0,30);

    setWords(wordcloudData);
    setIsLoaded(true);
  };

  useEffect(() => {
    const blob = window.sessionStorage.getItem('message_json');
    const jsonblob = JSON.parse(blob || '{}');
    findTopWords(jsonblob);
  }, []);

  if (!isLoaded) {
    return <div></div>;
  }

  const width = 400;
  const height = 400;

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map(w => w.value)),
      Math.max(...words.map(w => w.value))
    ],
    range: [20, 60]
  });

  const getColor = (i: number) => {
    const colors = ['#25DEC0', '#E52082'];
    return colors[i % colors.length];
  };

  return (
    <div className={styles.statBlock}>
      <h3 className={styles.desc}>frequently used words...</h3>
      <div className={styles.cloudContainer}>
        <svg width={width} height={height}>
          <Wordcloud
            words={words}
            width={width}
            height={height}
            fontSize={(w) => fontScale(w.value)}
            spiral="rectangular"
            rotate={0}
          >
            {(cloudWords) =>
              cloudWords.map((w, i) => (
                <Text
                  key={w.text}
                  fill={getColor(i)}
                  textAnchor="middle"
                  transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                  fontSize={w.size}
                  fontFamily="sans-serif"
                >
                  {w.text}
                </Text>
              ))
            }
          </Wordcloud>
        </svg>
      </div>
    </div>
  );
};

export default WordCloudCard;