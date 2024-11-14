import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const CallsDonutChart = ({ voiceCalls, videoCalls, totalCalls }) => {
  const data = [
    { name: 'Missed Voice Calls', value: voiceCalls },
    { name: 'Missed Video Calls', value: videoCalls },
    { name: 'Answered Calls', value: totalCalls - (voiceCalls + videoCalls) }
  ];

  const COLORS = ['#38a593', '#d44b8f', '#64ffda'];

  // Custom tooltip formatter
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#08001A',
          padding: '0.5rem', 
        }}>
          <p style={{ 
            color: payload[0].payload.name === 'Voice Calls' ? '#38a593' : 
                   payload[0].payload.name === 'Video Calls' ? '#d44b8f' : '#64ffda',
            margin: '0',
            fontSize: '0.875rem'
          }}>
            {`${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          cx={125}
          cy={125}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip content={customTooltip} cursor={false}/>
      </PieChart>
    </div>
  );
};

export default CallsDonutChart;