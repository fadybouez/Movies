
import React, { useState } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MediaContext } from './../MediaContext';
import Spinner from '../LoaderSpinner/Spinner';

export default function Home() {

  let {trendingMovies,tvMovies,isLoading,person}=useContext(MediaContext)
  let pathImagesUrl='https://image.tmdb.org/t/p/original/'

  
  return <>
  {isLoading?<><div className='row mt-4'>
    <div className='col-md-4 d-flex align-items-center'>
      <div className='w-100'>
      <div className={`w-25 my-2 ${styles.brdr}`}></div>
      <h2>Trending</h2>
      <h2>Movies</h2>
      <h2>to Watched now</h2>
      <p className='secondColor'> most watched movies by day</p>
      <div className={styles.brdr}></div>
    </div>
      </div>
    {trendingMovies.map((movie,index)=> <div className='col-md-2 my-2'key={index}>
      <div>
        <Link to={`/Details/${movie.id}/movie`}>
        <img className='img-fluid' src={pathImagesUrl+movie.poster_path} />
        </Link>
      <h5>{movie.title}</h5>
      </div>
    </div>  )}

  </div>
  
  <div className='row mt-4'>
    <div className='col-md-4 d-flex align-items-center'>
      <div className='w-100'>
      <div className={`w-25 my-2 ${styles.brdr}`}></div>
      <h2>Trending</h2>
      <h2>TV</h2>
      <h2>to Watched now</h2>
    <p className='secondColor'> most watched TV day</p>
      <div className={styles.brdr}></div>
    </div>
      </div>
    {tvMovies.map((tv,index)=> <div className='col-md-2 my-2'key={index}>
      <div>
      <Link to={`/Details/${tv.id}/tv`}>
        <img className='img-fluid' src={pathImagesUrl+tv.poster_path} />
      </Link>
      <h5>{tv.name}</h5>
      </div>
    </div>  )}

  </div>
  <div className='row mt-4'>
    <div className='col-md-4 d-flex align-items-center'>
      <div className='w-100'>
      <div className={`w-25 my-2 ${styles.brdr}`}></div>
      <h2>Trending</h2>
      <h2>person</h2>
      <h2>to Show now</h2>
    <p className='secondColor'> most person by day</p>
      <div className={styles.brdr}></div>
    </div>
      </div>
    {person.map((person,index)=> <div className='col-md-2 my-2'key={index}>
      <div>
      <Link to={`/Details/${person.id}/person`}>
        <img className='img-fluid' src={pathImagesUrl+person.profile_path} />
      </Link>
      <h5>{person.name}</h5>
      </div>
    </div>  )}

  </div>
  </>
  
  :<Spinner></Spinner>}
  
  
  </>
}
