import React from 'react'

export const RecipeCard = ({id,name,steps,ingredients,imageUrl,deletUrl}) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} style={{width:'100px'}}/>
    </div>
  )
}

