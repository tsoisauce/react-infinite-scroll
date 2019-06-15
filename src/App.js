import React, { Component } from 'react'
import axios from 'axios'
import './App.css';

class App extends Component {
  componentWillMount() {
    this.loadData();
  }

  loadData() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('errior: ', err)
      })
  }

  render() {
    return (
      <div className="App">
      <h1>Infinite Scroll Challenge</h1>
    </div>
    )
  }
}

export default App;
