import React, { Component } from 'react';
import Title from "./components/Title.js"
import Searchbar from "./components/Searchbar"
import ResultList from "./components/ResultList.js"
import FavouritesList from "./components/FavouritesList.js"
import axios from "axios"
import './App.css';

class App extends Component{
 
  state={
    searchInput:"",
    previousSearch:"",
    results:[]
  }
  
  //captures the text input value
  handleChange=(e)=>{
    this.setState({
      searchInput: e.target.value
    })
  }

  /*This function takes the results array and makes a second request 
  to the github api, using data from the first request to get the 
  latest tag for each search result. After that, it extracts the 
  relevant and updates the state. I used functional setState to add
  the new objects to state, as the existing array is iterated through.
  I also added a "favourite:false" boolean to each object, to be used 
  to track if a result is favourited or not.*/
  secondApiCall=(array)=>{
    array.map((item, i)=>{
      axios({
        method: "get",
        url: item.tags_url
      }).then(res=>{
        if(res.data.length > 0){ 
          return res.data[0].name
        }else{
          return "N/A"
        }
      }).then(res=>{
        let newObject = {name: item.name, owner: item.owner.login, language: item.language, version: res, favourited: false, index:i}
        this.setState((prevState, props)=>{
          let newArray = prevState.results.concat(newObject)
          return {
            results: newArray,
            searchInput: ""
          }
        })
      })
    })
  }

  /*this function submits the get request to the github api,
  with the user's search query and then returns the first ten results to an array.
  The array then gets fed to the secondApiCall function as parameter, 
  I also had to add async/await to stop the secondApiCall function from excuting 
  before the request was finished. */
  handleSubmit= async (e)=>{
    e.preventDefault()
    this.setState({
      results: []
    })
    const {searchInput} = this.state
    if (searchInput === ""){
      alert("please enter a valid search query")
    }else{
      let apiCall = axios({
        method:"get",
        url: `https://api.github.com/search/repositories?q=${searchInput}`
      }).then(res=>{
        let newArray = res.data.items.filter((item, i)=>{
          if(i<=9){
            return item
          }
        })
        return newArray
      })
      let results = await apiCall
      this.secondApiCall(results)
    }
  }

  /*In this function I have used the setState function to take the existing array,
  flip the favourite property to its opposite boolean value and then return the updated array to state.
  This function handles both adding and removing items from the favourites list*/
  toggleFavourite=(i)=>{
    this.setState((prevState, props)=>{
      let newArray = prevState.results.map((item)=>{
        if(item.index === i){
          return {...item, favourited: !item.favourited}
        }else{
          return item
        }
      })
      return{
        results: newArray
      }  
    })
  }

  render() {
    const {results, searchInput} = this.state
    return (
      <div className="grid_container">
        <Title title="My Github Favourites"/>

        <div className="search_container">
          <Searchbar handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          searchInput={searchInput}/>

          <ResultList results={results}
            toggleFavourite={this.toggleFavourite}/>
        </div>

        <div className="favourites_container">
          <FavouritesList results={results}
          toggleFavourite={this.toggleFavourite}/>
        </div>
      </div>
    );
  }
}

export default App;
