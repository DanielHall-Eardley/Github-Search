import React from "react"
import List from "./List"

const ResultList = (props)=>{
  const {results, toggleFavourite} = props
  
  /*I added a conditional render to stop the app from crashing
  when there are no search results.*/
  return(
    results.length > 0 ?
    <List results={results}
    toggleFavourite={toggleFavourite}
    listType="results"/>
    :
    <p className="no_result">Pease submit a search query</p>
  )
}

export default ResultList