import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

export function Shows (props) {
    const {id, name, season, number, title, year} = props
    return (
        <tr>
            <td>{id}</td><td>{name}</td><td>{season}</td><td>{number}</td><td>{title}</td><td>{year}</td>
        </tr>
    )
}

Shows.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    season: PropTypes.number,
    number: PropTypes.number,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object]),
    year: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number])
}