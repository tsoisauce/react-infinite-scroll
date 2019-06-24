import React, { Component } from "react";
import Cards from "./Cards";
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
    this.loadingData();
    this.setState({ loading: false });
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
          // loading: false,      // setting state here will cause app to scroll to the top when page loads
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
      this.loadingData();
      this.setState({ loading: false });
    }
  }

  loadingData() {
    this.setState({ loading: true });
    this.getData();
  }

  render() {
    const { error, loading, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (loading) {
      return <div className="loader" />;
    } else {
      return (
        <div className="App">
          <h1>Infinite Scroll Challenge</h1>
          <Cards items={data} />
          <div className="lastElement">
            <button
              onClick={e => {
                this.loadingData();
                this.setState({ loading: false });
              }}
              className="button"
            >
              load more
            </button>
          </div>
        </div>
      );
    }
  }
}

export default InfiniteScroll;
