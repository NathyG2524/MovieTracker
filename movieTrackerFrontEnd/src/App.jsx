import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Movies from './Movies'
import Gener from './gener'
import MovieList from './MovieList'
import Dashboard from './Dashboard'

function App() {
  const [even, setEven] = useState(true)
  
  const ev = {value : true}
  console.log(even)


  return (
    <>
    
    <Movies  even={even} setEven={setEven}/>
    <MovieList even={even}/>
    </>
  )
}

export default App
