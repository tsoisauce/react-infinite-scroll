import React, { Component } from "react";
import "../App.css";

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      data: [],
      perPage: 20,
      page: 1
    };
  }

  componentDidMount() {
    this.getData();
    window.addEventListener("scroll", e => {
      if (!this.state.loading) {
        this.infiniteScroll();
      }
    });
  }

  getData() {
    const { page, perPage } = this.state;
    fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${perPage}`
    )
      .then(response => response.json())
      .then(response => {
        setTimeout(function() {
          console.log("time")
          this.setState(prevState => ({
            page: prevState.page + 1,
            loading: false,
            data: [...this.state.data, ...response]
          }));
        }, 10000)
      })
      .catch(error => {
        this.setState({
          error
        });
        console.log("error: ", error);
      });
  }

  infiniteScroll() {
    let lastElement = document.querySelector("ul > li:last-child");
    let lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastElementOffset) {
      this.setState({ loading: true });
      this.getData();
    }
  }

  render() {
    const { error, loading, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1>Infinite Scroll Challenge</h1>
          <div>
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.email}</li>
              ))}
            </ul>
            <button
              onClick={e => {
                this.setState({ loading: true });
                this.getData();
              }}
            >
              Load More Comments
            </button>
          </div>
        </div>
      );
    }
  }
}

export default InfiniteScroll;
