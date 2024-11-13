const StreakBar = ({ streakDays, totalDays }) => {
  const barHeight = 12;
  const streakPercentage = (streakDays / totalDays) * 100;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: `${barHeight}px`,
      marginTop: '1rem',
      marginBottom: '1rem',
      backgroundColor: 'rgba(251, 254, 242, 0.1)',
      borderRadius: `${barHeight/2}px`,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: `${streakPercentage}%`,
        backgroundColor: '#f3479d',
        borderRadius: `${barHeight/2}px`,
        transition: 'width 0.5s ease-out'
      }} />
    </div>
  );
};

export default StreakBar;