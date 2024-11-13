import React, { useEffect, useState } from 'react';
import styles from './BiggestYapperCard.module.css';
import ChatDistributionBars from './ChatDistribution';

const BiggestYapperCard = () => {
  const [biggestYapper, setBiggestYapper] = useState({
    name: '',
    count: 0,
    percentage: 0
  });
  const [participants, setParticipants] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

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

    const participantsData = Array.from(messageCounts.entries())
    .map(([name, count]) => ({
      firstName: getFirstName(name),
      fullName: name,
      count,
      percentage: Number(((count / totalMessages) * 100).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count); // Sort by count in descending order

  // Set the biggest yapper (first in sorted array)
  setBiggestYapper({
    name: participantsData[0].firstName,
    count: participantsData[0].count,
    percentage: participantsData[0].percentage
  });

  // Set all participants data
  setParticipants(participantsData);
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
        <ChatDistributionBars participants={participants} />

      </div>
    </div>
  );
};

export default BiggestYapperCard;