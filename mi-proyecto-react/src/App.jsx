

import './styles/App.css'
import MenuComp from './components/Menu/MenuComp'
import CalendarComp from './pages/Calendar/CalendarComp'
import InitsessionComp from './pages/Auth/InitsessionComp'
import RegisterComp from './pages/Auth/RegisterComp'
import RecuClave from './pages/Auth/Recu_clave'
import { Route, Routes } from 'react-router-dom'
import Calendarweb from './pages/Calendar/Calendarweb'
import TaskCreatorCom from './pages/Tasks/TaskCreatorCom'




function App() {
  





  return (
    <>
    <Routes> 
      {/* Parte de inicio de secion o creacion de usuario*/}
      <Route path='/' element={<InitsessionComp ></InitsessionComp>}></Route>
      <Route path='/registro' element={<RegisterComp></RegisterComp>}></Route>
      <Route path='/Recu_clave' element={<RecuClave></RecuClave>}></Route>
      <Route path='/Inicio/calendar' element={<Calendarweb ></Calendarweb>}></Route>
      <Route path='/Inicio/TaskCreator' element={<TaskCreatorCom ></TaskCreatorCom >}></Route>

    </Routes>

    </>
  )
}

export default App
