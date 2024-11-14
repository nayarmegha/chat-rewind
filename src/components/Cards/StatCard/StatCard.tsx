import styles from './StatCard.module.css'
import { useEffect, useState } from 'react'
import blueBG from '../../../assets/blueMsg.svg'

const StatCard = () => {

  const [texts, setTexts] = useState<number>(0)
  const [avgTexts, setAvgTexts] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const totalMessagesThisYear = (jsonData) => {
    const endDate = new Date()
    let count = 0

    // script to find number of messages sent over a past year
    for (const key in jsonData) {
      const date = new Date(jsonData[key]['date'])
      const diffInDays = Math.round((endDate.getTime() - date.getTime()) / (1000*60*60*24));
      if (diffInDays <= 365) {
        count += 1 
      }
    }
 
    setIsLoaded(true)
    setTexts(count)
    setAvgTexts(Math.round(count/365))
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
    <div className={styles['card']} style={{backgroundImage:`url(${blueBG.src})`, backgroundPosition:'center'}}>
        <h3 className={styles['desc']}>you sent each other</h3>
        <h1 className={styles['number']}>{texts}</h1>
        <h1 className={styles['stat']}>messages this year</h1>
        <h2 className={styles['desc']}>that's an average of <span style={{color:"#25DEC0", fontSize:"2rem"}}>{avgTexts}</span> texts per day!</h2>
    </div>
   
  )
}

export default StatCard

