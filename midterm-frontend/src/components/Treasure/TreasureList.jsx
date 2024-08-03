import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setTreasures } from '../../global/slices/treasuresSlice';

const TreasureList = () => {
    const dispatch = useDispatch();
    const treasures = useSelector((state) => state.treasures.value);
    const [treasuresInput, setTreasuresInput] = useState('');
    const handleOnSubmit = async (e)=>{
        // e.preventDefault()
        try{
          const newTreasureList = await axios.post('http://localhost:3000/api/treasures/create-treasure', {name: treasuresInput})
          dispatch(setTreasures(newTreasureList.data.payload2))
          setTreasuresInput("")
        }catch(error){
          console.log(error)
        }
      }
    const deleteTreasure = async (id)=>{
        try {
            const updatedTreasures = await axios.delete(`http://localhost:3000/api/treasures/delete-treasure-by-id/${id}`)
            dispatch(setTreasures(updatedTreasures.data.payload2))
        } catch (error) {
            console.log(error)
        }
      }
    return (
        <>
            <h2>Treasures</h2>
            <div className="form-div">
                <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    name="treasuresInput"
                    onChange={e => setTreasuresInput(e.target.value)}
                    value = {treasuresInput}
                />
                <button type="submit">Submit</button>
                </form>
            </div>
            <div className="treasureList-div">
                <ul>
                    {
                        treasures.map(treasure =>{
                            return(
                                <li key={treasure._id}>
                                    {treasure.name} <a href="#" onClick={()=>deleteTreasure(treasure._id)}>delete</a>
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