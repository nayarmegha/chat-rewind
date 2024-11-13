import React, { useEffect, useState } from 'react';
import styles from './BiggestYapperCard.module.css';

const BiggestYapperCard = () => {
  const [biggestYapper, setBiggestYapper] = useState({
    name: '',
    count: 0,
    percentage: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const findBiggestYapper = (jsonData) => {
    // create a map to store message counts per person
    const messageCounts = new Map();
    let totalMessages = 0;

    // count messages for each person
    for (const message of jsonData) {
      const sender = message.name;
      if (sender) {  // make sure there's a valid sender
        messageCounts.set(
          sender, 
          (messageCounts.get(sender) || 0) + 1
        );
        totalMessages++;
      }
    }

    // find the person with most messages
    let maxCount = 0;
    let maxSender = '';
    
    messageCounts.forEach((count, sender) => {
      if (count > maxCount) {
        maxCount = count;
        maxSender = sender;
      }
    });

    // get percentage of total messages
    const percentage = ((maxCount / totalMessages) * 100).toFixed(1);

    setBiggestYapper({
      name: maxSender,
      count: maxCount,
      percentage: Number(percentage)
    });
    setIsLoaded(true);
  };

  useEffect(() => {
    const blob = window.sessionStorage.getItem('message_json');
    const jsonblob = JSON.parse(blob);
    findBiggestYapper(jsonblob);
  }, []);

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>biggest yapper</h3>
        <h1 className={styles['number']}>{biggestYapper.name}</h1>
        <h2 className={styles['stat']}>
          {biggestYapper.count.toLocaleString()} messages
        </h2>
        <p className={styles['sub-stat']}>
          ({biggestYapper.percentage}% of all messages)
        </p>
      </div>
      
    </div>
  );
};

export default BiggestYapperCard;