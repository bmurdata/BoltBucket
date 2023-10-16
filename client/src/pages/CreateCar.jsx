import React,{ useState, useEffect }  from 'react'
import '../App.css'

const mapOptions=(options)=>{
    return options.map(option =>
        <option value={option.option}>{option.option}</option>
        );
}
const CreateCar = () => {
    
    // Get options and swap display as needed
    const [roofOpt, setRoof] = useState([]);
    const [wheelsOpt, setWheels] = useState([]);
    const [exteriorOpt, setExterior] = useState([]);
    const [interiorOpt, setInteriors] = useState([]);
    const [price,updatePrice]=useState(2000)
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
  // Select items
  const [selected_Roof,selectRoof]=useState([])
  const [selected_Exterior,selectExterior]=useState([])
  const [selected_Interior,selectInterior]=useState([])
  const [selected_Wheel,selectWheel]=useState('')
  const [myCar,setCar]=useState({
    name:'name',
    exterior:'selected_Exterior', 
    roof:'selected_Roof', 
    wheels:'selected_Wheel', 
    interior:'selected_Interior',
    image:''

})
  // Call useEffects to get the current options
  useEffect(() => {
    if (wheelsOpt.length > 0) {
    getOptionImg(wheelsOpt,'selectWheel' ,'Metal');
      
    }
  }, [wheelsOpt]); 
  useEffect(() => {
    if (wheelsOpt.length > 0) {
    getOptionImg(interiorOpt,'selectInterior' ,'Leather');
      
    }
  }, [interiorOpt]); 
  useEffect(() => {
    if (exteriorOpt.length > 0) {
    getOptionImg(exteriorOpt,'selectExterior' ,'Red');
      
    }
  }, [exteriorOpt]); 
  useEffect(() => {
    if (wheelsOpt.length > 0) {
    getOptionImg(roofOpt,'selectRoof' ,'Carbon Flash');
      
    }
  }, [roofOpt]); 
  const handleOptionChange=(opttype,selType,e)=>{
    const {name, value}=e.target
    console.log(name)
    setCar((prevCar) => ({
        ...prevCar,
        [name]: value, // Update the selected option
      }));
    getOptionImg(opttype,selType,e.target.value)
    
  }
  function getOptionImg(optType,selType,optText){
    console.log('Finding item')
    try{
        const src=optType.find(item=>item.option==optText)
        
        if (src){
            console.log('Found the item '+src.img)
            if (selType=='selectWheel'){
                console.log(selected_Wheel)
                const oldWheel=optType.find(item=>item.img==selected_Wheel)
                
                if(oldWheel){
                    console.log('Found the wheel')
                    if(oldWheel.price>src.price){
                        const priceDifference = src.price - oldWheel.price;
                        console.log(priceDifference)
                        updatePrice(price+priceDifference)
                    }
                    else if(oldWheel.price<src.price){
                        const priceDifference = src.price-oldWheel.price ;
                        updatePrice(price+priceDifference)
                    }
                    
                }
                else{
                    updatePrice(price+src.price)
                }
                selectWheel(src.img) 
                console.log(oldWheel)
                              
                
            }
            else if(selType=='selectExterior'){
                
                const oldWheel=optType.find(item=>item.img==selected_Exterior)
                selectExterior(src.img)
                if(oldWheel){
                    console.log('Found the wheel')
                    if(oldWheel.price>src.price){
                        const priceDifference = src.price - oldWheel.price;
                        console.log(priceDifference)
                        updatePrice(price+priceDifference)
                    }
                    else if(oldWheel.price<src.price){
                        const priceDifference = src.price-oldWheel.price ;
                        updatePrice(price+priceDifference)
                    }
                    
                }
                else{
                    updatePrice(price+src.price)
                }
            }
            else if(selType=='selectInterior'){
                const oldWheel=optType.find(item=>item.img==selected_Interior)
                selectInterior(src.img)
                if(oldWheel){
                    console.log('Found the wheel')
                    if(oldWheel.price>src.price){
                        const priceDifference = src.price - oldWheel.price;
                        console.log(priceDifference)
                        updatePrice(price+priceDifference)
                    }
                    else if(oldWheel.price<src.price){
                        const priceDifference = src.price-oldWheel.price ;
                        updatePrice(price+priceDifference)
                    }
                    
                }
            }
            else if(selType=='selectRoof'){
                const oldWheel=optType.find(item=>item.img==selected_Roof)
                selectRoof(src.img)
                updatePrice(price-src.price)
                if(oldWheel){
                    console.log('Found the wheel')
                    if(oldWheel.price>src.price){
                        const priceDifference = src.price - oldWheel.price;
                        console.log(priceDifference)
                        updatePrice(price+priceDifference)
                    }
                    else if(oldWheel.price<src.price){
                        const priceDifference = src.price-oldWheel.price ;
                        updatePrice(price+priceDifference)
                    }
                    
                }
            }
            
        }
        else{
            ''
        }
    }
    catch(error){
        console.log(error)
        return ''
    }
  }
  const [name,setName]=useState('')
  function handleNameChange(e){
    setName(e.target.value)
    setCar((prevCar) => ({
        ...prevCar,
        name: e.target.value, // Update the selected option
      }));
    console.log(name)
  }

  const createCar = (event) => {
    event.preventDefault()
    console.log(event)
    const options = {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCar),
    }

    fetch('http://localhost:3000/cars/', options)
    window.location = '/'
}
    return (
        <div style={{display:"flex"}} >
            <div style={{width:"25%",background: "rgba(128,128,128,.5)"}}>
            <form onSubmit={createCar}>
            <input
            type="text"
            name='name'
            value={name}
            onChange={(e)=>handleNameChange(e)}
          />
                <h3>Roof Options</h3>
                <select id='roof' name='roof' onChange={(e)=>handleOptionChange(roofOpt,'selectRoof',e)}>{mapOptions(roofOpt)}</select>
                <h3>Exterior Options</h3>
                <select name ='exterior' onChange={(e)=>handleOptionChange(exteriorOpt,'selectExterior',e)}>{mapOptions(exteriorOpt)}</select>
                <h3>Interior Options</h3>
                <select name ='interior' onChange={(e)=>handleOptionChange(interiorOpt,'selectInterior',e)}>{mapOptions(interiorOpt)}</select>
                <h3>Wheel Options</h3>
                <select name ='wheels' onChange={(e)=>handleOptionChange(wheelsOpt,'selectWheel',e)}>{mapOptions(wheelsOpt)}</select>
                <input type='submit'></input>
            </form>
            </div>
            <div style={{width:"25%"}}>
                <h2>Cost: ${price}</h2>
                <h3>Roof Selection</h3>
                <img src={selected_Roof} alt="Roof" />
                <h3>Exterior Options</h3>
                <img src={selected_Exterior} alt="Roof" />
                
            </div>
            <div style={{width:"15%"}}></div>
            <div style={{width:"25%"}}>
            <h3>Interior Options</h3>
                <img src={selected_Interior} alt="Roof" />
                <h3>Wheel Options</h3>
                <img src={selected_Wheel} alt="Wheel" />
            </div>
            
        </div>
        
    )
}

export default CreateCar