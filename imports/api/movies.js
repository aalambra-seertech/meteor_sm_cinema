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
	
});

