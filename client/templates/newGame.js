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
 			answers : [],
 			leader : true,
 			finished : false
 		}

 		game.players.push(player);

 		Meteor.call('newGame', game, function(e,r){

			var string = "localhost:3000/join:" + r;

	 		console.log(game);

	 		console.log(string);

	 		Router.go('/game:' + r);
 		});

 		
	}
 	

 });