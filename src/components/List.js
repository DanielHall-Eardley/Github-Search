import React from "react"

/*The list component is used to render both result
and favourite sections*/
const List = (props)=>{
  const {results, toggleFavourite, listType} = props
    return(
    //hardcoded header
    <div className="list_container">
      <div className="list_item">
        <p><b>Name</b></p>
        <p><b>Language</b></p>
        <p><b>Latest Tag</b></p>
      </div> 
      {results.map((item, i)=>{
        /*The map function uses the listType and the "favourited" boolean
        to render either the results or favourites lists*/
        if(listType === "favourites" && item.favourited === true){
          return(
            <div key={i} className="list_item">
              {/*each name is wrapped in a link to its repo*/}
              <a href={`https://github.com/${item.owner}/${item.name}`}>
              <p className="list_entry">{item.name}/{item.owner}</p>
              </a>
              <p className="list_entry">{item.language}</p>
              <p className="list_entry">{item.version}</p>
              <button className="list_button" type="button" onClick={()=>toggleFavourite(item.index)}>Clear</button>
            </div> 
          )
        }else if(listType==="results"){
          return(
            <div key={i} className="list_item">
              <a href={`https://github.com/${item.owner}/${item.name}`}>
              <p className="list_entry">{item.name}/{item.owner}</p>
              </a>
              <p className="list_entry">{item.language}</p>
              <p className="list_entry">{item.version}</p>
              {/*This button has an onClick function that triggers the toggleFavourite function,
              taking the index of indvidual item as a parameter. The button also has a conditional
              render so that it disappears when the list item is added to the favourite list*/}
              {item.favourited===false?
              <button className="list_button" type="button" onClick={()=>toggleFavourite(item.index)}>Add</button>
              :
              <div></div>}
            </div> 
          )
        }
      })}
    </div>
  )
}

export default List