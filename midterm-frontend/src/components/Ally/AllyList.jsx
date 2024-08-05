import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AllyList.css'

function AllyList() {
  const [allyList, setAllyList] = useState([])
  const [allyInput, setAllyInput] = useState("")
  useEffect(() => {
    async function getAllies(){
      try {
        const allAllies = await axios.get('http://localhost:3000/api/allies/get-all-allies')
        setAllyList(allAllies.data.payload)
      } catch (error) {
        console.log(error)
      }
    }
    getAllies()
  }, [])
  
  const handleOnSubmit = async (e)=>{
    // e.preventDefault()
    try{
      const newAllyList = await axios.post('http://localhost:3000/api/allies/create-ally', {name: allyInput})
      setAllyList(newAllyList.data.payload2)
      setAllyInput("")
    }catch(error){
      console.log(error)
    }
  }

  const deleteAlly = async (id)=>{
    try {
        const updatedAllies = await axios.delete(`http://localhost:3000/api/allies/delete-ally-by-id/${id}`)
        setAllyList(updatedAllies.data.payload2)
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
            name="allyInput"
            onChange={e => setAllyInput(e.target.value)}
            value = {allyInput}
            // autoFocus
          />
          <button type="submit">Add Ally</button>
        </form>
      </div>
      <div className="allyList-div">
        <ul>
        {
          allyList.map(ally =>{
                  return(
                    <li key={ally._id}>
                      {ally.name} <a href="#" onClick={()=>deleteAlly(ally._id)}>delete</a>
                    </li>
                  )
                })
        }
        </ul>
      </div>
    </div>
  )
}

export default AllyList