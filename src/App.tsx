import { useState } from 'react';
import axios from 'axios';

function App() {
  const options = {
    method: 'GET',
    url: 'https://imdb-top-100-movies.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': 'ca15920c56mshf9c581b5644b811p131238jsnb4402ca00e5c',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.error(error);
    });

  return <div className="App"></div>;
}

export default App;
