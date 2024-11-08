import styles from './StatCard.module.css'
import retro from '../../assets/retrostripes.svg'
import React, { useEffect, useState } from 'react'

interface jsonData {
  name : string,
  date : Date,
  content : {
    attach : string,
    text : string,
    event : string,
    react : number
  }
}

const StatCard = () => {

  const [jsonData, setJsonData] = useState<[jsonData] | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [texts, setTexts] = useState<number>(0)

  const totalMessagesThisYear = () => {
    if (!jsonData) {
      return 0
    }
    console.log('are you here')
    const endDate = new Date(jsonData[jsonData.length - 1]['date'])
    let count = 0
    // script to find number of messages sent this year
    for (const key in jsonData) {
      const date = new Date(jsonData[key]['date'])
      const diffInDays = Math.round((endDate.getTime() - date.getTime()) / (1000*60*60*24));
      if (diffInDays <= 365) {
        count += 1 
        // console.log(diffInDays)
      }

    }
    setTexts(count)
    setIsLoaded(true)
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    if (!isLoaded && jsonblob) {
      setJsonData(jsonblob)
      totalMessagesThisYear()
    }
  }, [jsonData])

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>you sent each other</h3>
        <h1 className={styles['number']}>{texts}</h1>
        <h1 className={styles['stat']}>messages this year</h1>
      </div>
      <div className={styles['card-right']}>
        <img src={retro.src} alt='retro'/>
      </div>
    </div>
   
  )
}

export default StatCard

