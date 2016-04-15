Template.join.events({
	'click #begin' : function(event){
		Router.go("localhost:3000/game:" + gameData._id);
	}
});

Template.join.onRendered(function() {
	console.log(gameData);

	if(gameData.game == null)
		gameData.game = Games.findOne({'_id' : gameData._id});

	var game = gameData.game;

	var newPlayer = true;
		for(var i = 0; i < game.players.length; i++) {
    		if (game.players[i] === Meteor.userId()) {
       		 newPlayer = false;
        	break;
    	}
	}
	if(newPlayer){
	game.players.push(Meteor.userId());
	game.scoreTally.push(0);
	game.questionCounter.push(5);
	}
	console.log(game);
});