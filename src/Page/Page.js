import React, { useState } from "react";
import { Container, Tabs, Tab, Table} from "react-bootstrap";
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Search from "../Component/Search/Search";
import View from "../Component/View/View";
// import Modal from "../Component/Modal/Modal";
import PopUpModal from "../Component/Modal/Modal";

const Page = () => {
  const [key, setKey] = useState("home");
  const [movies, setMovies] = useState([]);
  const [movieByID, setMovieById] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  const handleShow = () =>  setShow(true);
  const handleClose = () => setShow(false);

  const search = searchMovie => {
    setLoading(true);
    setError(null);

    fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=33e8c2d6`)
      .then(respones => respones.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === "True"){
          setMovies(jsonResponse.Search)
          setLoading(false);
        }else{
          setError(jsonResponse.error);
          setLoading(false);
        }
      });
  };

  const searchById = (searchMovieById) => {
    
    fetch(`https://www.omdbapi.com/?i=${searchMovieById}&apikey=33e8c2d6`)
      .then(respones => respones.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === "True"){
          setMovieById(jsonResponse);
          setLoading(false);
        }else{
          setError(jsonResponse.error);
          setLoading(false);
        }
      });
      handleShow();
  };
  
  
  return (

    <div className="content">
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Search Movie">
            <Search search={search}/>
            {loading && !error ? (
              <span>Search your favorite movie</span>
            ) : error ? (
              <div className="errorMessage">{error}</div>
            ) : (
              <View movies={movies} moviesDetail={searchById}/>
            )}

            
          </Tab>

          <Tab eventKey="favorite" title="My Favorit Movie">
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
                <tr>
                  <td>Avengers</td>
                  <td>2019</td>
                  <td>111111</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>

      <PopUpModal
          show={show}
          movieByID={movieByID}
          close={handleClose}
      />
      {/* <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      /> */}
                
    </div>
  );
};

export default Page;
