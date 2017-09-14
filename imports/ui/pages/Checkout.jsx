import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
 
class Checkout extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			summary: null,
		};
		this.onCheckoutClick = this.onCheckoutClick.bind(this);
	}

	startMeteorSubscriptions(){
		Meteor.subscribe('schedule');
	}

	onCheckoutClick(){

	}
	
	componentDidMount(){
		var me = this;
		
		Meteor.call('schedule.getSummary', this.props.match.params.schedule_id, this.props.match.params.seats, function(error, result){
			console.log('result '+JSON.stringify(result));
			me.setState({
				summary: result
			});
		});
	}

	render() {
		var summary = this.state.summary;
		
		return (
			<div className="page-container">
				<header>
				  	<h1>sm cinema</h1>
				</header>
				<br />
				<div className="row">
					<div className="col-sm-12 summary">
						<h4>summary:</h4>
						<p><span>Movie:</span>&nbsp;&nbsp;&nbsp;<span>{summary==null? '' : summary.movie}</span></p>
						<p><span>Cinema:</span>&nbsp;&nbsp;&nbsp;<span>{summary==null? '' : summary.cinema}</span></p>
						<p><span>Time:</span>&nbsp;&nbsp;&nbsp;<span>{summary==null? '' : summary.time}</span></p>
						<p><span>No. of Seat(s):</span>&nbsp;&nbsp;&nbsp;<span>{summary==null? '' : summary.seats}</span></p>
						<p><span>Total Price:</span>&nbsp;&nbsp;&nbsp;<span>{summary==null? '' : 'Php '+summary.total_price}</span></p>
						<button onClick={this.onCheckoutClick}>buy</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Checkout;
