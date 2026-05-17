import { useEffect, useState, useRef } from 'react'
import './ModalCreaEditTask.css'
import { Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiConfig'

function ModalCreaEditTask({ Actualizar_estado_modal,tarea,ModoModal }) {
  const [creando, setCreando] = useState(false)
  const navigate = useNavigate()
  
  // Crear referencias para los inputs
  const refTaskName = useRef(null)
  const refTaskDescription = useRef(null)
  const refTaskDeadline = useRef(null)
  const refTaskType = useRef(null)
  const refFechaOriginal = useRef(null) // Guardar fecha original sin modificar



  
   useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/")
        }
        if(ModoModal === "edit" && tarea) {
            refTaskName.current.value = tarea.tas_name
            refTaskDescription.current.value = tarea.tas_description
            refFechaOriginal.current = tarea.tas_deadline // Guardar completa
            refTaskDeadline.current.value = tarea.tas_deadline.substring(0, 10) // Solo fecha para el input
            refTaskType.current.value = tarea.tas_type
        }

    }, [ModoModal, tarea])
    
    function construirTareaActualizada(tareaOriginal) {
        tareaOriginal.tas_name = refTaskName.current.value
        tareaOriginal.tas_description = refTaskDescription.current.value
        tareaOriginal.tas_deadline = refTaskDeadline.current.value // Solo "2026-05-17"
        tareaOriginal.tas_type = refTaskType.current.value
        
        console.log("Fecha enviada:", tareaOriginal.tas_deadline)
        
        return tareaOriginal
    }

    async function elecion_modal() {
        if(ModoModal === "create") {
            await crear_tarea()
        } else if(ModoModal === "edit") {
            const tareaActualizada = construirTareaActualizada(tarea)
            await actualizar_estado_tarea(tareaActualizada)
        }
        
    }

  async function crear_tarea(){
        try {
            const token = localStorage.getItem("token")
            
            // Obtener valores de los refs
            const taskName = refTaskName.current.value
            const taskDescription = refTaskDescription.current.value
            const taskDeadline = refTaskDeadline.current.value
            const taskType = refTaskType.current.value
            
            // Validar que no estén vacíos
            if(!taskName || !taskDescription || !taskDeadline || !taskType) {
                console.log("Por favor, completa todos los campos")
                return
            }
            
            setCreando(true)
            const res = await apiClient.post('/Insertar_tarea', {
                tas_name: taskName,
                tas_description: taskDescription,
                tas_deadline: taskDeadline,
                tas_type: taskType,
                tas_state: "pending"

            })

            if(res.data.ok){
                console.log("Tarea creada correctamente")
                // Limpiar los inputs
                refTaskName.current.value = ''
                refTaskDescription.current.value = ''
                refTaskDeadline.current.value = ''
                refTaskType.current.value = 'work'
                Actualizar_estado_modal(false)
            }else{
                console.log("Error al crear la tarea")
            }
            setCreando(false)
        } catch (error) {
            console.log("Error:", error)
            setCreando(false)
        }
    }
 async function actualizar_estado_tarea(tarea) {
    const token = localStorage.getItem("token");

    apiClient.put('/actu_tareas',tarea)
      .then(res => {
        if(res.data.ok) {
          console.log("Tarea actualizada correctamente");
          Actualizar_estado_modal(false);
        }
      })
      .catch(err => console.error("Error al actualizar tarea:", err));
  }
  return (
    <>
      <div id="Modal_add_task">
        <button onClick={() => Actualizar_estado_modal(false)}>x</button>
        <div id="div_modal_task">
          <h3>Nombre</h3>
          <input type='text' ref={refTaskName} placeholder='Escriba el nombre de la tarea'></input>
          <h3>Descripcion</h3>
          <input type='text' ref={refTaskDescription} placeholder='Escriba la descripción de la tarea'></input>
          <h3>Fecha limite de la tarea</h3>
          <input type='date' ref={refTaskDeadline}></input>
          <h3>Tipo de tarea</h3>
          <select ref={refTaskType}>
            <option value="house">Hogar</option>
            <option value="work">Trabajo</option>
            <option value="personal">Personal</option>
            </select>
            <button id='btn_crear_task' onClick={elecion_modal} disabled={creando}>{creando ? (ModoModal === 'edit' ? 'Actualizando...' : 'Creando...') : (ModoModal === 'edit' ? 'Actualizar' : 'Crear')}</button>
        </div>
      </div>
    </>
  )
}

export default ModalCreaEditTask;
