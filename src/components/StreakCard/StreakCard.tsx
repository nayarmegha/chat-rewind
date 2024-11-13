import React, { useEffect, useState } from 'react';
import styles from './StreakCard.module.css';
import StreakBar from './StreakBar';

const StreakCard = () => {
  const [state, setState] = useState({
    longestStreak: 0,
    startDate: null,
    endDate: null,
    isLoaded: false,
    totalDays: 0
  });
  // Approach: 
  // If the difference between consecutive dates is exactly one day, the streak continues
  // If there's a gap (difference > 1 day), we reset the streakzw
  // Only cares about calendar days, time does not matter - messages on Jan 1 at 8 AM and 11:59 PM count as same day
  const calculateStreaks = (jsonData) => {

    // create unique dates directly with a set - if multiple messages on same day, only one date is stored
    // date is stored as unix timestamps in millsec since jan 1, 1970
    const uniqueDates = new Set(
      jsonData.map(message => 
        new Date(message.date).setHours(0,0,0,0)
      )
    );
    
    // convert to array of dates
    const dateArray = Array.from(uniqueDates);

    let runningStreak = 1; // current streak we're counting
    let longestStreak = 1; // lngest streak found so far
    let longestStreakStart = dateArray[0];
    let longestStreakEnd = dateArray[0];
    let streakStart = dateArray[0]; // start of current running streak

    for (let i = 1; i < dateArray.length; i++) {
      // A day = 24 * 60 * 60 * 1000 = 86400000 milliseconds in a day
      // check if current date is exactly one day after previous date
      if (Number(dateArray[i]) - Number(dateArray[i-1]) === 86400000) {
        runningStreak++;
        
        if (runningStreak > longestStreak) {
          longestStreak = runningStreak;
          longestStreakStart = streakStart;
          longestStreakEnd = dateArray[i];
        }
      } else {
        runningStreak = 1;
        streakStart = dateArray[i];
      }
    }

    setState({
      longestStreak,
      startDate: new Date(longestStreakStart as string),
      endDate: new Date(longestStreakEnd as string),
      isLoaded: true,
      totalDays: uniqueDates.size
    });
  };

  useEffect(() => {
    const jsonblob = JSON.parse(window.sessionStorage.getItem('message_json'));
    calculateStreaks(jsonblob);
  }, []);

  if (!state.isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>longest streak</h3>
        <h1 className={styles['number']}>{state.longestStreak}</h1>
        <h2 className={styles['stat']}>consecutive days</h2>
        <p className={styles['sub-stat']}>
          {state.startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })} - {state.endDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
        <StreakBar 
          streakDays={state.longestStreak} 
          totalDays={state.totalDays}/>
        <h3 className={styles['desc']}>out of {state.totalDays} days.</h3>
      </div>
    </div>
  );
};

export default StreakCard;