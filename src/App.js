import React, { Component } from "react";
import axios from "axios";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      perPage: 10,
      page: 1,
      totalPages: null,
      scrolling: false
    };
  }

  componentDidMount() {
    this.getData();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.infiniteScroll(e);
    });
  }

  getData() {
    const { page, perPage } = this.state;
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${perPage}`
      )
      .then(response => {
        this.setState({
          isLoaded: true,
          data: [...this.state.data, ...response.data]
        });
      })
      .catch(err => {
        console.log("errior: ", err);
      });
  }

  loadMoreData() {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoaded: false,
      scrolling: true
    }));
    this.getData();
    // console.log(this.state.data)
  }

  infiniteScroll() {
    let lastElement = document.querySelector("ul > li:last-child");
    let lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastElementOffset) {
      this.getData();
    }
  }

  render() {
    const { error, isLoaded, data } = this.state;
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
              {data.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
            <button
              onClick={e => {
                this.loadMoreData();
              }}
            >
              Load More Posts
            </button>
          </div>
        </div>
      );
    }
  }
}

export default App;
