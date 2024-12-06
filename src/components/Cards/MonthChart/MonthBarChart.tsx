import { BarChart, XAxis, YAxis, Tooltip, Label, Bar,
    ResponsiveContainer
} from "recharts";


const MonthBarChart = ({textData}) => {

  // Custom tooltip formatter
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, year, texts } = payload[0].payload;
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
            {`${month}, ${year} : ${texts}`}
          </p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <ResponsiveContainer width={"100%"} height={300}>
       <BarChart data={textData}>
        <XAxis dataKey="month" interval={0} stroke="#f8f0f0" tick={{ fontSize: 12 }}>
          <Label value="Month" position="bottom"/>
        </XAxis>
        <YAxis stroke="#f8f0f0"/>
        <Tooltip content={customTooltip} cursor={false}/>
        <Bar dataKey="texts" fill="#8884d8" barSize={20}/>
      </BarChart>
    </ResponsiveContainer>
     
  );
};

export default MonthBarChart;