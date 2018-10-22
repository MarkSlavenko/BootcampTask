import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

export function Index (props) {
    const {id, name, rating, status, overview, year} = props
    return (
        <tr>
            <td>{id}</td><td>{name}</td><td>{Math.ceil((rating)*100)/100}</td><td>{status.charAt(0).toUpperCase() + status.slice(1)}</td><td>{overview}</td><td>{year}</td>
        </tr>
    )
}

Index.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    status: PropTypes.string,
    overview: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]),
    year: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number])
}