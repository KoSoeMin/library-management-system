import { useEffect, useState } from "react";

function useFetch(url, method = 'GET') {
    let [data,setData] = useState(null);
    let [postData, setPostData] = useState(null);
    let [ loading, setLoading ] = useState(false);
    let [ error, setError ] = useState(null);

    useEffect(() => {
      let abortController = new AbortController();
      let signal = abortController.signal;

        if(method === "POST" && postData === null) {
          return () => abortController.abort();
        }

        let options = {
          signal,
          method
        };

        setLoading(true);
        setError(null);

        let fetchData = () => {
            fetch(url , options)
            .then(res => {
              if(!res.ok) {
                throw Error('something went wrong');
              }
              return res.json();
            })
            .then(data => {
              setData(data);
              setError(null);
              setLoading(false);
            })
            .catch(e => {
              if (e.name === "AbortError") return;
              setError(e.message);
              setLoading(false);
            })
        }

        if(method === "POST" && postData) {
          options = {
            ...options,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          }
          fetchData();
        }

        if(method === "GET") {
          fetchData();
        }

        //cleanup function
        return () => {
          abortController.abort();
        }
      },[url, method, postData]);
    return { setPostData, data , loading , error };
}

export default useFetch;