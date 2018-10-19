import React, { Component } from 'react';
import './App.css'
import {Shows} from "./components/Shows/Shows";
import {Search} from "./components/Search";
import {Loading} from "./components/Loading"
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
        this.props.urlMaker('https://api.trakt.tv/shows/popular?extended=full&limit=50&genres=action', 'Action');
    }

    render() {
        console.log(this.props)
        const shows_pagination = this.props.shows_pagination
        const page = this.props.page
        const i = this.props.page
        let showsTemplate
        if (shows_pagination.length) {
            showsTemplate = shows_pagination.map((item, b) => {

                return <Shows key={shortid.generate()}
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
                    <Search url={"https://api.trakt.tv/search/show?extended=full&limit=50&query="} func_search={this.props.urlMaker}/>
                    {!this.props.loading ? <table className="text-center" width="100%" border="2" cellPadding="4" cellSpacing="0" cols="6">
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
                    : <Loading/> }

                    <button onClick={page > 1 ? ()=> this.props.onChangePage(page-1) : undefined} className={'prev btn ' + (page > 1 ? '' : 'disabled')}><span>&larr;</span></button>
                    <button onClick={page>=this.props.maxPage ? undefined :()=>this.props.onChangePage(page+1)} className={'next btn ' + (page>=this.props.maxPage ? 'disabled' : '')}><span>&rarr;</span></button>
                    {<p className="total">Current page: <span>{page}</span></p>}
                    {<p className="total">Number of pages: <span>{this.props.maxPage}</span></p>}
                </div>
            </div>
)}
}

 App.propTypes = {
     shows_pagination: PropTypes.array.isRequired
}

const mapStateToProps = store => {
    return {
        page: store.other.page,
        loading: store.other.loading,
        nothingFound: store.other.nothingFound,
        shows_pagination: store.main.content,
        category: store.other.category,
        maxPage: store.other.maxPage
    }
}

function mapDispatchToProps (dispatch) {
    return ({
        urlMaker: (url, category) => {
            dispatch(urlMaker(url, category))
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