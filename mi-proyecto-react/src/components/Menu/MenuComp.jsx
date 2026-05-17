import { useState } from 'react'
import './MenuComp.css'
import iconoCalendario from '../../assets/SVG/calendar-svgrepo-com.svg'
import iconoTareas from '../../assets/SVG/tasks-svgrepo-com.svg'
import { Navigate, useNavigate } from 'react-router-dom';
function MenuComp() {
  const [count, setCount] = useState(0)
const navigate = useNavigate()
    function gocalend(){

         navigate('/Inicio/calendar');
         console.log("hola mundo")

    }
        function gotaskcreator(){

         navigate('/Inicio/TaskCreator');
         console.log("hola mundo")

    }
  return (
    <>
      <div id='menu'>
        
        <div className='svg_class' onClick={gocalend}>
          <img src={iconoCalendario}/>
          <a>Calendario</a>
        </div>
        <div className='svg_class' onClick={ gotaskcreator}>
            <img src={iconoTareas}/>
          <a>Tareas</a>
        </div>


      </div>
    </>
  )
}

export default MenuComp
