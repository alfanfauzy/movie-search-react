import React, {useState} from 'react'

import {Button } from "react-bootstrap";

// Import Toast Component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = (props) => {
    const [valueSearch, setValueSearch] = useState("");

    const handleInputSearch = (e) => { 
      setValueSearch(e.target.value);
    };

    const handleButtonSearch = (e) => {
      if(valueSearch.length !== 0){
        props.search(valueSearch);
      }else{
        toast.error("⛔ Please fill the input search");
      }
    };

    return (
        <div>
          <form>
            <div className="input-group mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search your favorite movie . ."
                onChange={handleInputSearch}
                value={valueSearch}
              />
              <div className="input-group-append">
                <Button
                  variant="primary"
                  id="basic-addon2"
                  onClick={handleButtonSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </div>
    )
}

export default Search
