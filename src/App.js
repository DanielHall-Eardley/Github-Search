import React, { Component } from 'react';
import Title from "./components/Title.js"
import Searchbar from "./components/Searchbar"
import ResultList from "./components/ResultList.js"
import FavouritesList from "./components/FavouritesList.js"
import {apiKey} from "./config.js"
import axios from "axios"
import './App.css';

class App extends Component{
 
  state={
    searchInput:"",
    previousSearch:"",
    results:[]
  }

  handleChange=(e)=>{
    this.setState({
      searchInput: e.target.value
    })
  }

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
        let newObject = {name: item.name, language: item.language, version: res, favourited: false, index:i}
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

  handleSubmit= async (e)=>{
    e.preventDefault()
    const {searchInput} = this.state
    if (searchInput === ""){
      alert("please enter a valid search query")
    }else if(this.state.results.length > 0){
      this.setState({
        results: []
      })
    }else{
      let apiCall = axios({
        method:"get",
        url: `https://api.github.com/search/repositories?q=${searchInput}&access_token=${apiKey}`
      }).then(res=>{
        let newArray = res.data.items.filter((item, i)=>{
          if(i<=10){
            return item
          }
        })
        return newArray
      })
      let results = await apiCall
      this.secondApiCall(results)
    }
  }

  toggleFavourite=()=>{
    this.setState((prevState, props)=>{
      let newArray = prevState.results.map((item, i)=>{
        if(item.index === i){
          return {name: item.name, language: item.language, version: item.version, favourited: !item.favourited, index: i}
        }else{
          return item
        }
      })
      console.log(newArray)
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
