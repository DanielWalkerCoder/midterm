import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setWeapons } from '../../global/slices/weaponsSlice';

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
                                    {weapon.name} <a href="#" onClick={()=>deleteWeapon(weapon._id)}>delete</a>
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