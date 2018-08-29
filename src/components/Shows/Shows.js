import React, { Component } from 'react';
import './style.css'
import PropTypes from 'prop-types';

export class Shows extends Component{

    render() {
    const {id, name, season, number, title, year} = this.props
        return (
            <tr>
                <td>{id}</td><td>{name}</td><td>{season}</td><td>{number}</td><td>{title}</td><td>{year}</td>
            </tr>
        )}
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