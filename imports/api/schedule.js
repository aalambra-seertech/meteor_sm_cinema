import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Location, Cinema, Schedule, Movies} from './collection_list.js';

Meteor.methods({
	'schedule.getSchedLocations'(id){
		
		let scheds = Schedule.find({'movie_id': id}, {fields: {'loc':true}}).fetch();
		let loc_ids = [...new Set(scheds.map((item) => item.loc))];
		let locations = Location.find({'_id': {$in: loc_ids }}).fetch();
		return locations.map(function(item){
			return {
				"value": item["_id"],
				"label": item["name"]
			};
		});
	},
	'schedule.getSchedule'(id, loc){
		
		let cinemas = Cinema.find({'location_id': loc}).fetch();
		let cinema_map = {};
		cinemas.forEach(function(item){
			cinema_map[item["_id"]] = item.name;
		});
		let scheds = Schedule.find({'movie_id': id, 'loc': loc}).fetch();
		return scheds.map(function(item){
			let label = cinema_map[item.cinema] + ' - ' + moment.utc(item.time).format('MMM d, YYYY h:mm a');
			return {
				"value": item["_id"]["_str"],
				"loc": loc,
				"label": label
			}
		});

	},
	'schedule.getSummary'(schedule_id, seat){
		let oid = new Meteor.Collection.ObjectID(schedule_id);
		let sched = Schedule.findOne({"_id": oid});
		let cinema = Cinema.findOne({'_id': sched.cinema});
		let location = Location.findOne({'_id': cinema.location_id});
		let movie_oid = new Meteor.Collection.ObjectID(sched.movie_id);
		let movie = Movies.findOne(movie_oid);
		let total = (Number(seat)*250).toFixed(2);
		return {
			'id': schedule_id,
			'movie': movie.name,
			'cinema': location.name + ', ' + cinema.name,
			'time': moment.utc(sched.time).format('MMM d, YYYY h:mm a'),
			'seats': seat,
			'total_price': total
		}
	}
});

