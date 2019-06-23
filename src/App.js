import React, { Component } from "react";
import "./App.css";
class App extends Component {
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
        this.setState(prevState => ({
          page: prevState.page + 1,
          loading: false,
          data: [...this.state.data, ...response]
        }));
      })
      .catch(error => {
        this.setState({
          error
        });
        console.log("error: ", error);
      });
  }

  infiniteScroll() {
    // checks to see if div is scrolled into view
    let lastElement = document.getElementsByClassName("lastElement");
    let bounding = lastElement[0].getBoundingClientRect();
    let elementTop = bounding.top;
    let elementBottom = bounding.bottom;
    let isVisible = elementTop >= 0 && elementBottom <= window.innerHeight;
    if (isVisible) {
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
          <div className="cards">
            {data.map(item => (
              <div key={item.id} className="card">
                <div className="email">{item.email}</div>
                <div className="name">{item.name}</div>
                <div className="comment">{item.body}</div>
              </div>
            ))}
          </div>
          <div className="lastElement"></div>
        </div>
      );
    }
  }
}

export default App;
