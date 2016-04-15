 Template.newGame.events({
 	'click #newGame' : function(event){
 		var game = {
 			players : [],
 			questions : [],
 		}

 		var player = {
 			_id : Meteor.userId(),
 			score : 0,
 			questionCounter : 5
 		}

 		game.players.push(player);

 		var gameId = Games.insert(game);

 		var string = "localhost:3000/join:" + gameId;

 		console.log(string);

 		$('#link').text(string);
	}
 	

 });