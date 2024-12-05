import { LineChart, XAxis, YAxis, Tooltip, Legend, Line,
    ResponsiveContainer
} from "recharts";
interface TextsPerTime {
    time : string
    texts : number
}

const TimeLineChart = ({textData}) => {
  

  return (
    <ResponsiveContainer width={"100%"} height={400}>
        <LineChart  data={textData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="texts" stroke="#25dec0" />
        </LineChart>
    </ResponsiveContainer>
     
  );
};

export default TimeLineChart;