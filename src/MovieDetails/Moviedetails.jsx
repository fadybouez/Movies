import axios from 'axios'
import { param } from 'jquery';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Spinner from '../LoaderSpinner/Spinner';

export default function MovieDetails() {
  const [movie, setMovie] = useState({})
  const [loader,setLoader]=useState(false)
  let params=useParams();
  

  async function getMovie(){
    let {data}= await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=95228b8154f649999a778b4f7178a291&language=en-US`)
    setMovie(data)
    setLoader(true)
  }
  
  useEffect(()=>{
    getMovie()
    
  },[])
  return (
    <div> 
      {loader?<div className='row mt-4 bg-dark'>
        <div className='col-4'>
        <img className='img-fluid  p-4' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}` }/>

        </div>
     <div className='col-8 row'>
      <div>
             <h2 className=' d-flex justify-content-center p-3  text-light text-uppercase'>
              {params.mediaType==="tv"?`${movie.name}`:`${movie.title}`}
              </h2>

      <h5 className='p-2'> <span className='text-info text-uppercase '>Status: </span> {movie.status}</h5>
      <h5 className='p-2'><span className='text-info text-uppercase '>tagline: </span>{movie.tagline}</h5>
      <h5 className='p-2 text-uppercase'><span className='text-info text-uppercase '>language: </span>{movie.original_language}</h5>
      <p className='p-2'> <span className='text-info text-uppercase '>Overview: </span> {movie.overview}</p>
      <a target='-blank ' className='text-decoration-none' href={movie.homepage}><span className='text-primary '>Watched </span></a>
    
      </div>
     <div className=''>
     </div>
     </div>
      </div>:<Spinner></Spinner>}
    </div>
  )
}
