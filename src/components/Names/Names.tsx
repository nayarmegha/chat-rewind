import { useEffect, useState } from 'react'
import styles from "./Names.module.css"
const Names = () => {

  const [names, setNames] = useState([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [lastName, setLastName] = useState("")

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
    const last = allnames.pop()
    setNames(allnames)
    setLastName(last)
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
    <div className={styles['names-container']}>
       {names.map ((item) => {
        return (
          <h2 className={styles['name']}>{item}</h2>
      )
    })}
    <h3 className={styles['subtext']}>and</h3>
    <h2 className={styles['name']}>{lastName}</h2>
    </div>
  )
}

export default Names

