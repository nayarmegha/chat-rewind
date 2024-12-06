import React, { useEffect, useState } from 'react';
import styles from './TimeSeries.module.css';
import TimeLineChart from './TimeLineChart';

interface TextsPerTime {
    time : string
    texts : number
}

const TimeSeries = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [textsPerTime, setTextsPerTime] = useState<TextsPerTime[]>([]);
  // Approach: 
  // Check a time window and 
  const setTime = (jsonData) => {

    let data = [{
        time : '12AM',
        texts : 0
    },
    {
        time : '3AM',
        texts : 0
    },
    {
        time : '6AM',
        texts : 0
    },
    {
        time : '9AM',
        texts : 0
    },
    {
        time : '12PM',
        texts : 0
    },
    {
        time : '3PM',
        texts : 0
    },
    {
        time : '6PM',
        texts : 0
    },
    {
        time : '9PM',
        texts : 0
    },
    {
        time : '12AM',
        texts : 0
    }]
    
    jsonData.forEach((text) => {
        const hour = new Date(text.date).getHours()

        data[0].texts += hour >= 21 && hour < 24 ? 1 : 0
        data[1].texts += hour >= 0 && hour < 3 ? 1 : 0
        data[2].texts += hour >= 3 && hour < 6 ? 1 : 0
        data[3].texts += hour >= 6 && hour < 9 ? 1 : 0
        data[4].texts += hour >= 9 && hour < 12 ? 1 : 0
        data[5].texts += hour >= 12 && hour < 15 ? 1 : 0
        data[6].texts += hour >= 15 && hour < 18 ? 1 : 0
        data[7].texts += hour >= 18 && hour < 21 ? 1 : 0
        data[8].texts += hour >= 21 && hour < 24 ? 1 : 0

    });

    setTextsPerTime(data)
    setIsLoaded(true)
  };

  useEffect(() => {
    const jsonblob = JSON.parse(window.sessionStorage.getItem('message_json'));
    setTime(jsonblob);
  }, []);


    if (!isLoaded) {
        return <div></div>
    }

  return (
    <div className={styles.statBlock}>
         <h3 className={styles.desc}>what time of day do you text the most?</h3>
        <TimeLineChart textData={textsPerTime}/>
    </div>
  );
};

export default TimeSeries;