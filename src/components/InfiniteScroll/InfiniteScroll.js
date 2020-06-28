import React, { useState, useEffect } from "react";
import { Cards } from "../Cards";

const InfiniteScroll = () => {
  const [ fetchData, setFetchData ] = useState({
    data: [],
    perPage: 20,
    page: 1
  });
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(null);

  const getData = () => {
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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsLoading(true);
  };

  useEffect(() => {
    // mounts once after component mounts, similar to componenDidMount
    getData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  useEffect(() => {
    if (!isLoading) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const { data } = fetchData;

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