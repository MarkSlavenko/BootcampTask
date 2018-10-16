import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

export function Shows (props) {
    const {id, name, rating, status, title, year} = props
    return (
        <tr>
            <td>{id}</td><td>{name}</td><td>{Math.ceil((rating)*100)/100}</td><td>{status.charAt(0).toUpperCase() + status.slice(1)}</td><td>{title}</td><td>{year}</td>
        </tr>
    )
}

Shows.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    number: PropTypes.number,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]),
    year: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number])
}