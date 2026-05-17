import "./Tarjeta_Tarea.css";
import iconoCalendario from '../../assets/SVG/calendar-svgrepo-com.svg'
import iconolapiz from '../../assets/SVG/lapiz.svg'
function TarjetaTarea({ tarea, onEdit }) {

  function handleDragStart(e) {
    let fechaSolo = tarea.tas_deadline;
    
    if(fechaSolo.includes('T')) {
      const fechaUTC = new Date(fechaSolo);
      const year = fechaUTC.getUTCFullYear();
      const month = String(fechaUTC.getUTCMonth() + 1).padStart(2, '0');
      const day = String(fechaUTC.getUTCDate()).padStart(2, '0');
      fechaSolo = `${year}-${month}-${day}T00:00:00.000Z`;
    }
    
    const tareaLimpia = {
      pk_tas_id: tarea.pk_tas_id,
      tas_name: tarea.tas_name,
      tas_description: tarea.tas_description,
      tas_state: tarea.tas_state,
      tas_type: tarea.tas_type,
      tas_createdate: tarea.tas_createdate,
      tas_deadline: fechaSolo
    };
    e.dataTransfer.setData("tarea", JSON.stringify(tareaLimpia));
  }

  function extraerFechaUTC(fechaISO) {
    const fechaUTC = new Date(fechaISO);
    const year = fechaUTC.getUTCFullYear();
    const month = String(fechaUTC.getUTCMonth() + 1).padStart(2, '0');
    const day = String(fechaUTC.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function handleEditar() {
    onEdit(tarea);
  }

  return (
    <div className={`tarjeta tarjeta-${tarea.tas_state}`} draggable onDragStart={handleDragStart}>
      
      <h4 className="tarjeta-titulo">
        Nombre:{tarea.tas_name}
      </h4>

      <p className="tarjeta-fecha">
          <img id='iconcalen' src={iconoCalendario} alt="Icono Calendario"/>{extraerFechaUTC(tarea.tas_deadline)}
      </p>

      <p className="tarjeta-estado">
        Estado: <span>{tarea.tas_state}</span>

      </p>
      <p className="tarjeta-estado">
          Tipo: <span>{tarea.tas_type}</span>
      </p>

      <div className="tarjeta-editar" onClick={handleEditar}>
        <img id='iconlapiz' src={iconolapiz} alt="Icono Lápiz"/>
      </div>

    </div>
  );
}

export default TarjetaTarea;
