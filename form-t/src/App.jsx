import { useState } from 'react'
import MainForm from './Page/MainForm/MainForm'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from "react-router-dom";
import AllForm from './Page/AllForm/AllForm';
import ViewForm from './Page/AllForm/ViewForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Routes>
        <Route path="" element={<MainForm />} />
        <Route path="/allForm" element={<AllForm />} />
        <Route path="/viewForm" element={< ViewForm/>}/>
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
    </div>
  )
}

export default App
