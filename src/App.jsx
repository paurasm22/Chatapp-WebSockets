import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Mainform from './Components/Mainform'
import Chatroom from './Components/Chatroom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route index element={<Mainform/>}/>
        <Route path='/chat/:roomname' element={<Chatroom/>}/>
        <Route path='*' element={<h1>404 NOT FOUND !</h1>}/>
      </Routes>
    </>
  )
}

export default App
