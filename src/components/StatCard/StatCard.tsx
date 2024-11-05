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

const StatCard:React.FC = () => {

  const [jsonData, setJsonData] = useState<[jsonData] | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [texts, setTexts] = useState<number>(0)

  const totalMessagesThisYear = () => {
    if (!isLoaded) {
      return 0
    }
    return console.log(jsonData.length)
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)
    // console.log(jsonblob)
    // console.log(jsonblob && !isLoaded)
    if (jsonblob && !isLoaded) {
      setJsonData(jsonblob)
      setIsLoaded(true)
      totalMessagesThisYear()
    }
  }, [])

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>you sent</h3>
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

