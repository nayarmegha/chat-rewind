import styles from './BiggestYapper.module.css';

const ChatDistributionBars = ({ participants }) => {    
    return (
      <div className={styles.container}>
        {participants.map((participant, index) => (
          <div key={index} className={styles.barWrapper}>
            <div className={styles.name}>
              {participant.firstName}
            </div>
            <div className={styles.barContainer}>
              <div 
                className={styles.bar}
                style={{
                  width: `${participant.percentage}%`,
                  backgroundColor: index === 0 ? '#f3479d' : '#25DEC0'
                }}
              />
              <span className={styles.percentage}>
                {participant.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default ChatDistributionBars;

