import { useEffect, useState } from 'react'
import './CalendarComp.css'
import Calend_Day from './Calend_Day'
import apiClient from '../../services/apiConfig'
import Tarjeta_Tarea from '../../components/TaskCard/Tarjeta_Tarea'
import ModalCreaEditTask from '../../components/Modal/ModalCreaEditTask'


function CalendarCommp() {
    const [map_dias, setmap_dias] = useState([])
    const [texto_mes, settexto_mes] = useState("")
    const [fecha_act, setfecha_act] = useState(new Date())
    const [t_tareas,set_tareas]= useState([])
    const [mostrarTareas,setmostrarTareas]=useState([])
    const [showModal, setShowModal] = useState(false)
    const [taskup, settaskup] = useState(null)

    function edittarea(tarea){
        settaskup(tarea)
    }

    function Actualizar_estado_modal(estado){
        setShowModal(estado)
        if(estado === false) {
            settaskup(null)
            cargarTareas(new Date(fecha_act.getFullYear(), fecha_act.getMonth(), 1), new Date(fecha_act.getFullYear(), fecha_act.getMonth() + 1, 0))
        }
    }

    // Detectar cuando se abre el modal en modo edit
    useEffect(() => {
        if(taskup) {
            setShowModal(true)
        }
    }, [taskup])
    

    
    function actulizarTareas(tareas){
        setmostrarTareas(tareas)
    }
    
    function mes_sig(){
     setfecha_act(prev => {
    const nueva = new Date(prev);
    nueva.setMonth(nueva.getMonth() + 1);
    return nueva;
  });

 }
  function mes_ant(){
     setfecha_act(prev => {
    const nueva = new Date(prev);
    nueva.setMonth(nueva.getMonth() - 1);
    return nueva;
  });
  }
  
 function cargar_mes(fecha_cargada){
      const fechaactual = new Date(fecha_cargada.getFullYear(),fecha_cargada.getMonth(),1)

    const fech_ultimodia = new Date(fechaactual.getFullYear(),fechaactual.getMonth() + 1,0)

    const fech_ultimoMesAnterior = new Date(fechaactual.getFullYear(),fechaactual.getMonth(),0)
    return{ fechaactual,fech_ultimodia,fech_ultimoMesAnterior}
 }
async function cargarTareas(fecha_init,fecha_fin){
console.log(localStorage.getItem("token"))
const token = localStorage.getItem("token")
let sinorden_tareas;
let orden_tareas=[];
 try {
     const res=await apiClient.post('/obtenertareas',{
       fechaInicio: fecha_init.toISOString().split("T")[0],
       fechaFin: fecha_fin.toISOString().split("T")[0]
    })
    sinorden_tareas=res.data

    sinorden_tareas.forEach(tarea => {
        console.log(tarea.tas_deadline.split("T")[0])
        let encontrado = orden_tareas.find(o => o.fecha_task === tarea.tas_deadline.split("T")[0]);

        if(encontrado){
            encontrado.tareas.push(tarea)

        }else {
            orden_tareas.push({'fecha_task':tarea.tas_deadline.split("T")[0],'tareas':[tarea]})
        }
        
        
    });
    set_tareas(orden_tareas)

    console.log(res.data)
} catch (error) {
    console.log(error)
    }

       
}


 function mostrar_mes(fechaactual, fech_ultimoMesAnterior, fech_ultimodia){

    let dias = []

    let countfila = 2

    let inicio = fechaactual.getDay()

    if(inicio == 0) {
        inicio = 7
    }
    let startPrev = fech_ultimoMesAnterior.getDate() - inicio + 2

    for(let i = 1; i < inicio; i++){
        let tarfech=new Date(fech_ultimoMesAnterior.getFullYear(),fech_ultimoMesAnterior.getMonth(),startPrev).toISOString().split("T")[0]
        let tarrea_encontrada=t_tareas.find(o=>o.fecha_task ===tarfech);
        if(tarrea_encontrada){
            dias.push({
            dia: startPrev,
            fila: 2,
            columna: i,
            tareas:tarrea_encontrada.tareas
        })
        }else{
        dias.push({
            dia: startPrev,
            fila: 2,
            columna: i,
            tareas:[]
        })}

        startPrev++
    }


    for(let x = 1; x <= fech_ultimodia.getDate(); x++){

        const fechaDia = new Date(
            fechaactual.getFullYear(),
            fechaactual.getMonth(),
            x
        )

        let columna = fechaDia.getDay()

        if(columna == 0) columna = 7
        let tarfech=fechaDia .toISOString().split("T")[0]
        let tarrea_encontrada=t_tareas.find(o=>o.fecha_task ===tarfech);
        if(tarrea_encontrada){
            dias.push({
                dia: x,
                fila: countfila,
                columna: columna,
                tareas:tarrea_encontrada.tareas
            })
        }else{
            dias.push({
                dia: x,
                fila: countfila,
                columna: columna,
                tareas:[]
                
            })
        }

        if(fechaDia.getDay() == 0){
            countfila++
        }
    }
  
    setmap_dias(dias)
   
}
function Asignar_mes_año(fecha){
const mes = fecha.getMonth()
    const year = fecha.getFullYear()

    switch(mes){

        case 0:
            settexto_mes("Enero " + year)
            break

        case 1:
            settexto_mes("Febrero " + year)
            break

        case 2:
            settexto_mes("Marzo " + year)
            break

        case 3:
            settexto_mes("Abril " + year)
            break

        case 4:
            settexto_mes("Mayo " + year)
            break

        case 5:
            settexto_mes("Junio " + year)
            break

        case 6:
            settexto_mes("Julio " + year)
            break

        case 7:
            settexto_mes("Agosto " + year)
            break

        case 8:
            settexto_mes("Septiembre " + year)
            break

        case 9:
            settexto_mes("Octubre " + year)
            break

        case 10:
            settexto_mes("Noviembre " + year)
            break

        case 11:
            settexto_mes("Diciembre " + year)
            break

        default:
            settexto_mes("")
    }
    

}
    useEffect(() => {
        const  fechas=cargar_mes(fecha_act)
        const fechaFinalConGrises = new Date(fechas.fech_ultimodia)
        fechaFinalConGrises.setDate(fechaFinalConGrises.getDate() + 7)
        cargarTareas(fechas.fech_ultimoMesAnterior, fechaFinalConGrises)
        Asignar_mes_año(fechas.fechaactual)

}, [fecha_act])

    useEffect(() => {
    const  fechas=cargar_mes(fecha_act)
    mostrar_mes(fechas.fechaactual,fechas.fech_ultimoMesAnterior,fechas.fech_ultimodia);


}, [t_tareas,fecha_act])

    
    

    return (
        <>
            <div id="contenedor">
                <br></br>
                <h1 id='textcalen'>Calendario</h1>
                <br></br>
                <div id='Calen_Tar'>
                    <div id='calen'>

                    <br></br>
                    <div id='header_mes'>
                        <h1>{texto_mes}</h1>
                        <button className='btn_mes' onClick={mes_ant}>{"<"}</button>
                        
                         <button className='btn_mes' onClick={mes_sig}>{">"}</button>
                    </div>
                    

                    <br></br>
                    
                    <div id='Calendario'>
                        <p id='Lunes' className='DiaSemana'>Lunes</p>
                        <p id='Martes' className='DiaSemana'>Martes</p>
                        <p id='Miercoles' className='DiaSemana'>Miércoles</p>
                        <p id='Jueves' className='DiaSemana'>Jueves</p>
                        <p id='Viernes' className='DiaSemana'> Viernes</p>
                        <p id='Sabado' className='DiaSemana'>Sábado</p>
                        <p id='Domingo' className='DiaSemana'>Domingo</p>
                       {map_dias.map((d, i) => (<Calend_Day   key={i} dia={d.dia} fila={d.fila} columna={d.columna} tareas={d.tareas} onClickDia={() => actulizarTareas(d.tareas)}/>))}


                        

                    </div>

                </div>
                <div id='Tareas' >
                    <div id='header_tareas_cal'>
                            
                        <h1>Tareas</h1>
                       
                        <button id='btnaddtask_cal' onClick={() => Actualizar_estado_modal(true)}>{"+"}</button>
                    </div>
                    <br></br>
                    <div>
                         {mostrarTareas.length > 0 ? (
                        mostrarTareas.map((t, i) => (<Tarjeta_Tarea key={i} tarea={t} onEdit={edittarea} />))
                    ) : (
                    <p>No hay tareas</p>)}

                    </div>
                   
                </div>
                </div>
                

            </div>
            {showModal && (
                <div >
                    <ModalCreaEditTask Actualizar_estado_modal={Actualizar_estado_modal} tarea={taskup} ModoModal={taskup ? "edit" : "create"} />
                </div>
            )}

        </>
    )
}

export default CalendarCommp