import styles from './Example.module.css'
import { useEffect, useState } from 'react'

const TotalMessages = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const doExample = (jsonData) => {
    return ""
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    doExample(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles.statBlock}>

    </div>
   
  )
}

export default TotalMessages

