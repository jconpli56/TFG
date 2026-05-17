
import './RegisterComp.css'
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiConfig';

function RegisterComp() {
    const navigate = useNavigate()

    function ReturnInitsesion(){
        navigate('/');
    }

    const refnombre = useRef(null);
    const refgmail = useRef(null);
    const refclave = useRef(null);
    const refconfirclave = useRef(null);

    async function registuser(){
        try{
            const res = await apiClient.post('/Insertar_usuario',{
                gmail: refgmail.current.value,
                username: refnombre.current.value,
                password_hash: refclave.current.value
            })

            if(res.data.ok){
                console.log("Usuario registrado correctamente");
                ReturnInitsesion()
            }else{
                console.log("No se pudo registrar el usuario");
            }
        } catch(error){
            console.log("Algo salio mal"+error)
        }
    }

    return (
        <>
            <div id="contenedor-registro">
                <div id='formulario-principal'>
                    <div className='fila-campo'>
                        <p className='etiqueta'>Nombre de usuario</p>
                        <input ref={refnombre} placeholder='usuario' className='campo-texto' type='text'></input>
                    </div>

                    <div className='fila-campo'>
                        <p className='etiqueta'>Gmail</p>
                        <input ref={refgmail} placeholder='Correo@gmail.com' className='campo-texto' type='email'></input>
                    </div>

                    <div className='fila-campo'>
                        <p className='etiqueta'>Contraseña</p>
                        <input ref={refclave} placeholder="Contraseña" className='campo-texto' type='password'></input>
                    </div>

                    <div className='fila-campo'>
                        <p className='etiqueta'>Confirmar Contraseña</p>
                        <input ref={refconfirclave} placeholder="Repita Contraseña" className='campo-texto' type='password'></input>
                    </div>

                
                        <button onClick={registuser} id='btn-registrar'>Registrarse</button>
               

                    <div id='seccion-login'>
                        <p className='etiqueta'>¿Ya tienes cuenta?</p>
                        <button onClick={ReturnInitsesion} className='btn-secundario'>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComp;