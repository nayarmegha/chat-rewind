import styles from './StatCard.module.css'
import retro from '../../assets/retrostripes.svg'
import React from 'react'

interface StatCardProps {
  desc : string, 
  number : string, 
  stat : string
}

const StatCard:React.FC<StatCardProps> = ({desc, number, stat}) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card-left']}>
        <h3>{desc}</h3>
        <h1 className={styles['number']}>{number}</h1>
        <h1 className={styles['stat']}>{stat}</h1>
      </div>
      <div className={styles['card-right']}>
        <img src={retro.src} alt='retro'/>
      </div>
    </div>
  )
}

export default StatCard

