import styles from './NoTextDays.module.css'
import { useEffect, useState } from 'react'
import pinkBg from '../../../assets/pinkNoText.svg'

const NoTextDays = () => {

  const [notextDays, setNoTextDays] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const totalMessagesThisYear = (jsonData) => {
    const endDate = new Date()
    let count = 0
    let daysTalked = []
    // script to find number of messages sent over a past year
    for (const key in jsonData) {
      const date = new Date(jsonData[key]['date'])
      const diffInDays = Math.round((endDate.getTime() - date.getTime()) / (1000*60*60*24));
      if (diffInDays <= 365) {
        const month   = date.getUTCMonth() + 1 // months from 1-12
        const day     = date.getUTCDate()
        const year    = date.getUTCFullYear()
        // Using padded values, so that 2023/1/7 becomes 2023/01/07
        const pMonth        = month.toString().padStart(2,"0")
        const pDay          = day.toString().padStart(2,"0")
        const formatDate = `${year}/${pMonth}/${pDay}`
        if (!daysTalked.includes(formatDate)) {
          daysTalked.push(formatDate)
        }
      }
    }

    count = 365 - daysTalked.length
    setNoTextDays(count)
    setIsLoaded(true)
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
    <div className={styles.statBlock}>
      <div className={styles.cardLeft}>
        <h3 className={styles.desc}>you didn't text each other for</h3>
        <h1 className={styles.number}>{notextDays}</h1>
        <h1 className={styles.stat}>days this past year</h1>
        {notextDays < 60 ? <h2 className={styles.desc}>wow, you must <span style={{fontStyle:"italic"}}>really</span> like talking to each other</h2> : <h2 className={styles['desc']}>wow, you <span style={{fontStyle:"italic"}}>hate</span> each other?</h2> }
      </div>
    </div>
   
  )
}

export default NoTextDays

