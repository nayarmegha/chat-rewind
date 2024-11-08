import styles from './StatCard.module.css'
import retro from '../../assets/retrostripes.svg'
import React, { useEffect, useState } from 'react'

const StatCard = () => {

  // const [jsonData, setJsonData] = useState<[jsonData] | null>(null)
  const [texts, setTexts] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const totalMessagesThisYear = (jsonData) => {
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
 
    setIsLoaded(true)
    setTexts(count)
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    totalMessagesThisYear(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

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

