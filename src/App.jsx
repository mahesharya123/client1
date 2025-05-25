import { useState } from 'react'
import { useLocation } from 'react-router'
import Navbar from './Components/Navbar'


function App() {
  const [count, setCount] = useState(0)
  const isowner = useLocation().pathname.includes("owner");
  return (
    <>
      {!isowner && <Navbar/>}
    </>
  )
}

export default App
