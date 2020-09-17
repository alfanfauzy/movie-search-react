import React, {useState} from 'react'

import {Button } from "react-bootstrap";

const Search = (props) => {
    const [valueSearch, setValueSearch] = useState("");

    const handleInputSearch = (e) => {
        setValueSearch(e.target.value);
    };
    
    const handleButtonSearch = (e) => {
         props.search(valueSearch);
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
                  variant="outline-primary"
                  id="basic-addon2"
                  onClick={handleButtonSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
    )
}

export default Search
