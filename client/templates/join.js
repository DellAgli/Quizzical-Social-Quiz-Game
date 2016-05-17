Template.join.onCreated(function(){
	for(i=0;i<gameData.game.questions.length;i++){
		gameData.game.questions[i].correct = null;
		gameData.game.questions[i].incorrect1 = null;
		gameData.game.questions[i].incorrect2 = null;
		gameData.game.questions[i].incorrect3 = null;

	}
});

Template.join.events({
	'click #begin' : function(event){
		Router.go("localhost:3000/game:" + gameData._id);
	},

	'click #join' : function(event){
		var gameTarget = Games.findOne({'_id' : gameData._id});

		var newPlayer = true;
		for(var i = 0; i < gameTarget.players.length; i++) {
    		if (gameTarget.players[i] === Meteor.user()) {
       		 newPlayer = false;
        	break;
    	}
	}

		if(newPlayer){
			var player = {
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
	}
});
