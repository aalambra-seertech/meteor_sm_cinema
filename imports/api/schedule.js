import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Location = new Mongo.Collection('locations');
export const Schedule = new Mongo.Collection('schedule');

if (Meteor.isServer) {
	Meteor.publish('location', function locationPublication() {
		return Location.find({});
	});
}

Meteor.methods({
	'movies.getMovies'(){
		let movies = Movies.find({}, {}).fetch();
		return movies.map(function(item){
			return {"value": item["_id"]["_str"], "label": item.name}
		});
	}
});

