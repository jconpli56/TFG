import { useState } from 'react'
import './Calend_Day.css'

function Calend_Day(props) {

    const diainfo = props

    return (
        <div
            id="conten_day"
            style={{
                gridRow: diainfo.fila,
                gridColumn: diainfo.columna
            }}
            onClick={diainfo.onClickDia}
        >
            <p>{diainfo.dia}</p>
            {diainfo.tareas && diainfo.tareas.length > 0 && (
                <span id='numTask'>
                    {diainfo.tareas.length}
                </span>
            )}
        </div>
    )
}

export default Calend_Day