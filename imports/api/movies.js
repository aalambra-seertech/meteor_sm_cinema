import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Movies = new Mongo.Collection('movies');

if (Meteor.isServer) {
	Meteor.publish('movies', function moviesPublication() {
		return Movies.find({});
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

