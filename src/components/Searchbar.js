import React from "react"

/*searchbar component, functions are passed down from
App.js. I always use a functional component if state is not
needed in its scope.*/
const Searchbar = (props)=>{
  const {handleChange, handleSubmit, searchInput} = props
  return(
    <form className="search_bar" onSubmit={handleSubmit}>
      <input className="input" onChange={handleChange} value={searchInput}/>
      <button className="search_button">Search</button>
    </form>
  )
}

export default Searchbar