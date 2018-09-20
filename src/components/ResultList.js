import React from "react"
import List from "./List"

const ResultList = (props)=>{
  const {results, toggleFavourite} = props

  return(
    results.length > 0 ?
    <List results={results}
    toggleFavourite={toggleFavourite}/>
    :
    <p className="no_result">Pease submit a search query</p>
  )
}

export default ResultList