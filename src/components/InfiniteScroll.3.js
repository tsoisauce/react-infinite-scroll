import React, { useState } from "react";
// import Cards from "./Cards";
import "../App.css";

const InfiniteScroll = () => {
  const [ state, setState ] = useState({
    error: null,
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

  return (
    <div>  
      <button onClick={getData}>Test</button>
    </div>
  )
};

export default InfiniteScroll;