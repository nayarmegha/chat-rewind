import { LineChart, XAxis, YAxis, Tooltip, Legend, Line,
    ResponsiveContainer, Label
} from "recharts";
interface TextsPerTime {
    time : string
    texts : number
}

const TimeLineChart = ({textData}) => {

  // Custom tooltip formatter
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#08001A',
          padding: '0.5rem', 
        }}>
          <p style={{ 
            color: '#64ffda',
            margin: '0',
            fontSize: '1rem'
          }}>
            {`${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <ResponsiveContainer width={"100%"} height={400}>
        <LineChart  data={textData}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
        <XAxis dataKey="time" stroke="#f8f0f0">
          <Label value="Time" position="bottom"/>
        </XAxis>
        <YAxis stroke="#f8f0f0">
        <Label
              value="Number of Texts"
              angle={-90}
              position="left"
            />
        </YAxis>
        <Tooltip content={customTooltip} cursor={false}/>
        <Line type="monotone" dataKey="texts" stroke="#25dec0" strokeWidth="0.2rem"/>
        </LineChart>
    </ResponsiveContainer>
     
  );
};

export default TimeLineChart;