import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
 
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Movies } from '../../api/movies.js';
 
// App component - represents the whole app
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieOpts: [],
			cinemaOpts: null
		}
	}
	startMeteorSubscriptions(){
		Meteor.subscribe('movies');
	}

	logChange(val){
		this.refs.movies.value
		console.log("Selected: " + $('#movies').val());
	}

	onSelectMovie(){
		console.log($('#movies').val());
	}

	componentDidMount(){
		var me = this;
		
		Meteor.call('movies.getMovies', function(error, result){
			console.log('result '+JSON.stringify(result));
			me.setState({
				movieOpts: result
			});
		});
	}

	render() {
		var movieOptArr = this.state.movieOpts.map(function(item, i){
			return (<option value={item.value} key={i}>{item.label}</option>);
		});

		return (
			<div className="container">
				<header>
				  	<h1>sm cinema</h1>
				</header>

				<br />
				<br />
				<p>Select Movie:</p>
				<select id="movies" ref="movies" onChange={this.onSelectMovie}>
					{movieOptArr}
				</select>
			</div>
		);
	}
}

export default App;

/*
export default createContainer(() => {
	Meteor.subscribe('movies');

	let movies = Movies.find({}, { sort: { createdAt: -1 } }).fetch();
	let moviesmap = movies.map(function(item){
		return {"value": item["_id"]["_str"], "label": item.name}
	});

	return {
		movies: moviesmap,
	};
}, App);
*/
