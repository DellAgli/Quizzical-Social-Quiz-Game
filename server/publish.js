 Meteor.publish('questions', function(limit){
  	return Questionss.find({});
});
 Meteor.publish('games', function(limit){
  	return Games.find({'_id' : limit});
});