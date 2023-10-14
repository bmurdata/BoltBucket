import React,{ useState, useEffect } from 'react'
import '../App.css'
import Card from '../components/Card';
const ViewCars = () => {
    console.log('Getting all cars')
    const [cars, setCars] = useState([]);
console.log('SEE THE CARS')

  useEffect(() => {
    const fetchcars = async () => {
      try{
        console.log('Running fetch')
        const response=await fetch('/api/cars')
        console.log('Running the code')
        console.log(response)
        const data=await response.json()
        console.log(data)
        setCars(data)
      }
      catch(error){
        console.log(error)
     
      }
      
    }
    console.log('Getting cars')
    
    fetchcars()
    console.log('CARS')
    console.log(cars)

  }, []);
    return (
        <div>
            {
                cars && cars.length > 0 ?
                cars.map((car,index) => 
                    
                   <Card id={car.id} 
                   roof={car.roof} 
                   exterior={car.exterior} 
                   wheels={car.wheels} 
                   image={car.image}
                   name={car.name} />

                ) : <h3 className="noResults">{'No Cars Yet 😞'}</h3>
            }
        </div>
    )
}

export default ViewCars