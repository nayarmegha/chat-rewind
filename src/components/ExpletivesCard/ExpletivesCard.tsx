import React, { useEffect, useState } from 'react';
import retro from '../../assets/retrostripes.svg';
import styles from './ExpletivesCard.module.css';

const ExpletivesCard = () => {
  const [topExpletive, setTopExpletive] = useState({ word: '', count: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Dictionary of expletives to track
  const expletiveDict = {
    'damn': 0,
    'hell': 0,
    'shoot': 0,
    'crap': 0,
  };

  const findMostUsedExpletive = (jsonData) => {
    const wordCounts = { ...expletiveDict };
    //console.log('jsonData:', jsonData);
    //console.log('wordCounts:', wordCounts); 
    // Count occurrences in messages
    for (const key in jsonData) {
      // Check if message has text property and it's not undefined
      //console.log('jsonData[key]:', jsonData[key]);
      //console.log('jsonData[key][text]:', jsonData[key]['content']['text']);
      if (jsonData[key] && jsonData[key]['content']['text']) {
        const message = jsonData[key]['content']['text'];
        const words = message.split(' ');
        console.log('words:', words);
        // Check each word in the message
        for (const messageWord of words) {
          // Clean the word of any punctuation
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

    setTopExpletive({ word: maxWord, count: maxCount });
    console.log('Most used expletive:', maxWord, maxCount);
    setIsLoaded(true);
  };

  useEffect(() => {
    const blob = window.sessionStorage.getItem('message_json');
    const jsonblob = JSON.parse(blob);
    console.log('jsonblob:', jsonblob);
    findMostUsedExpletive(jsonblob);
  }, []);

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>most used expletive</h3>
        <h1 className={styles['number']}>{topExpletive.word}</h1>
        <h1 className={styles['stat']}>used {topExpletive.count} times</h1>
      </div>
      <div className={styles['card-right']}>
        <img src={retro.src} alt='retro'/>
      </div>
    </div>
  );
};

export default ExpletivesCard;