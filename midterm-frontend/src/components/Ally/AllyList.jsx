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
  let sortedAllyList = []
  for(let each of allyList){
    sortedAllyList.push(each.name)
    }
  sortedAllyList.sort((a,b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
  
  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    try{
      const newAllyList = await axios.post('http://localhost:3000/api/allies/create-ally', {name: allyInput})
      setAllyList(newAllyList.data.payload2)
      setAllyInput("")
    }catch(error){
      console.log(error)
    }
  }

  const deleteAlly = async (e, id)=>{
    e.preventDefault()
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
          sortedAllyList.map((ally, index) =>{
                  return(
                    <li key={index}>
                      {ally} <a href="#" onClick={(e)=>deleteAlly(e, (allyList.find(thing => thing.name === ally))._id)}>delete</a>
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