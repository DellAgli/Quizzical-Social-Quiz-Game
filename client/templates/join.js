Template.join.onCreated(function(){
	gameData.game = hideAnswers(gameData.game);
	if(!(!gameData.game.quizTime && !gameData.game.surveyTime)){
		Router.go('/')
	}
});

Template.join.events({
	'click #begin' : function(event){
		Router.go("localhost:3000/game:" + gameData._id);
	},

	'click #join' : function(event){
		let player = getPlayer(gameData.game, Meteor.userId());

		if(player === null){
			let player = {
 			_id : Meteor.userId(),
 			nickName : Meteor.user().profile.name,
 			score : 0,
 			questionCounter : 5,
 			answers : [],
 			finished : false
 		}

 		Meteor.call('joinGame', gameData._id, player, Meteor.user(), function(e,r){
			Router.go("/game:" + gameData._id);
 		});
		}		
	}

	
});

Template.join.helpers({
	'gameName': function(){
		return gameData.game.gameName;
	},
});
