
import { useRef,useState } from 'react';
import './InitsessionComp.css';
import apiClient from '../../services/apiConfig';
import { Navigate, useNavigate } from 'react-router-dom';

function InitsessionComp() {

    const refgmail=useRef(null)
    const refclave=useRef(null)
    const refmailrecuperar=useRef(null)
    const [modal_clave, setModalClave] = useState(false)
    const navigate = useNavigate()
    function registUSer(){

         navigate('/registro');
         console.log("hola mundo")

    }
    
        function inituser(){

         navigate('Inicio/calendar');
         console.log("hola mundo")

    }  
async function initlogin(){ 
    try {
     const res=await apiClient.post('/Initsesion',{
        gmail:refgmail.current.value,
        clave:refclave.current.value
    })

    if(res.data.token){

        localStorage.setItem("token",res.data.token)
        console.log("login corecto" )
         inituser()
    }else{
        console.log("error login")
    }} catch (error) {
    console.log(error)
    }
   
       
}

async function com_mail(){
  try {
    const res = await apiClient.post('/confirmar_email', {
      email: refmailrecuperar.current.value
    });

    if(res.data.success) {
      //alert("Si el email existe, recibirás un enlace");
      setModalClave(false);
      console.log("Hola mundo");
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}



    return (
        <>
            <div id="contenedorinit">

               <div id='blockinit'>
                <div className='divinit'>
                     <p className='pclass'>Gmail</p>
                    <input  ref={refgmail} placeholder='Correo@gmail.com' className='input'></input>
                </div>
               
                <div className='divinit'>
                     <p className='pclass'>Contraseña</p>
                    <input placeholder="Contraseña" ref={refclave} className='input' type='password'></input>
                </div>

                <div className='divinit'>
                    <button onClick={initlogin} className='btn_init'>Iniciar sesion</button>
                    <br></br>
                    <button onClick={() => setModalClave(true)} className='btnclass'>Recuperar contraseña</button>
          
                </div>
                <div id='blockregist'>
                    <p className='pclass'>Eres nuevo</p>
                    <button onClick={registUSer} className='btnclass'>Registrarse</button>
                </div>


               </div>
                
               


            </div>
                      {modal_clave && <div id='Block_clave'>
                        <div id='div_M_Clave'>
                            <div id='block_off_mclave'>
                             <h3 className='titulo-modal'>Recuperar contraseña</h3> 
                             <button onClick={() => setModalClave(false)} className='btn_init'>X</button>

                            </div>
                            <input ref={refmailrecuperar} className='input' type='gmail' id='inpmail' placeholder='Correo@gmail.com'></input>
                            <br></br>
                            <button onClick={com_mail} className='btn_init' id='btnmail'>Enviar correo de recuperación</button>   

                        </div>
                    
                        
                        </div>}



        </>
    )
}





export default InitsessionComp;