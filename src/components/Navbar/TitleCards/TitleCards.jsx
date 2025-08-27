import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCards= ({title,category}) => {
  const [apiData, setApiData]=useState([]);
  const cardsRef= useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjQ1MmQ5MjQzYmY0OGI2NjQzM2Y1MzM0MzBkNmU0YSIsIm5iZiI6MTc1MzYwODkzMC44NzYsInN1YiI6IjY4ODVmMmUyODA5NzFhNzNhMzUyYWZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hHN0kSzG5EKOe5VUsvbgev0LZb7xNfbaZayxbMoTeoY'
  }
};
const handlewheel=(event)=>{
event.preventDefault();
cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handlewheel);
},[])
  return(
  <div className='titlecards'>
    <h2>{title?title:"Popular On Netflix"}</h2>
    <div className='card-list' ref={cardsRef}>
      {apiData.map((cards, index) => {
        return <Link to={`/player/${cards.id}`}className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+cards.backdrop_path} alt="" />
          <p>{cards.original_title}</p>
        </Link>
      })}
    </div>
  </div>
 )
}
export default TitleCards;