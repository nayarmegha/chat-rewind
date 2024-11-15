import styles from './SummaryCard.module.css'

const SummaryCard = ({ summary }) => {
  // Parse JSON if it's a string
  const summaryData = typeof summary === 'string' ? JSON.parse(summary) : summary;
  
  return (
    <div className={styles.card}>
      {/* Title Section */}
      <h3 className={styles.subtitle}>
        Chat Summary
      </h3>
      <h1 className={styles.title}>
        {summaryData.title}
      </h1>
      
      {/* Summary Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.content}>
          {summaryData.summary}
        </p>
      </div>
      
      {/* Highlights Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <ul className={styles.highlightsList}>
          {summaryData.highlights.map((highlight, index) => (
            <li key={index} className={styles.highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryCard;
