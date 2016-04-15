 Template.newGame.events({
 	'click #newGame' : function(event){
 		var game = {
 			players : [],
 			questions : [],
 			questionCounter : [],
 			scoreTally : []
 		}

 		game.players.push(Meteor.userId());
 		game.scoreTally.push(0);
 		game.questionCounter.push(5);
 		console.log(game);

 		var id = Games.insert(game);

 		var string = "localhost:3000/join:" + id;

 		console.log(string);
 	}

 });