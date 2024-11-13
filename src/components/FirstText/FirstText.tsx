import styles from './FirstText.module.css'
import { useEffect, useState } from 'react'

const FirstText = () => {

  const [name, setName] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const whoTextsFirst = (jsonData) => {
    
    let counters = {}
    let prevDate = new Date(jsonData[0]['date'])
    counters[jsonData[0]['name']] = 1
    // script to find number of messages sent over a past year
    for (const key in jsonData) {
      const date = new Date(jsonData[key]['date'])
      if (date.getTime() - prevDate.getTime() > (1000 * 60 * 30)) {
        counters[jsonData[key]['name']] = (counters[jsonData[key]['name']] || 0) + 1;
      }
    }
    console.log(counters)
    let mostTexts = 0 
    let texter = ""
    for (const [key, value] of Object.entries(counters)) {
        if (value as number > mostTexts) {
            mostTexts = value as number
            texter = key
        }
    }
    setName(texter)
    setIsLoaded(true)
    
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    whoTextsFirst(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles['card']}>
        <h3 className={styles['desc']}>it looks like</h3>
        <h1 className={styles['name']}>{name}</h1>
        <h1 className={styles['stat']}>usually texts first</h1>
        <h2 className={styles['desc']}>(not desperate)</h2>
    </div>
   
  )
}

export default FirstText

