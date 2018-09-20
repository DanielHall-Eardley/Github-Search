import React from "react"

const List = (props)=>{
  const {results, toggleFavourite} = props
    return(
    <div className="list_container">
      <div className="list_item">
        <p><b>Name</b></p>
        <p><b>Language</b></p>
        <p><b>Latest Tag</b></p>
      </div> 
      {results.map((item, i)=>{
        return(
          <div key={i} className="list_item">
            <p>{item.name}</p>
            <p>{item.language}</p>
            <p>{item.version}</p>
            {item.favourited === false ?
            <button type="button" onClick={()=>toggleFavourite()}>Add</button>
            :<div></div>
            }
          </div> 
        )}
      )}
    </div>
  )
}

export default List