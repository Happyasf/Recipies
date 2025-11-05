import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='home'>
      <h1>RecipieBook</h1>
      <button onClick={()=>navigate("/recipies")}>Főzz, posztolj, inspirálj !</button>
    </div>
  )
}