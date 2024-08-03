import React from 'react'
import './App.css'
import AllyList from './components/Ally/AllyList'
import FoeList from './components/Foe/FoeList'
import WeaponList from './components/Weapon/WeaponList';
import TreasureList from './components/Treasure/TreasureList';

function App() {
  return (
    <>
      <AllyList />
      <FoeList />
      <WeaponList />
      <TreasureList />
    </>
  )
}

export default App
