 Template.newGame.events({
 	'click #newGame' : function(event){
 		var game = {
 			players : [],
 			questions : [],
 			surveyTime : false,
 			quizTime : false
 		}

 		var player = {
 			_id : Meteor.userId(),
 			nickName : $('#nickname').val(),
 			score : 0,
 			questionCounter : 5,
 			leader : true
 		}

 		game.players.push(player);

 		var gameId = Games.insert(game);

 		var string = "localhost:3000/join:" + gameId;

 		console.log(game);

 		//console.log(string);

 		Router.go('/game:' + gameId);
	}
 	

 });