import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Movies from './Movies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Movies />
  )
}

export default App
