import { useEffect, useState } from 'react'
import styles from "./Names.module.scss"
const Names = () => {

  const [names, setNames] = useState([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const getNames = (jsonData) => {
    let allnames = []
    // script to find number of messages sent over a past year
    for (const key in jsonData) {
      const name = jsonData[key]['name'] as string
      if (allnames.includes(name.toUpperCase()) == false) {
        allnames.push(name.toUpperCase())
      }
    }
    setIsLoaded(true)
    setNames(allnames)
  }

  useEffect (() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    getNames(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    names.map ((item) => {
      return (
        <div className={styles['names-container']}>
          <h2 className={styles['hero']}>{item}</h2>
        </div>
        
      )
    })
  )
}

export default Names

