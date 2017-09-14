import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
 
class ChooseSchedule extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			movieItem: null,
			locationOpts: [],
			scheduleOpts: []
		};
		this.onLocationChange = this.onLocationChange.bind(this);
		this.onCheckout = this.onCheckout.bind(this);
	}

	startMeteorSubscriptions(){
		Meteor.subscribe('movies');
		Meteor.subscribe('schedule');
	}

	onLocationChange(){
		let me = this;
		let loc = $('#CSMovieItemLoc').val();
		Meteor.call('schedule.getSchedule', this.props.match.params.movie_id, loc, function(error, result){
			console.log(result);
			me.setState({
				scheduleOpts: result
			});
		});
	}

	onCheckout(){
		let sched_id = $('#CSMovieItemSched').val();
		let seats = $('#CSMovieItemSeats').val();
		window.location = '/reserve/'+sched_id+'/seats/'+seats;
	}

	componentDidMount(){
		var me = this;
		Meteor.call('movies.getMovie', this.props.match.params.movie_id, function(error, result){
			//console.log('result '+JSON.stringify(result));
			me.setState({
				movieItem: result
			});
		});

		Meteor.call('schedule.getSchedLocations', this.props.match.params.movie_id, function(error, result){
			console.log('result '+JSON.stringify(result));
			me.setState({
				locationOpts: result
			}, function(){
				me.onLocationChange();
			});
		});
	}

	render() {
		var movieItem = this.state.movieItem;

		var locationOptItems = this.state.locationOpts.map(function(item,i){
			return (<option key={i} value={item.value}>{item.label}</option>);
		});

		var scheduleOptItems = this.state.scheduleOpts.map(function(item,i){
			return (<option key={i} value={item.value} disabled={item.disabled}>{item.label}</option>);
		});

		var seatOptItems = [1,2,3,4,5,6,7,8,9,10].map(function(item){
			return (<option key={item} value={item}>{item}</option>);
		});

		return (
			<div className="page-container">
				<header>
				  	<h1>sm cinema</h1>
				</header>
				<br />
				<div className="row">
					<div className="col-sm-6">
						<img className="cs-movie-item-image" src={movieItem==null? '' : movieItem.image_url} />
						<p className="cs-movie-item-rating">{movieItem==null? '' : 'Rated '+movieItem.rating}</p>
					</div>
					<div className="col-sm-6">
						<h4 className="cs-movie-item-title">{movieItem==null? '' : movieItem.name}</h4>
						<p className="cs-movie-item-synopsis">{movieItem==null? '' : movieItem.synopsis}</p>
						<br />
						<br />
						<p>Choose Branch:</p>
						<select id="CSMovieItemLoc" className="cs-select" onChange={this.onLocationChange}>
							{locationOptItems}
						</select>
						<br />
						<br />
						<p>Choose Schedule:</p>
						<select id="CSMovieItemSched" className="cs-select">
							{scheduleOptItems}
						</select>
						<br />
						<br />
						<p>Choose Number of Seats:</p>
						<select id="CSMovieItemSeats" className="cs-select">
							{seatOptItems}
						</select>
						<br />
						<br />
						<button id="CSMovieItemSubmit" className="pull-right" onClick={this.onCheckout}>checkout</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ChooseSchedule;
