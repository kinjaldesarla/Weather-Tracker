import {useState,useEffect} from 'react'
function useWeather(city){
 const apiKey="a97726e1874b948d7530512971816324";
     const [data,setdata]=useState({})
     useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appida97726e1874b948d7530512971816324=&units=metric`)
       .then((response)=>setdata(response))
       console.log(data)
     },[city])
     return data 
}

export default useWeather;