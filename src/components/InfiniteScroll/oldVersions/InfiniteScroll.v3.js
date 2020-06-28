import React, { useState } from "react";
import { Cards } from "../../Cards";
import { useInfiniteScroll } from "../hooks";

const InfiniteScroll = () => {
  const [ fetchData, setFetchData ] = useState({
    data: [],
    perPage: 20,
    page: 1
  });
  const [ isLoading, setIsLoading ] = useInfiniteScroll(getData);
  const [ isError, setIsError ] = useState(null);
  const { data } = fetchData;

  function getData() {
    setTimeout(async () => {
      await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${fetchData.page}&_limit=${fetchData.perPage}`)
      .then(response => {
        if (!response.ok && response.status >= 400 && response.status < 600) {
          setIsError(response.statusText);
          throw Error(response.statusText);
        }
        return response.json();
      }).then(response => {
        setFetchData(prevState => ({
          page: prevState.page + 1,
          data: [...fetchData.data, ...response]
        }));
        setIsLoading(false);
      }).catch(error => {
        setIsError(error);
        throw new Error(error);
      });
    });
  };

  if (isError) {
    return <div>Error: {isError.message}</div>;
  } else if (isLoading) {
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