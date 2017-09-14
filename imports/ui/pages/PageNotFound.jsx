import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
 
class PageNotFound extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<h3 className="page-not-found">This page does not exist.</h3>
		);
	}
}

export default PageNotFound;
