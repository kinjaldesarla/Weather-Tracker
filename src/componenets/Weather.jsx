import React, { useEffect, useState } from 'react';
import {LineChart,ResponsiveContainer,XAxis,YAxis,Line,Tooltip} from 'recharts'
function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const[chart,setChart]=useState({})
  const API_KEY = 'a97726e1874b948d7530512971816324'; 
  // fetching weather
  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
         fetchHourly()
      } else {
        alert(data.message); // city not found or error
      }
    } catch (err) {
      console.error(err);
    }
   
  };
  // fetching hourly weather for chart
  const fetchHourly=async ()=>{
    const url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    try{
      const res=await fetch(url);
      const chartdata = await res.json();
if (chartdata.cod === "200") {
  setChart(chartdata);
} else {
  alert(chartdata.message);
  }
} catch(err){
      console.error(err);
    }
  } 

  const hourlydata = chart.list
  ? chart.list.slice(0, 8).map((items) => ({
      time: new Date(items.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        hour12: true,
      }),
      temp: items.main.temp,
    }))
  : [];

  //  current date and time
const[datetime,setDatetime]=useState(new Date())
useEffect(() => {
  const interval = setInterval(() => {
    setDatetime(new Date())// do something every second
  }, 1000);

  return () => clearInterval(interval); // cleanup when component unmounts
}, []);

const time=datetime.toLocaleTimeString();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[datetime.getDay()];

  return (
    <div className='bg-gray-700 border-2 border-black m-auto w-1/2 rounded-2xl '>
    <div className="p-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city "
        className="border w-2/3 p-2 rounded border-white text-white "
      />
      <button onClick={fetchWeather} className="ml-2 bg-sky-950 text-white p-2 rounded">
        Get Weather
      </button>
    </div>
    {
      weather && 
      <div className='flex justify-between p-3 text-white mt-5'>
        <div className='flex justify-center gap-2'>
          <img className='h-11 w-14 ' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <div className='text-3xl'>{weather.main.temp}</div> <span>°C</span>
          <ul className='text-gray-400 text-sm'><li>Humidity: {weather.main.humidity}%</li> <li>Wind: {weather.wind.speed}km/hr</li></ul>
        </div>
        <div>
         <ul><li  className='text-xl'>Weather of {weather.name}</li> <li className='text-gray-400 text-sm'>{day}, {time}</li>  <li className='text-gray-400 text-sm'>{weather.weather[0].description}</li></ul>
         </div>
      </div>

    }
    {weather&&
      <h2 className='text-start p-2 text-shadow-2xs text-white'>
  Temprature</h2>
}
{weather&& <div className="w-full h-44 pt-6 p-1 "> {/* Tailwind height & width for layout */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hourlydata}> {/* This draws the main chart */}
        
          {/* X-axis: shows time like 3PM, 6PM */}
          <XAxis dataKey="time" stroke="#9ca3af" />

        

          {/* Tooltip shows value on hover */}
          <Tooltip />

          {/* The line on the chart representing temp values */}
          <Line
            type="monotone" // Makes the line smooth
            dataKey="temp" // This tells chart to use the 'temp' key in each data point
            stroke="#9ca3af" // Line color
            strokeWidth={3}
            dot={{ r: 4 }} // Dots on each point, size radius = 4
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
}
     </div>    
  );
}

export default WeatherApp;
