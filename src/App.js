import React, { Component } from 'react';
import './App.css'
import {Shows} from "./components/Shows/Shows";
import shortid from 'shortid'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
// import { pageChange } from './actions/pageChange'
// import { searchByValue } from './actions/searchByValue'
// import { clearPage } from './actions/clearPage'
import {
    urlMaker,
    setQuery,
    changePage
} from './actions/index.js'

class App extends Component{



    constructor(props) {
        super(props)
        this.input = React.createRef()
        this.state = {
            visibleBtn : false,
        }
    }


    searchButton = () => {
    this.props.search(this.input.current.value)
       if (this.input.current.value !== '') this.setState({visibleBtn:true})
    }

    clearButton = () => {
        this.props.clear()
        this.input.current.value = ''
        this.setState({visibleBtn:false})
    }

    componentDidMount() {
        this.props.urlMaker('https://api.trakt.tv/shows/popular?extended=full&limit=30&genres=action', 'Action');
    }

    render() {
        console.log(this.props)
        const shows_pagination = this.props.shows_pagination
        const sort = this.props.sort
        const page = this.props.page
        const i = this.props.page
        let showsTemplate
        if (shows_pagination.length) {
            showsTemplate = shows_pagination.map((item, b) => {

                return <Shows key={shortid.generate()}
                              id={i*30+b-29} name={item.title}
                              rating={item.rating}
                              status={item.status}
                              title={item.overview}
                              year={item.year}/>})
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
                            <th width="30%">Name of the show</th>
                            <th width="8%">Rating</th>
                            <th width="6%">Status</th>
                            <th width="30%">Title</th>
                            <th width="7%">Year</th>
                        </tr>
                        {showsTemplate}
                        </tbody>
                    </table>
                    <button className={'prev btn '}><span>&larr;</span></button>
                    <button  className={'next btn '}><span>&rarr;</span></button>
                    {/*<p className="total">Number of TV shows: <span>{this.props.shows.length}</span></p>*/}
                </div>
            </div>
)}
}

// App.propTypes = {
//     shows: PropTypes.array.isRequired
// }

const mapStateToProps = store => {
    return {
        page: store.other.page,
        loading: store.other.loading,
        nothingFound: store.other.nothingFound,
        shows_pagination: store.main.content,
        query: store.other.query,
        category: store.other.category,
        maxPage: store.other.maxPage
    }
}

function mapDispatchToProps (dispatch) {
    return ({
        urlMaker: (url, category) => {
            dispatch(urlMaker(url, category))
        },
        onChangeQuery: (query) => {
            dispatch(setQuery(query))
        },
        onChangePage: (page) => {
            dispatch(changePage(page))
        }
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)