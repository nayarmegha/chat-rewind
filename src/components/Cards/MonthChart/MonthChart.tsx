import React, { useEffect, useState } from 'react';
import styles from './MonthChart.module.css';
import MonthBarChart from './MonthBarChart';

interface TextsPerMonth {
    month : string
    year : number
    texts : number
}

const MonthChart = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [textsPerMonth, setTextsPerMonth] = useState<TextsPerMonth[]>([]);
 
  const numTextsPerMonth = (jsonData) => {

    let data = [{
        month : 'Jan',
        year : 0,
        texts : 0
    },
    {
        month : 'Feb',
        year : 0,
        texts : 0
    },
    {
        month : 'Mar',
        year : 0,
        texts : 0
    },
    {
        month : 'Apr',
        year : 0,
        texts : 0
    },
    {
        month : 'May',
        year : 0,
        texts : 0
    },
    {
        month : 'June',
        year : 0,
        texts : 0
    },
    {
        month : 'July',
        year : 0,
        texts : 0
    },
    {
        month : 'Aug',
        year : 0,
        texts : 0
    },
    {
        month : 'Sept',
        year : 0,
        texts : 0
    },
    {
        month : 'Oct',
        year : 0,
        texts : 0
    },
    {
        month : 'Nov',
        year : 0,
        texts : 0
    },
    {
        month : 'Dec',
        year : 0,
        texts : 0
    }]
    
    // Find the latest date to make sure messages only back by one year - for month wrapped
    let latestMonth = new Date().getMonth() - 1
    let latestYear = new Date().getFullYear()

    if (latestMonth < 0) {
        latestMonth = 11
    }

    console.log(latestMonth)
    jsonData.forEach((text) => {
        const currtime = new Date(text.date)

        if ((currtime.getFullYear() == latestYear && currtime.getMonth() <= latestMonth )||
            (currtime.getFullYear() == latestYear - 1 && currtime.getMonth() > latestMonth)) {
            
            data[currtime.getMonth()].texts += 1
            data[currtime.getMonth()].year = currtime.getFullYear()
        }
    });

    // If you have a portion from the previous year
    if (latestMonth != 11) {
        let prevYear = data.slice(latestMonth+1)
        data.splice(latestMonth+1)
        data.unshift(...prevYear);
    }
    setTextsPerMonth(data)
    setIsLoaded(true)
  };

  useEffect(() => {
    const jsonblob = JSON.parse(window.sessionStorage.getItem('message_json'));
    numTextsPerMonth(jsonblob);
  }, []);


    if (!isLoaded) {
        return <div></div>
    }

  return (
    <div className={styles.statBlock}>
         <h3 className={styles.desc}>a year worth of conversations!</h3>
        <MonthBarChart textData={textsPerMonth}/>
    </div>
  );
};

export default MonthChart;