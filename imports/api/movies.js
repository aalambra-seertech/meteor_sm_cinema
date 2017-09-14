import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Movies } from './collection_list.js';

Meteor.methods({
	'movies.getMovies'(){
		return Movies.find({}, {}).fetch();
		/*
		return movies.map(function(item){
			return {"value": item["_id"]["_str"], "label": item.name}
		});
		*/
	},
	'movies.getMovie'(id){
		let oid = new Meteor.Collection.ObjectID(id);
		return Movies.findOne({"_id": oid});
	}
});

