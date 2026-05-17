
import './RegisterComp.css'
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiConfig';
import './Recu_clave.css';

function Recu_clave() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    
    const refNuevaPassword = useRef(null);
    const refConfirmarPassword = useRef(null);
    
    const [cargando, setCargando] = useState(false);
    const [validando, setValidando] = useState(true);
    const [tokenValido, setTokenValido] = useState(false);
    const [exito, setExito] = useState(false);


    async function validarToken() {
        try {
            const res = await apiClient.get(`/validar_token_clave/${token}`);
            if (res.data.success) {
                setTokenValido(true);
            }
        } catch (error) {
            console.log('Token inválido o expirado', error);
        } finally {
            setValidando(false);
        }
    }

    function validarCampos(nuevaPassword, confirmarPassword) {
        if (!nuevaPassword || !confirmarPassword) {
            console.log('Completa todos los campos');
            return false;
        }

        if (nuevaPassword !== confirmarPassword) {
            console.log('Las contraseñas no coinciden');
            return false;
        }

        if (nuevaPassword.length < 8) {
            console.log('Mínimo 8 caracteres');
            return false;
        }

        return true;
    }

    async function cambiarPassword(nuevaPassword, confirmarPassword) {
        try {
            const res = await apiClient.post('/cambiar_password_recuperacion', {
                token,
                nuevaPassword,
                confirmarPassword
            });

            if (res.data.success) {
                setExito(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.log('Error cambiando contraseña', error);
        } finally {
            setCargando(false);
        }
    }

    function actualizarPassword() {
        const nuevaPassword = refNuevaPassword.current.value;
        const confirmarPassword = refConfirmarPassword.current.value;

        if (!validarCampos(nuevaPassword, confirmarPassword)) {
            return;
        }

        setCargando(true);
        cambiarPassword(nuevaPassword, confirmarPassword);
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        validarToken();
    }, [token, navigate]);

    const handleClick = () => {
        actualizarPassword();
    };

    if (validando) {
        return (
            <div id="contenedor-clave">
                <div className="recu-validando">
                    <p>Validando enlace...</p>
                </div>
            </div>
        );
    }

    if (!tokenValido) {
        return (
            <div id="contenedor-clave">
                <div className="recu-token-invalido">
                    <h2>Acceso Denegado</h2>
                    <p>El enlace de recuperación es inválido o ha expirado.</p>
                    <p>Solicita uno nuevo desde la página de inicio de sesión.</p>
                </div>
            </div>
        );
    }

    if (exito) {
        return (
            <div id="contenedor-clave">
                <div className="recu-exito">
                    <h2>¡Éxito!</h2>
                    <p>Tu contraseña ha sido actualizada correctamente.</p>
                    <p>Serás redirigido al inicio de sesión en 3 segundos...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div id="contenedor-clave">
                <div className="recu-formulario">
                    <h2>Cambiar Contraseña</h2>
                    <form>
                        <div className="recu-grupo-entrada">
                            <label htmlFor="nuevaPassword">Nueva Contraseña</label>
                            <input 
                                id="nuevaPassword"
                                type="password" 
                                placeholder="Mínimo 8 caracteres"
                                ref={refNuevaPassword}
                            />
                        </div>
                        <div className="recu-grupo-entrada">
                            <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
                            <input 
                                id="confirmarPassword"
                                type="password"
                                placeholder="Confirmar"
                                ref={refConfirmarPassword}
                            />
                        </div>
                        <button className="recu-boton" onClick={handleClick} disabled={cargando}>
                            {cargando ? 'Actualizando...' : 'Actualizar contraseña'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Recu_clave;