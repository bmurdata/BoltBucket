import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import './Card.css'

const Card = (props) => { 
    
    const [car, setcar] = useState({id: 0, name: "", exterior: "", interior: "", wheels: "",roof:""})

    useEffect(() => {
        setcar({id: props.id, name:props.name,exterior: props.exterior, interior: props.interior, wheels: props.wheels, roof: props.roof});
    }, [props]);

    return (
        <div className="card">
            <div className='top-container' style={{ backgroundImage:`url(${car.image})`}}></div>
            <div className='bottom-container'>
                <h3>{car.name}</h3>
                <p>{'Exterior: ' + car.exterior}</p>
                <p>{'Roof' + car.roof}</p>
                <p>{'Interior' + car.interior}</p>
                <p>{'Wheels' + car.wheels}</p>
                <Link to={'/car/' + car.id}><a>Edit Car</a></Link>
            </div>
        </div>
    )
}

export default Card