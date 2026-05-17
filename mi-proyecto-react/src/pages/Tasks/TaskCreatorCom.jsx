import { useEffect, useState, useRef } from 'react'
import './TaskCreatorCom.css'
import apiClient from '../../services/apiConfig'
import { useNavigate } from 'react-router-dom'

import MenuComp from '../../components/Menu/MenuComp'
import Tarjeta_Tarea from '../../components/TaskCard/Tarjeta_Tarea'
import ModalCreaEditTask from '../../components/Modal/ModalCreaEditTask'

function TaskCreatorCom() {
    const [tasksave , settasksave]=useState([])
    const [taskup, settaskup] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [fechaSemanaActual, setFechaSemanaActual] = useState(new Date())
    const [textoSemana, setTextoSemana] = useState("")
    const navigate = useNavigate()

    function edittarea(tarea){
        settaskup(tarea)


    }
    function Actualizar_estado_modal(estado){
        setShowModal(estado)
        if(estado === false) {
            settaskup(null)
            cargarTareasSemanales()
        }

    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/")
        }
    }, [])
    
    // Detectar cuando se abre el modal en modo edit
    useEffect(() => {
        if(taskup) {
            setShowModal(true)
        }
    }, [taskup])
    
    function handleDrop(e) {
    e.preventDefault();
    const tarea = JSON.parse(e.dataTransfer.getData("tarea"));
    tarea.tas_state = e.currentTarget.id === "Taskinit" ? "pending" : e.currentTarget.id === "Taskprogest" ? "in_progress" : "completed";
    actualizar_estado_tarea(tarea)
  }
  function actualizar_estado_tarea(tarea) {
    const token = localStorage.getItem("token");

    apiClient.put('/actu_tareas', tarea)
      .then(res => {
        cargarTareasSemanales();
      })
      .catch(err => {
        console.error("Error al actualizar tarea:", err);
        cargarTareasSemanales();
      });
  }
   
    
    // Función para calcular semana a partir de una fecha
    function obtener_semana_actual(fecha) {
        const diaSemana = fecha.getDay()
        const diferencia = fecha.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1)
        const lunes = new Date(fecha.getFullYear(), fecha.getMonth(), diferencia)
        const domingo = new Date(lunes)
        domingo.setDate(domingo.getDate() + 6)
        return { lunes, domingo }
    }
    
    // Función para formatear el rango de fechas
    function formate_rango_semana(lunes, domingo) {
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        const dia_inicio = lunes.getDate()
        const dia_fin = domingo.getDate()
        const mes_inicio = meses[lunes.getMonth()]
        const mes_fin = meses[domingo.getMonth()]
        return `Semana del ${dia_inicio} de ${mes_inicio} al ${dia_fin} de ${mes_fin}`
    }
    
    // Funciones para navegar entre semanas
    function semana_ant() {
        const nueva_fecha = new Date(fechaSemanaActual)
        nueva_fecha.setDate(nueva_fecha.getDate() - 7)
        
        // Calcular el lunes de esa semana
        const diaSemana = nueva_fecha.getDay()
        const diferencia = nueva_fecha.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1)
        const lunes = new Date(nueva_fecha.getFullYear(), nueva_fecha.getMonth(), diferencia)
        
        setFechaSemanaActual(lunes)
    }
    
    function semana_sig() {
        const nueva_fecha = new Date(fechaSemanaActual)
        nueva_fecha.setDate(nueva_fecha.getDate() + 7)
        
        // Calcular el lunes de esa semana
        const diaSemana = nueva_fecha.getDay()
        const diferencia = nueva_fecha.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1)
        const lunes = new Date(nueva_fecha.getFullYear(), nueva_fecha.getMonth(), diferencia)
        
        setFechaSemanaActual(lunes)
    }
    
    // Función para formatear fecha sin problemas de zona horaria
    function formatearFecha(fecha) {
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Función para cargar tareas de la semana
    async function cargarTareasSemanales() {
        const token = localStorage.getItem("token")
        const { lunes, domingo } = obtener_semana_actual(fechaSemanaActual)
        
        // Actualizar el texto de la semana
        setTextoSemana(formate_rango_semana(lunes, domingo))
        
        try {
            const res = await apiClient.post('/obtenertareas', {
                fechaInicio: formatearFecha(lunes),
                fechaFin: formatearFecha(domingo)
            })
            
            settasksave(res.data)
        } catch (error) {
            console.log("Error al cargar tareas:", error)
        }
    }
    
    // Cargar tareas al montar el componente
    useEffect(() => {
        cargarTareasSemanales()
    }, [])
    
    // Recargar tareas cuando cambia la semana
    useEffect(() => {
        cargarTareasSemanales()
    }, [fechaSemanaActual])
   

    return (
        
        <>
           <div id='Container'>
                <div id='ManuL'>
                    <MenuComp></MenuComp>
                </div>
                <div id='tasks_space'>
                    <div id='menu_Colum'>
                        <h1>{textoSemana}</h1>
                        <div id='header_Semanal'>
                        <button className='btn_mes' onClick={semana_ant}>{"<"}</button>
                        <button className='btn_mes' onClick={semana_sig}>{">"}</button>
                        </div>
                        <button id='btnaddtask' onClick={() => Actualizar_estado_modal(true)}>{"+"}</button>
                        


                    </div>
                     <div id='trello'>
                   <div id='Taskinit' className='columclas' onDrop={handleDrop} onDragOver={(e) => {e.preventDefault() }}>
                     <br></br>
                    <h1>Tareas pendientes</h1>
                    <div id='inith1'>
                         {tasksave.filter(t => t.tas_state === "pending").map(tarea => (
                      <Tarjeta_Tarea key={tarea.pk_tas_id} tarea={tarea} onEdit={edittarea} />
                    ))}
                        
                    </div>
                   
                   </div>
                   <div id='Taskprogest' className='columclas' onDrop={handleDrop} onDragOver={(e) => {e.preventDefault() }}>
                    <br></br>
                     <h1>En Proceso</h1>
                    <div id="progh1">
                          {tasksave.filter(t => t.tas_state === "in_progress").map(tarea => (
                      <Tarjeta_Tarea key={tarea.pk_tas_id} tarea={tarea} onEdit={edittarea} />
                    ))}
                       
                    </div>
                  
                   </div>
                   <div id='Taskend' className='columclas' onDrop={handleDrop} onDragOver={(e) => {e.preventDefault() }}>
                     <br></br>
                     <h1>Finalizadas</h1>
                    <div id='finh1' >
                         {tasksave.filter(t => t.tas_state === "completed").map(tarea => (
                      <Tarjeta_Tarea key={tarea.pk_tas_id} tarea={tarea} onEdit={edittarea} />
                    ))}
                       
                    </div>
                   
                   </div>
                </div>


                </div>

               
            </div>
             {showModal && <ModalCreaEditTask Actualizar_estado_modal={Actualizar_estado_modal} tarea={taskup} ModoModal={taskup ? "edit" : "create"} />}
        </>
       
      )
}

export default TaskCreatorCom