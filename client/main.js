hideAnswers = function(game){
	for(i=0;i<game.questions.length;i++){
		game.questions[i].correct = null;
		game.questions[i].incorrect1 = null;
		game.questions[i].incorrect2 = null;
		game.questions[i].incorrect3 = null;

	}
	for(i=0; i<game.players.length;i++){
		game.players[i].answers = null;
	}
	return game;
};

getPlayer = function(game, playerID){
	let player = null;
	for(var i = 0; i < game.players.length; i++) {
  		if (game.players[i]._id === playerID) {
       		 player = game.players[i];
        	break;
    	}
    };

    return player;
}