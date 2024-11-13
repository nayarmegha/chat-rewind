import React, { useEffect, useState } from 'react';
import styles from './TotalTime.module.css';


const TotalTime = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [totalTime, setTotalTime] = useState<number>(0);

  const getTotalTime = (jsonData) => {
    let totalDuration = 0 
    let startTime = new Date(jsonData[0]['date'])
    let prevTime =  new Date(jsonData[0]['date'])
    // script to find number of minutes of longest conversation
    for (const key in jsonData) {
      const currTime = new Date(jsonData[key]['date'])
      // more than 30 minutes passed, different as the same conversation
      if (currTime.getTime() - prevTime.getTime() > (1000 * 60 * 30)) {
        const currDuration = (prevTime.getTime() - startTime.getTime()) / (1000 * 60)
        totalDuration += currDuration

        startTime = currTime
        prevTime = currTime
      }
      else {
        prevTime = currTime
      }
    }

    setTotalTime(totalDuration)
    setIsLoaded(true)
  }
  useEffect(() => {
    const jsonblob = JSON.parse(window.sessionStorage.getItem('message_json'));
    getTotalTime(jsonblob);
  }, []);

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>Total time spent in conversation:</h3>
        <h1 className={styles['number']}>{totalTime.toFixed(0)}</h1>
        <h2 className={styles['stat']}>minutes</h2>

        <h3 className={styles['desc']}>That's {(totalTime / 60).toFixed(1)} hours!</h3>
      </div>
    </div>
  );
};

export default TotalTime;