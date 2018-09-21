import React from "react"
import List from "./List"

const FavouritesList = (props)=>{
  const {results, toggleFavourite} = props

  /*I added the listType prop to distinguish between
  the two different areas where results can be rendered*/
  return(
    results.length === 0 ?
    <p className="no_result">Add to favourites</p>
    :
   <List results={results}
    toggleFavourite={toggleFavourite}
    listType="favourites"/>
  )
}

export default FavouritesList