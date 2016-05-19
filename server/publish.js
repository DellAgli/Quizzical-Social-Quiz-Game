 Meteor.publish('questions', function(){
  	return Questions.find({});
});
 Meteor.publish('games', function(){
  	return Games.find({});
});

GOOGLE_URL_SHORTENER_API_KEY = "AIzaSyAEJi2rI2r_bGxaTgIdLCbalPXf3Ibz1qo";