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
	}

	render() {
		return (
			<div className="container">
				<header>
				  	<h1>Watch a movie now</h1>

				  	<AccountsUIWrapper />

				  	<br />
				  	<br />
				  	<p>Select Movie:</p>
				  	{
				  		this.props.movies.length > 0 ?
				  		<Select
					  name="movies"
					  id= "movies"
					  value="12"
					  options={this.props.movies}
					/> : ''
				  	}
				  	
				</header>

				
			</div>
		);
	}
}

App.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default createContainer(() => {
	Meteor.subscribe('movies');

	let movies = Movies.find({}, { sort: { createdAt: -1 } }).fetch();
	let moviesmap = movies.map(function(item){
		return {"value": item.id, "label": item.name}
	});

	return {
		movies: moviesmap,
	};
}, App);