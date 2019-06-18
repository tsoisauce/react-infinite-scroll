import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      this.setState({
        isLoaded: true,
        items: response.data
      });
    })
    .catch((err) => {
      console.log('errior: ', err)
    })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1>Infinite Scroll Challenge</h1>
          <div>
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}


export default App;
