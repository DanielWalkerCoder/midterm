import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Resume.css'
import raichu from '../../assets/raichu.jpg'

function Resume() {
    const recipes = useSelector((state) => state.recipes.value);
    const [experience, setExperience] = useState(0);

    useEffect(() => {
        let newExp = 0
        for(let each of recipes){
            newExp += each.cooked
            newExp += 2 * each.liked
        }
        setExperience(newExp)
    }, [recipes])

    return(
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <div style={{ marginRight: '0px !important' , padding: '0px', flexShrink: 0}}>
                <img src={raichu} alt="Raichu" style={{width: '45%', height: 'auto'}}></img>
            </div>
            <div style={{margin: '0px', padding: '0px', flexGrow: 0}}>
                <p>Dannondorf</p>
                <p>Level {(experience - (experience % 10)) / 10} Chef</p>
                <p>{10 - (experience % 10)} experience to Level {(experience - (experience % 10)) / 10 + 1}</p>
            </div>
        </div>
    )
}

export default Resume