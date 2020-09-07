const fetchData = (url, methods) => {
    return fetch(url, {
        method: methods,
    })
      .then((response) => {
        if (response.status === 200) {
            // console.log(response)
          return response.json();
        }
        throw new Error('error');
      })
      .catch((error) => console.error(error));
  }

  const fetchCreateData = (url, methods) => {
    return fetch(url, {
        method: methods,
    })
      .then((response) => {
        if (response.status === 200) {
            // console.log(response)
          return response.status;
        }
        throw new Error('error');
      })
      .catch((error) => console.error(error));
  }

  export {fetchData, fetchCreateData};