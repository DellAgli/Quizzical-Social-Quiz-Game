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
 			nickName : $('#nickname').val,
 			score : 0,
 			questionCounter : 5
 		}

 		gameTarget.players.push(player)
		}
		console.log(gameTarget);

		Router.go("/game:" + gameData._id);
	}

	
});
