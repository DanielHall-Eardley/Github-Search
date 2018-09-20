import React from "react"
import List from "./List"

const FavouritesList = (props)=>{
  const {results, toggleFavourite} = props
  let favouritesArray = results.fiter(el=>{
    if(el.favourited === true){
      return el
    }
  })
  return(
    favouritesArray.length === 0 ?
    <div></div>
    :
   <List results={favouritesArray}
    toggleFavourite={toggleFavourite}/>
  )
}

export default FavouritesList