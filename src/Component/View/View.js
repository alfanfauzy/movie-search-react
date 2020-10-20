//Import Component
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

// Import Storage
import {
  getImdbIdFavoriteToken,
  setImdbIdFavoriteToken,
  setMovieFavoriteToken,
  getMovieFavoriteToken,
  removeMovieFavoriteToken,
} from "../../utils/storage";

// Redux
import { addMovieFavorite } from "../../store/action/movieAction";
import { useSelector, useDispatch } from "react-redux";

const View = (props) => {
  //Initiation for redux
  const dispatch = useDispatch();
  const movieFavorite = useSelector((state) => state.movieFavorite);

  //Initiation variable to handle Tab
  const getTab = props.tab === "search" ? "search" : "favorite";

  //Initiation variable to get List Favorite Movie
  const getArrayMovieFavorite = getImdbIdFavoriteToken();

  // Handle Add Movie to Favorite with parameter imdbID & movie
  const addMovieToFavorite = (imdbID, movie) => {
    let array = movieFavorite;
    let addArray = true;

    // Check in var array , if there are imdbID in array , set addArray to false
    array.map((item, key) => {
      if (item === imdbID) {
        array.splice(key, 1);
        addArray = false;
      }
      return null;
    });

    // when imdb not in array , addArray set to true and will push imdbID to array.
    if (addArray) {
      array.push(imdbID);
    }

    // send array data to State Store ==> movieFavorite
    dispatch(addMovieFavorite([...array]));

    // set array imdbID data to save in localstorage
    setImdbIdFavoriteToken(movieFavorite);

    //Get item in local storage by imdbID
    const storage = getMovieFavoriteToken(imdbID);

    // Check if result storage is null
    // set data movie to save in Localstorage
    // if result return not null, remove data movie by parameter (imdbID)
    if (storage == null) {
      setMovieFavoriteToken(imdbID, movie);
    } else {
      removeMovieFavoriteToken(imdbID);
    }
  };

  // Handle show detail movie in modal with parameter value model and boolean
  const showMovieById = (value, openModal) => {
    props.moviesDetail(value, openModal);
  };

  // Handle show list movie with parameter value tab and value movie
  const showMovie = (valueTab, valueMovie) => {
    if (valueMovie !== null) {
      // If value tab == search, show data movie from result fetch API
      if (valueTab === "search") {
        return valueMovie.map((movie, index) => (
          <tr key={index}>
            <td>
              <button
                style={{ border: "none", background: "transparent" }}
                onClick={() => {
                  showMovieById(movie.imdbID, true);
                }}
              >
                {movie.Title}
              </button>
            </td>
            <td>{movie.Year}</td>
            <td>{movie.imdbID}</td>
            <td>
              {movieFavorite.includes(movie.imdbID) ? (
                <IoIosHeart
                  onClick={() => addMovieToFavorite(movie.imdbID, movie)}
                  style={{ color: "red" }}
                />
              ) : (
                <IoIosHeartEmpty
                  onClick={() => addMovieToFavorite(movie.imdbID, movie)}
                  style={{ color: "red" }}
                />
              )}
            </td>
          </tr>
        ));

        // If value tab == favorite, show data movie from local storage
      } else {
        const getMovieFavorite = showMovieFavorite();

        // if user has not add movie to favorite show this.
        if (
          getMovieFavorite === null ||
          getMovieFavorite.length === 0 ||
          getMovieFavorite === undefined
        ) {
          return (
            <tr>
              <td colSpan="4">
                <span style={{ textAlign: "center" }}>
                  Add movie to your favorite
                </span>
              </td>
            </tr>
          );

          // if user has add movie to favorite show list.
        } else {
          if (getMovieFavorite !== null) {
            return getMovieFavorite.map((movie, index) => (
              <tr key={index}>
                <td>
                  <a
                    href="/#"
                    onClick={() => {
                      showMovieById(movie.imdbID, true);
                    }}
                  >
                    {movie.Title}
                  </a>
                </td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
                <td>
                  {movieFavorite.includes(movie.imdbID) ? (
                    <IoIosHeart
                      onClick={() => addMovieToFavorite(movie.imdbID, movie)}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <p> - </p>
                  )}
                </td>
              </tr>
            ));
          }
          return null;
        }
      }
    }
  };

  // Handle show list favorite movie.
  const showMovieFavorite = () => {
    let favList = [];

    // Check if data movie favorite not null,
    // then get data movie favorite and set to array favList.

    if (getArrayMovieFavorite !== null) {
      for (var i = 0; i < getArrayMovieFavorite.length; i++) {
        let x = getArrayMovieFavorite[i];
        favList[i] = getMovieFavoriteToken(x);
      }
      return favList;
    } else {
      return null;
    }
  };

  // Handle useEffect, execute this when state movie favorite has update.
  useEffect(() => {
    if (getArrayMovieFavorite !== null) {
      dispatch(addMovieFavorite([...getArrayMovieFavorite]));
    }
  }, []);

  return (
    <div>
      <Table striped borderless hover size="lg">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>IMDBId</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{showMovie(getTab, props.movies)}</tbody>
      </Table>
    </div>
  );
};

export default View;
