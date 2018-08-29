import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var shows;
 const take_param = (param) => {
     var check =  JSON.parse(param)
     shows = check
}


const request_movies = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.trakt.tv/calendars/all/shows/2018-01-01/1', false);

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('trakt-api-version', '2');
    request.setRequestHeader('trakt-api-key', '50bdd2eaaf44ded248ade12837ff8a7a77e14add02efb9b0ef7edc034dab134a');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            take_param(this.responseText)
        }
    };

    request.send();
}



request_movies()



ReactDOM.render(<App shows={shows}/>, document.getElementById('root'));
registerServiceWorker();
