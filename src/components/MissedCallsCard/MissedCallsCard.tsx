import styles from './MissedCallsCard.module.css'
import React, { useEffect, useState } from 'react'
import CallsDonutChart from './CallsDonutCard'

const MissedCallsCard = () => {
  const [missedVoiceCalls, setMissedVoiceCalls] = useState<number>(0)
  const [missedVideoCalls, setMissedVideoCalls] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [totalCalls, setTotalCalls] = useState<number>(0)
  const countMissedCalls = (jsonData) => {
    let voiceCallCount = 0
    let videoCallCount = 0
    let totalCalls = 0
    for (const key in jsonData) {
      const content = jsonData[key]['content']
      // Check if content exists and has text property
      if (content) {
        // console.log(content.text)
        // Check for missed voice calls
        if (content?.event?.includes('Missed voice call')){
          voiceCallCount += 1
          totalCalls += 1
        }
        // Check for missed video calls
        // TODO: currently, missed video call is not being added to content event (parsing issue)
        // it is being added to content.text, so i'm accessing it via content.text for now 
        // and we can fix this bug in texttojson.ts later.
        if (content.text.includes('Video call') && (content.text.includes('No answer') || content.text.includes('Missed'))) {
          videoCallCount += 1
          totalCalls += 1
        }
        if(content.text.includes('Video call')){
          totalCalls += 1
        }

      }
    }

    setMissedVoiceCalls(voiceCallCount)
    setMissedVideoCalls(videoCallCount)
    setTotalCalls(totalCalls)
    setIsLoaded(true)
  }

  useEffect(() => {
    const blob = window.sessionStorage.getItem('message_json')
    const jsonblob = JSON.parse(blob)

    countMissedCalls(jsonblob)
  }, [])

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3 className={styles['desc']}>you missed...</h3>
        <div className={styles['number-container']}>
          <div className={styles['call-stat']}>
            <h1 className={styles['number']}>{missedVoiceCalls}</h1>
            <h2 className={styles['stat']}>voice calls</h2>
          </div>
          <div className={styles['call-stat']}>
            <h1 className={styles['number']}>{missedVideoCalls}</h1>
            <h2 className={styles['stat']}>video calls</h2>
          </div>
          <div className={styles['call-stat']}>
          <h3 className={styles['desc']}>out of {totalCalls} total calls.</h3>
          </div>
          <CallsDonutChart voiceCalls={missedVoiceCalls} videoCalls={missedVideoCalls} totalCalls={totalCalls}/>
        </div>
      </div>     
    </div>
  )
}

export default MissedCallsCard