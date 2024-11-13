import styles from './LongestConvo.module.css'
import retro from '../../assets/retrostripes.svg'
import { useEffect, useState } from 'react'

const LongestConvo = () => {

  const [duration, setDuration] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const totalMessagesThisYear = (jsonData) => {
    let maxDuration = 0 
    let startTime = new Date(jsonData[0]['date'])
    let prevTime =  new Date(jsonData[0]['date'])
    // script to find number of minutes of longest conversation
    for (const key in jsonData) {
      const currTime = new Date(jsonData[key]['date'])
      // more than 30 minutes passed, different as the same conversation
      if (currTime.getTime() - prevTime.getTime() > (1000 * 60 * 30)) {
        const currDuration = (prevTime.getTime() - startTime.getTime()) / (1000 * 60)
        if (currDuration > maxDuration) {
          maxDuration = currDuration
        }
        startTime = currTime
        prevTime = currTime
      }
      else {
        prevTime = currTime
      }
    }
    setDuration(Math.round(maxDuration))
    const numhours = maxDuration/60
    setHours(Math.round(numhours*10)/10)
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
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>your longest conversation lasted for</h3>
        <h1 className={styles['number']}>{duration}</h1>
        <h1 className={styles['stat']}>minutes</h1>
        <h2 className={styles['desc']}>that's a total of {hours} hours!</h2>
      </div>
      <div className={styles['card-right']}>
        <img src={retro.src} alt='retro'/>
      </div>
    </div>
   
  )
}

export default LongestConvo

