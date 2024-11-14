import styles from './LongestConvo.module.css'
import { useEffect, useState } from 'react'
import tealbg from '../../../assets/tealBG.svg'

const LongestConvo = () => {

  const [duration, setDuration] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [longestDay, setLongestDay] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const totalMessagesThisYear = (jsonData) => {
    let maxDuration = 0 
    let maxDay = new Date()
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
          maxDay = startTime
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
    setLongestDay(maxDay.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }))
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
    <div className={styles['card']} style={{backgroundImage:`url(${tealbg.src})`, backgroundPosition:'center'}}>
        <h3 className={styles['desc']}>your longest conversation lasted for</h3>
        <h1 className={styles['number']}>{duration}</h1>
        <h1 className={styles['stat']}>minutes on </h1>
        <h1 className={styles['stat']}>{longestDay}</h1>
        <h2 className={styles['desc']}>that's a total of <span className={styles['subtext']}>{hours}</span> hours!</h2>
    </div>
   
  )
}

export default LongestConvo

