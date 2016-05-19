 Meteor.publish('questions', function(){
  	return Questions.find({});
});
 Meteor.publish('games', function(){
  	return Games.find({});
});