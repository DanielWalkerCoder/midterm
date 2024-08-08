import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setTreasures } from '../../global/slices/treasuresSlice';
import { setWeapons } from '../../global/slices/weaponsSlice';

const TreasureList = () => {
    const dispatch = useDispatch();
    const treasures = useSelector((state) => state.treasures.value);
    const [treasuresInput, setTreasuresInput] = useState('');
    const handleOnSubmit = async (e)=>{
        e.preventDefault()
        try{
          const newTreasureList = await axios.post('http://localhost:3000/api/treasures/create-treasure', {name: treasuresInput})
          dispatch(setTreasures(newTreasureList.data.payload2))
          setTreasuresInput("")
        }catch(error){
          console.log(error)
        }
      }
    const deleteTreasure = async (e, id)=>{
        e.preventDefault()
        try {
            const updatedTreasures = await axios.delete(`http://localhost:3000/api/treasures/delete-treasure-by-id/${id}`)
            dispatch(setTreasures(updatedTreasures.data.payload2))
        } catch (error) {
            console.log(error)
        }
      }
    const deleteAndMoveTreasure = async (e, id)=>{
        e.preventDefault()
        try {
            const findTreasure = await axios.get(`http://localhost:3000/api/treasures/get-treasure-by-id/${id}`)
            const foundTreasure = findTreasure.data.payload
            const updatedTreasures = await axios.delete(`http://localhost:3000/api/treasures/delete-treasure-by-id/${id}`)
            const updatedWeapons = await axios.post(`http://localhost:3000/api/weapons/create-weapon`, {name: foundTreasure.name})
            dispatch(setTreasures(updatedTreasures.data.payload2))
            dispatch(setWeapons(updatedWeapons.data.payload2))
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <>
            <div className="form-div">
                <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    name="treasuresInput"
                    onChange={e => setTreasuresInput(e.target.value)}
                    value = {treasuresInput}
                />
                <button type="submit">Add Treasure</button>
                </form>
            </div>
            <div className="treasureList-div">
                <ul>
                    {
                        treasures.map(treasure =>{
                            return(
                                <li key={treasure._id}>
                                    {treasure.name} <a href="#" onClick={(e)=>deleteTreasure(e, treasure._id)}>delete</a> <a href="#" onClick={(e)=>deleteAndMoveTreasure(e, treasure._id)}>acquire</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )   
}

export default TreasureList;