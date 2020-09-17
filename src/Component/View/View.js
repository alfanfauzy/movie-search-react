import React, { useState, useEffect } from 'react'
import { Table } from "react-bootstrap";
import useLocalStorage from '../../hooks/useLocalStorage';

import { getToken, setToken } from "../../utils/storage";

const View = (props) => {
  const [toggled, setToggled] = useState(false);
  const [storage, setStorage] = useLocalStorage('movie_favorite', getToken() || []);
  const storageFavorite = getToken() ? getToken() : [];

  /* Define a function that toggles the visibility of the image */
  const toggleImage = (id) => {
    const movieById = storage.find(e => e === id);
    
    if (movieById === undefined) {
      addMovieToFavorite(id);
      setToggled(true);
    } else {
      deleteMovieToFavorite(id);
      setToggled(false);
    }
  }

  const showMovieById = (value, openModal) => {
    props.moviesDetail(value, openModal);
  }

  const addMovieToFavorite = (id) => {
    storage.push(id);
    setStorage(storage);
  }

  const deleteMovieToFavorite = (id) => {
    const filtered = storage.filter(function (v) { return v !== id; });
    setStorage(filtered);
  }

  const imageName = (id) => {
    const movieById = storage.find(e => e === id);
    console.log(id, movieById);

    if (movieById !== undefined) {
      return (
        <img
          style={{ cursor: 'pointer', maxWidth: '50px' }}
          src="/images/save.png"
          onClick={() => { toggleImage(id) }}
        />
      );
    } else {
      return (
        <img
          style={{ cursor: 'pointer', maxWidth: '50px' }}
          src="/images/unsave.png"
          onClick={() => { toggleImage(id) }}
        />
      );
    }
  }

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>IMDBId</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.movies.map((movie, index) => (
            <tr key={index}>
              <td><a href="#" onClick={() => { showMovieById(movie.imdbID, true) }}>{movie.Title}</a></td>
              <td>{movie.Year}</td>
              <td>{movie.imdbID}</td>
              <td>
                {imageName(movie.imdbID)}
                {/* {toggled} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

export default View
