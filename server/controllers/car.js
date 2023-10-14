import {pool} from '../config/database.js';

const getCustomCar=async(req,res)=>{
    try{
        const query =`SELECT exterior, roof, wheels, interior, image FROM customcar;`
        const results= await pool.query(query)
        res.status(200).json(results.rows)
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message })
    }
}

const getCustomCarById=async(req,res)=>{
    try{       
        const carID=req.params.carID;
        const query = `SELECT exterior, roof, wheels, interior, image FROM customcar;`
        const results= await pool.query(query, [carID])
        if (results.rows.length === 0) {
            res.status(404).json({error: 'Car not found' });
        } else {
            res.status(200).json(results.rows[0]) 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:  error.message });     

    } 
}

// Create new custom car
const createCustomCar = async(req, res) => {
    try{
        const {exterior, roof, wheels, interior} = req.body;
        const query = `INSERT INTO customcar (exterior, roof, wheels, interior, image) VALUES ($1,$2,$3,$4,$5) RETURNING id;`;
        const results= await pool.query(query,[exterior,roof,wheels,interior]);
        const newCarID = results.rows[0].id;
        res.status(201).json({message: 'Car created', carID: newCarID});
    }
    catch (error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// Update an existing custom car
const updateCustomCar = async(req, res) => {
    try{       
        const carID=req.params.carID;
        const {exterior, roof, wheels, interior} = req.body;
        const query = ` UPDATE customcar SET exterior=$1, roof=$2, wheels=$3, interior=$4, image=$5 WHERE id=$6;`
        await pool.query(query, [exterior,roof,wheels,interior,carID])
        res.status(200).json({message: 'Car updated' });      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:  error.message });     

    } 
}

// Delete an existing custom car
const deleteCustomCar = async(req, res) => {
    try{       
        const carID=req.params.carID;        
        const query = ` DELETE FROM customcar SET WHERE id=$1;`
        await pool.query(query, [carID])
        res.status(200).json({message: 'Car deleted' });      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:  error.message });     

    } 
}

export default {
    getCustomCar,
    getCustomCarById,
    createCustomCar,
    updateCustomCar,
    deleteCustomCar
};