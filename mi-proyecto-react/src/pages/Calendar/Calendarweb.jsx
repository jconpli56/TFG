
import { useEffect } from 'react'
import './Calendarweb.css'
import MenuComp from '../../components/Menu/MenuComp'
import CalendarComp from './CalendarComp'
import { useNavigate } from 'react-router-dom'


function Calendarweb( user) {
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/")
        }
    }, [])
    
    console.log(user)
  

    return (
        <>
            <div id='Container'>
                <div id='ManuL'>
                    <MenuComp></MenuComp>
                </div>

                <div id='web'>
                    <CalendarComp></CalendarComp>
                </div>

            </div>



        </>
    )
}

export default Calendarweb