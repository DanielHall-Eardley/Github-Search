import React from "react"

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