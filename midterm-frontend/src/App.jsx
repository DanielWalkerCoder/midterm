import React from 'react'
import './App.css'
import AllyList from './components/Ally/AllyList'
import FoeList from './components/Foe/FoeList'
import WeaponList from './components/Weapon/WeaponList';
import TreasureList from './components/Treasure/TreasureList';
import DisplayRecipeNames from './components/Recipe/DisplayRecipeNames/DisplayRecipeNames'
import NewRecipe from './components/Recipe/NewRecipe/NewRecipe'

function App() {
  return (
    <>
      <NewRecipe />
      <DisplayRecipeNames />
      <AllyList />
      <FoeList />
      <WeaponList />
      <TreasureList />
    </>
  )
}

export default App
