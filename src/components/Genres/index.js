import React from 'react';
import './style.css'
import PropTypes from 'prop-types';


export function Genres ({url, func, genres}) {
    return (
        <div className="col-lg-6">
            <span>Category : </span>
            <select id="selectBox" className="test-input" onChange={() => {
                let value =  document.getElementById("selectBox").value.toLowerCase().split(' ')
                func(`${url}${value}`)}}>
                {genres.map(x => <option  key={x}>{x.charAt(0).toUpperCase() + x.slice(1)}</option>)}
            </select>
        </div>
    )
}

    Genres.propTypes = {
        url: PropTypes.string.isRequired,
        func: PropTypes.func.isRequired,
        genres: PropTypes.array.isRequired
    }