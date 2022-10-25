import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useLocation } from 'react-router-dom';

function PopulationChart() {
  
const location = useLocation()
const data = [
  {
    name: "1970",
    population: location.state.country.Population1970,
  },
  {
    name: "1980",
    population: location.state.country.Population1980,
  },
  {
    name: "1990",
    population: location.state.country.Population1990,
  },
  {
    name: "2000",
    population: location.state.country.Population2000,
  },
  {
    name: "2010",
    population: location.state.country.Population2010,
  },
  {
    name: "2015",
    population: location.state.country.Population2015,
  },
  {
    name: "2020",
    population: location.state.country.Population2020,
  },
  {
    name: "2022",
    population: location.state.country.Population2022,
  },
];
{/* <p>{}</p> */}
      return (
<ResponsiveContainer height="100%" width="100%">
        <LineChart
          width={500}
          height={100}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
         
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      );
}

export default PopulationChart;