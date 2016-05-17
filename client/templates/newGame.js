Template.newGame.onCreated(function(){
	for(i=0;i<gameData.game.questions.length;i++){
		gameData.game.questions[i].correct = null;
		gameData.game.questions[i].incorrect1 = null;
		gameData.game.questions[i].incorrect2 = null;
		gameData.game.questions[i].incorrect3 = null;

	}
});

 Template.newGame.events({
 	'click #newGame' : function(event){
 		var game = {
 			players : [],
 			questions : [],
 			surveyTime : false,
 			quizTime : false,
 			gameName: $('#name').val()
 		}

 		var player = {
 			_id : Meteor.userId(),
 			nickName : Meteor.user().profile.name,
 			score : 0,
 			questionCounter : 5,
 			answers : [],
 			leader : true,
 			finished : false
 		}

 		game.players.push(player);

 		Meteor.call('newGame', game, Meteor.user(), function(e,r){
 			let gamesList = Meteor.user().profile.games;
 			gamesList.push(r);
 			Meteor.users.upsert({_id: Meteor.userId()}, {$set: {profile: {games: gamesList}}});

	 		Router.go('/game:' + r);
 		});

 		
	}
 	

 });