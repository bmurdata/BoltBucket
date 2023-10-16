import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import './Card.css'

const Card = (props) => { 
    const [roofOpt, setRoof] = useState([]);
    const [wheelsOpt, setWheels] = useState([]);
    const [exteriorOpt, setExterior] = useState([]);
    const [interiorOpt, setInteriors] = useState([]);
    const [roofImg,setRoofImg]=useState('')
    const [extImg,setExteriorImg]=useState('')
    const [intImg,setInteriorImg]=useState('')
    const [wheelImg,setWheelImg]=useState('')

  useEffect(() => {
    const fetchOptions = async (option,setOption) => {
      try{
        console.log('Running fetch')
        const response=await fetch('http://localhost:3000/options/'+option)
        console.log('Running the code')
        const data=await response.json()

        setOption(data)
        
      }
      catch(error){
        console.log(error)
      }
    }    
    fetchOptions('wheel',setWheels)
    fetchOptions('roof',setRoof)
    fetchOptions('interior',setInteriors)
    fetchOptions('exterior',setExterior)
  }, []);
    const [car, setcar] = useState({id: 0, name: "", exterior: "", interior: "", wheels: "",roof:""})

    useEffect(() => {
        setcar({id: props.id, name:props.name,exterior: props.exterior, interior: props.interior, wheels: props.wheels, roof: props.roof});
    }, [props]);



    return (
        <div className="card">
            <div className='top-container' style={{ backgroundImage:`url(${car.image})`}}></div>
            <div className='bottom-container' style={{ background: "rgba(128,128,128,.8)"}}>
                <h3>{car.name}</h3>
                <p>{'Exterior: ' + car.exterior}</p>
                <img src={extImg}></img>
                <p>{'Roof' + car.roof}</p>
                <p>{'Interior' + car.interior}</p>
                <p>{'Wheels' + car.wheels}</p>
                <Link to={'/car/' + car.id}><a>Edit Car</a></Link>
            </div>
        </div>
    )
}

export default Card