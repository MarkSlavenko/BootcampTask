import React, { Component } from 'react';
import './App.css'
import {Index} from "./components/Shows/index";
import {Search} from "./components/Search";
import {Loading} from "./components/Loading"
import {Genres} from "./components/Genres"
import shortid from 'shortid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {
    urlMaker,
    changePage,
} from './actions/index.js'

class App extends Component{

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.urlMaker('https://api.trakt.tv/shows/popular?extended=full&limit=50&genres=action');
    }

    render() {
        console.log(this.props)
        const shows_pagination = this.props.shows_pagination
        const page = this.props.page
        const i = this.props.page
        let showsTemplate
        if (shows_pagination.length) {
            showsTemplate = shows_pagination.map((item, b) => {

                return <Index key={shortid.generate()}
                              id={i*50+b-49} name={item.title}
                              rating={item.rating}
                              status={item.status}
                              overview={item.overview}
                              year={item.year}/>})
         }

        return (
            <div className="text-center container">
                <div className="row">
                    <h1>Table</h1>
                    <Search
                        url={"https://api.trakt.tv/search/show?extended=full&limit=50&query="}
                        func_search={this.props.urlMaker}
                    />

                    <Genres
                    url ={'https://api.trakt.tv/shows/popular?extended=full&limit=50&genres='}
                    func={this.props.urlMaker}
                    genres={['action', 'adventure', 'animation', 'anime', 'crime', 'fantasy', 'science-fiction', 'superhero']}
                    />

                    {!this.props.isEmpty ?  !this.props.loading ? <table className="text-center" width="100%" border="2" cellPadding="4" cellSpacing="0" cols="6">
                    <tbody>
                    <tr>
                        <th width="5%">№</th>
                        <th width="30%">Name of the show</th>
                        <th width="8%">Rating</th>
                        <th width="6%">Status</th>
                        <th width="30%">Overview</th>
                        <th width="7%">Year</th>
                    </tr>
                    {showsTemplate}
                    </tbody>
                </table>
                    : <Loading/> : <h1>Nothing Found</h1>}

                    <button onClick={page > 1 ? ()=> this.props.onChangePage(page-1) : undefined} className={'prev btn ' + (page > 1 ? '' : 'disabled')}><span>&larr;</span></button>
                    <button onClick={page>=this.props.totalPages ? undefined :()=>this.props.onChangePage(page+1)} className={'next btn ' + (page>=this.props.maxPage ? 'disabled' : '')}><span>&rarr;</span></button>
                    <br/>{<p className="total">Current page: <span>{page}</span></p>}
                    {<p className="total">Number of pages: <span>{this.props.totalPages}</span></p>}
                </div>
            </div>
)}
}

 App.propTypes = {
     shows_pagination: PropTypes.array.isRequired
}

const mapStateToProps = store => {
    return {
        page: store.query.page,
        loading: store.query.loading,
        isEmpty: store.query.isEmpty,
        shows_pagination: store.content.shows,
        totalPages: store.query.totalPages
    }
}

function mapDispatchToProps (dispatch) {
    return ({
        urlMaker: (url) => {
            dispatch(urlMaker(url))
        },
        onChangePage: (page) => {
            dispatch(changePage(page))
        },
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)