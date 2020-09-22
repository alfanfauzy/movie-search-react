// Import component
import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Search from "../Component/Search/Search";
import View from "../Component/View/View";
import PopUpModal from "../Component/Modal/Modal";
import Loading from "../Component/Loading/Loading";
import Logo from "../images/movie.png"

//Import CSS
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux
import {
  addResultSearchMovie,
  addSearchMovieById,
} from "../store/action/movieAction";

import { useSelector, useDispatch } from "react-redux";

const Page = () => {

  // Initiation APIKey
  const API_KEY = "33e8c2d6";

  // Initiation state
  const [key, setKey] = useState("search");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  // Handle Modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Initiation for redux
  const dispatch = useDispatch();
  const resultSearchMovie = useSelector((state) => state.resultSearchMovie);
  const searchMovieById = useSelector((state) => state.searchMovieById);

  const search = async (searchMovie) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=${API_KEY}`);
    const data = await response.json()

    if (data.Response === "True") {
      dispatch(addResultSearchMovie(data.Search));
      setLoading(false);
    } else {
      setError(data.error);
      setLoading(false);
    }
    
  };

  const searchById = async (searchMovieById) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${searchMovieById}&apikey=${API_KEY}`);
    const data = await response.json()
    
    if (data.Response === "True") {
      dispatch(addSearchMovieById(data));
      setLoading(false);
    } else {
      setError(data.error);
      setLoading(false);
    }

    handleShow();
  };

  return (
    <div className="content p-5">
      <div className="header mb-2">
        <img src={Logo} alt="logo" style={{width: '100px'}}/>
      </div>
      <Container className="p-3">
        <Tabs
          id="controlled-tab-example"
          className="mb-5"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="search" title="Search Movie">
            <Search search={search} />
            {/** If result resultSearchMovie not 0 , 
                 then Check If Loading set true & Error has not message , show Component Loading
                 then Check If Error has a message , show Component Error Message
                 then show component View to show result search movie */}

            {resultSearchMovie.length !== 0 ? (
              loading && !error ? (
                <Loading />
              ) : error ? (
                <div className="errorMessage">{error}</div>
              ) : (
                <View
                  movies={resultSearchMovie}
                  moviesDetail={searchById}
                  tab={key}
                />
              )
            ) : (
                <span>Search your favorite movie</span>
            )}
            
          </Tab>

          <Tab eventKey="favorite" title="My Favorit Movie">
            <View
              movies={resultSearchMovie}
              moviesDetail={searchById}
              tab={key}
            />
          </Tab>
        </Tabs>
      </Container>

      <PopUpModal show={show} movieByID={searchMovieById} close={handleClose} />
    </div>
  );
};

export default Page;
