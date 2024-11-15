import React, { useEffect, useState } from 'react';
import styles from './Expletives.module.css';

const ExpletivesCard = () => {
  const [topExpletive, setTopExpletive] = useState({ word: '', count: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Dictionary of expletives to track
  const expletiveDict = {
    'damn': 0,
    'hell': 0,
    'shoot': 0,
    'crap': 0,
    'wtf': 0,
    'fuck' : 0,
    'shit' : 0,
    '🖕🏼' : 0,
    '🤬' : 0
  };

  const findMostUsedExpletive = (jsonData) => {
    const wordCounts = { ...expletiveDict };
    // Count occurrences in messages
    for (const key in jsonData) {
      if (jsonData[key] && jsonData[key]['content']['text']) {
        const message = jsonData[key]['content']['text'];
        const words = message.split(' ');

        for (const messageWord of words) {
          const cleanWord = messageWord.replace(/[.,!?]/, '');
          
          // If the word is in our dictionary, increment its count
          if (Object.prototype.hasOwnProperty.call(wordCounts, cleanWord)) {
            wordCounts[cleanWord] += 1;
          }
        }
      }
    }

    // Find the most used expletive
    let maxWord = '';
    let maxCount = 0;
    
    for (const word in wordCounts) {
      if (wordCounts[word] > maxCount) {
        maxCount = wordCounts[word];
        maxWord = word;
      }
    }

     if (maxCount === 0) {
      setTopExpletive({ word: 'No expletives in chat ✅', count: 0 });
    } else {
      setTopExpletive({ word: maxWord, count: maxCount });
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    const blob = window.sessionStorage.getItem('message_json');
    const jsonblob = JSON.parse(blob);
    findMostUsedExpletive(jsonblob);
  }, []);

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className={styles.statBlock}>
      <h3 className={styles.desc}>most used expletive</h3>
      <h1 className={styles.number}>{topExpletive.word}</h1>
      {topExpletive.count > 0 && (
        <h1 className={styles.stat}> used {topExpletive.count} times 🤬</h1>
      )}
    </div>
  );
};

export default ExpletivesCard;