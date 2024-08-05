import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FoeList.css'

function FoeList() {
  const [foeList, setFoeList] = useState([])
  const [foeInput, setFoeInput] = useState("")
  useEffect(() => {
    async function getFoes(){
      try {
        const allFoes = await axios.get('http://localhost:3000/api/foes/get-all-foes')
        setFoeList(allFoes.data.payload)
      } catch (error) {
        console.log(error)
      }
    }
    getFoes()
  }, [])
  
  const handleOnSubmit = async (e)=>{
    try{
      const newFoeList = await axios.post('http://localhost:3000/api/foes/create-foe', {name: foeInput})
      setFoeList(newFoeList.data.payload2)
      setFoeInput("")
    }catch(error){
      console.log(error)
    }
  }

  const deleteFoe = async (id)=>{
    try {
        const updatedFoes = await axios.delete(`http://localhost:3000/api/foes/delete-foe-by-id/${id}`)
        setFoeList(updatedFoes.data.payload2)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <div className="form-div">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="foeInput"
            onChange={e => setFoeInput(e.target.value)}
            value = {foeInput}
          />
          <button type="submit">Add Foe</button>
        </form>
      </div>
      <div className="foeList-div">
        <ul>
        {
          foeList.map(foe =>{
                  return(
                    <li key={foe._id}>
                      {foe.name} <a href="#" onClick={()=>deleteFoe(foe._id)}>delete</a>
                    </li>
                  )
                })
        }
        </ul>
      </div>
    </div>
  )
}

export default FoeList