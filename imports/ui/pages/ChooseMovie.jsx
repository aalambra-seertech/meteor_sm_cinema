import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MovieItem from '../components/MovieItem.jsx'
 
class ChooseMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: []
		}
	}
	startMeteorSubscriptions(){
		Meteor.subscribe('movies');
	}

	onSelectMovie(){
		console.log($('#movies').val());
	}

	componentDidMount(){
		var me = this;
		
		Meteor.call('movies.getMovies', function(error, result){
			me.setState({
				movieList: result
			});
		});
	}

	render() {
		var movieListItems = this.state.movieList.map(function(item, i){
			return (
					<div key={i} className="col-sm-4">
						<MovieItem movieItem={item} />
					</div>
				);
		});

		return (
			<div className="page-container">
				<header>
				  	<h1>sm cinema</h1>
				</header>
				<p className="choose-movie-label">Select Movie:</p>
				<div className="row">
					{movieListItems}
				</div>
				<br />
			</div>
		);
	}
}

export default ChooseMovie;
