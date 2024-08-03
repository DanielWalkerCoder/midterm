import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setWeapons } from '../../global/slices/weaponsSlice';
import { setTreasures } from '../../global/slices/treasuresSlice';

const WeaponList = () => {
    const dispatch = useDispatch();
    const weapons = useSelector((state) => state.weapons.value);
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
            <h2>Weapons</h2>
            <div className="form-div">
                <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    name="weaponsInput"
                    onChange={e => setWeaponsInput(e.target.value)}
                    value = {weaponsInput}
                />
                <button type="submit">Submit</button>
                </form>
            </div>
            <div className="weaponList-div">
                <ul>
                    {
                        weapons.map(weapon =>{
                            return(
                                <li key={weapon._id}>
                                    {weapon.name} <a href="#" onClick={()=>deleteWeapon(weapon._id)}>delete</a> <a href="#" onClick={()=>deleteAndMoveWeapon(weapon._id)}>seek again</a>
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