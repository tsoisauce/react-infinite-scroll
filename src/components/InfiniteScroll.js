import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import "../App.css";

const InfiniteScroll = () => {
  const [ state, setState ] = useState({
    error: null,
    loading: false,
    data: [],
    perPage: 20,
    page: 1
  });

  const getData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${state.page}&_limit=${state.perPage}`)
    .then(response => {
      if (!response.ok && response.status >= 400 && response.status < 600) {
          throw Error(response.statusText);
      }
      return response.json();
    }).then(response => {
      setState({
        page: state.page + 1,
        data: [...state.data, ...response]
      });
    }).catch(error => {
      setState({ error: error });
      console.log("error: ", error);
      throw new Error(error);
    });
  };

  useEffect(() => {
    getData();
  }, []);  

  const { error, loading, data } = state;

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
                getData();
              }}
              className="button"
            >
              load more
            </button>
          </div>
        </div>
    );
  }
};

export default InfiniteScroll;