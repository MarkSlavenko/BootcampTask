import React, { Component } from 'react';
import './style.css'
import {Shows} from "../Shows/Shows";
import shortid from 'shortid'
import PropTypes from 'prop-types';

export class Table extends Component{

    constructor(props) {
        super(props)
        this.input = React.createRef()
    }

    state = {
        shows_pagination: this.props.shows.slice(0,30),
        i:0,
        visibleBtn : false,
        work_shows: this.props.shows,
        clear_shows: this.props.shows
    }

    nextPage = (e) => {
        e.preventDefault
        let i = this.state.i
        this.setState({i: i+=30})
        let show = this.state.work_shows
        this.setState({shows_pagination : show.slice(i, i+30)})
}

    prevPage = (e) => {
        e.preventDefault
        let i = this.state.i
        this.setState({i: i-=30})
        let show = this.state.work_shows
        this.setState({shows_pagination : show.slice(i, i+30)})
    }

    sortByValue = (type, e) => {
        e.preventDefault
        let shows = this.state.work_shows
        switch (type) {
            case 'sort_by_name':
                 shows.sort((a,b)=>a.show.title.localeCompare(b.show.title))
                break;
            case 'sort_by_season':
                  shows.sort((a,b)=>a.episode.season - b.episode.season)
                break;
            case 'sort_by_year':
                 shows.sort((a,b)=>b.show.year - a.show.year)
                break;
            default:
                console.log('Sort error. Undefined type!!!')
        }
        this.setState({shows_pagination : this.state.work_shows.slice(0,30), i: 0})
    }

    searchButton = (e) => {
        e.preventDefault
        let shows = this.state.clear_shows
        let work_shows = this.state.work_shows
        work_shows = shows.filter(item=> {if(item.show.title.toLowerCase().indexOf(this.input.current.value.toLowerCase()) !== -1) return item})
        if (this.input.current.value !== '') this.setState({visibleBtn:true})
        this.setState({i: 0, work_shows: work_shows,  shows_pagination : work_shows.slice(0, 30)})
    }

    clearButton = (e) => {
        e.preventDefault
        this.input.current.value = ''
        let shows = this.state.clear_shows
        this.setState({i: 0, visibleBtn:false, shows_pagination : shows.slice(0, 30), work_shows: shows})
    }

    render() {
        const shows_pagination = this.state.shows_pagination
        var i = this.state.i
        let showsTemplate
        if (shows_pagination.length) {
            showsTemplate = shows_pagination.map((item, b) => {

                                            return <Shows key={shortid.generate()}
                                                          id={i+b+1} name={item.show.title}
                                                          season={item.episode.season}
                                                          number={item.episode.number}
                                                          title={item.episode.title}
                                                          year={item.show.year}/>})
        } else {
            showsTemplate = <th width="50%">Error. Shows is not present.</th>
        }


        return (
            <div className="text-center container">
                <div className="row">
                    <h1>Table</h1>

                    <input
                        className='test-input'
                        defaultValue=''
                        placeholder='Enter value'
                        ref={this.input}
                    />

                    <button className="btn btn-search" onClick={this.searchButton}>Search</button>
                    {this.state.visibleBtn && <button className="btn btn-search" onClick={this.clearButton}>Clear</button>}

                    <table className="text-center" width="100%" border="2" cellPadding="4" cellSpacing="0" cols="6">
                        <tbody>
                        <tr>
                            <th width="5%">№</th>
                            <th width="30%"><a onClick={event => this.sortByValue('sort_by_name', event)}>Name of the show +</a></th>
                            <th width="8%"><a onClick={event => this.sortByValue('sort_by_season', event)}>Season +</a></th>
                            <th width="4%">Number</th>
                            <th width="30%">Title</th>
                            <th width="5%"><a onClick={event => this.sortByValue('sort_by_year', event)}>Year +</a></th>
                        </tr>
                        {showsTemplate}
                        </tbody>
                    </table>
                    <button onClick={i>0 ? this.prevPage : undefined} className={'prev btn ' + (i>0 ? '' : 'disabled')}><span>&larr;</span></button>
                    <button onClick={i<=this.state.work_shows.length-30 ? this.nextPage : undefined} className={'next btn ' + (i>=this.state.work_shows.length-30 ? 'disabled' : '')}><span>&rarr;</span></button>
                    <p className="total">Number of TV shows: <span>{this.state.work_shows.length}</span></p>
                </div>
            </div>
        )}
}

Table.propTypes = {
    shows: PropTypes.array.isRequired
}