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

  // Call useEffects to get the current options
  useEffect(() => {
    if (wheelsOpt.length > 0) {
    getOptionImg(wheelsOpt,'selectWheel' ,'Metal');
      
    }
  }, [wheelsOpt]); 

  const handleOptionChange=(opttype,selType,e)=>{
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
                selectWheel(src.img)  
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
                console.log(oldWheel)
                              
                
            }
            else if(selType=='selectExterior'){
                selectExterior(src.img)
                updatePrice(price-src.price)
            }
            else if(selType=='selectInterior'){
                selectInterior(src.img)
                updatePrice(price-src.price)
            }
            else if(selType=='selectRoof'){
                selectRoof(src.img)
                updatePrice(price-src.price)
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

    return (
        <div style={{display:"flex"}} >
            <div style={{width:"25%",background: "rgba(128,128,128,.5)"}}>
            <form>
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
                <h3>Interior Options</h3>
                <img src={selected_Interior} alt="Roof" />
                <h3>Wheel Options</h3>
                <img src={selected_Wheel} alt="Wheel" />
            </div>
            
        </div>
        
    )
}

export default CreateCar