import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setWeapons } from '../../global/slices/weaponsSlice';
import { setTreasures } from '../../global/slices/treasuresSlice';

const WeaponList = () => {
    const dispatch = useDispatch();
    const weapons = useSelector((state) => state.weapons.value);
    let sortedWeapons = []
    for(let each of weapons){
        sortedWeapons.push(each.name)
    }
    sortedWeapons.sort((a,b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    const [weaponsInput, setWeaponsInput] = useState('');
    const handleOnSubmit = async (e)=>{
        // e.preventDefault()
        try{
          const newWeaponList = await axios.post('http://localhost:3000/api/weapons/create-weapon', {name: weaponsInput})
          dispatch(setWeapons(newWeaponList.data.payload2))
          setWeaponsInput("")
        }catch(error){
          console.log(error)
        }
      }
    const deleteWeapon = async (id)=>{
        try {
            const updatedWeapons = await axios.delete(`http://localhost:3000/api/weapons/delete-weapon-by-id/${id}`)
            dispatch(setWeapons(updatedWeapons.data.payload2))
        } catch (error) {
            console.log(error)
        }
      }
    const deleteAndMoveWeapon = async (id)=>{
        try {
            const findWeapon = await axios.get(`http://localhost:3000/api/weapons/get-weapon-by-id/${id}`)
            const foundWeapon = findWeapon.data.payload
            const updatedWeapons = await axios.delete(`http://localhost:3000/api/weapons/delete-weapon-by-id/${id}`)
            const updatedTreasures = await axios.post(`http://localhost:3000/api/treasures/create-treasure`, {name: foundWeapon.name})
            dispatch(setWeapons(updatedWeapons.data.payload2))
            dispatch(setTreasures(updatedTreasures.data.payload2))
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
                    name="weaponsInput"
                    onChange={e => setWeaponsInput(e.target.value)}
                    value = {weaponsInput}
                />
                <button type="submit">Add Weapon</button>
                </form>
            </div>
            <div className="weaponList-div">
                <ul>
                    {
                        sortedWeapons.map((weapon, index) =>{
                            return(
                                <li key={index}>
                                    {weapon} <a href="#" onClick={()=>deleteWeapon((weapons.find(thing => thing.name === weapon))._id)}>delete</a> <a href="#" onClick={()=>deleteAndMoveWeapon((weapons.find(thing => thing.name === weapon))._id)}>seek again</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )   
}

export default WeaponList;