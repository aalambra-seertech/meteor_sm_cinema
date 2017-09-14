import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
 
class MovieItem extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		movieItem: {}
	}

	static propTypes = {
		movieItem: React.PropTypes.object.isRequired
	}

	render() {
		let item = this.props.movieItem;
		let link = "/movies/"+item["_id"]["_str"];
		return (
			<div className="movie-item">
				<a href={link}>
					<img src={item.image_url} />
				</a>
				<div className="movie-item-dtl">
					<p className="movie-item-rating">Rated {item.rating}</p>
					<h6 className="movie-item-title">{item.name}</h6>
					<br />
				</div>
			</div>
		);
	}
}

export default MovieItem;
