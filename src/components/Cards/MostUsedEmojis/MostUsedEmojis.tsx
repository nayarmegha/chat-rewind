import type { newChat } from '../../../utils/types'
import styles from './MostUsedEmojis.module.css'
import emojiRegex from 'emoji-regex'
import { useEffect, useState } from 'react'

const TotalMessages = () => {

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [topEmojis, setTopEmojis] = useState({})

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUsedEmojis = (jsonData: newChat[]) => {
    
    const regex = emojiRegex();
    const emojiTable = {}

    // Iterate through all messages and record emoji use
    for (const msg of jsonData) {
      const emojis = msg.content.text.match(regex)

      if (emojis != null) {
        emojis.map(m => 
          emojiTable[m] = (emojiTable[m] || 0) + 1
        )
      }
    }

    console.log(emojiTable)
    
    // Create a list of emoji pairs and sort them
    const items = Object.keys(emojiTable).map((key) => {
      return [key, emojiTable[key]]
    })

    items.sort((a, b) => b[1] - a[1] )

    setTopEmojis(items.slice(0,3))
    setIsLoaded(true)
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    getUsedEmojis(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles.statBlock}>
      <h3 className={styles.desc}>top used emojis</h3>
      <h1 className={styles.number}>#1 {topEmojis[0][0]}</h1>
      <h3 className={styles.desc}>used {topEmojis[0][1]} times</h3>
      <h1 className={styles.number}>#2 {topEmojis[1][0]}</h1>
      <h3 className={styles.desc}>used {topEmojis[1][1]} times</h3>
      <h1 className={styles.number}>#3 {topEmojis[2][0]}</h1>
      <h3 className={styles.desc}>used {topEmojis[2][1]} times</h3>
    </div>
   
  )
}

export default TotalMessages

