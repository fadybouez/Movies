import axios from "axios";
import  { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let MediaContext= createContext([]);

export function MediaContextProvider(props){
  const [isLoading,setIsLoading]=useState(false);
    const [trendingMovies, setTrendingMovies] = useState([])
    const [tvMovies, setTvMovies] = useState([])
  
    async function getTrendingItem(mediaType,callBack){
      let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=95228b8154f649999a778b4f7178a291`)
      callBack(data.results);
      setIsLoading(true)
      
    };
  useEffect(()=>{
    getTrendingItem("movie",setTrendingMovies);
    getTrendingItem("tv",setTvMovies);
  },[])

    return <MediaContext.Provider value={{trendingMovies,tvMovies,isLoading}}>
    {props.children}
    </MediaContext.Provider>
}