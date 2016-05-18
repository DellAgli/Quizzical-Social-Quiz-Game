Template.results.onCreated(function(){
	let player = null;
	for(var i = 0; i < gameData.game.players.length; i++) {
  		if (gameData.game.players[i]._id === Meteor.userId()) {
       		 player = gameData.game.players[i];
        	break;
    	}
    };
	//gameData.player = player;

	if(player === null)
       	Router.go('/');


	for(i=0;i<gameData.game.questions.length;i++){
		gameData.game.questions[i].correct = null;
		gameData.game.questions[i].incorrect1 = null;
		gameData.game.questions[i].incorrect2 = null;
		gameData.game.questions[i].incorrect3 = null;

	}
	for(i=0; i<gameData.game.players.length;i++){
		gameData.game.players[i].answers = null;
	}

	Meteor.call('getResults', gameData._ids[0], gameData._ids[1], function(e,r){
		Session.set('submissions', r);
	});
});

Template.results.helpers({
	submissions: function(){
		return Session.get('submissions');
	},
	player: function(){
		let playerID = gameData._ids[1];
		let player = null;
 		for(i=0;i<gameData.game.players.length;i++){
 			if(gameData.game.players[i]._id === playerID){
 				player = gameData.game.players[i];
 				break
 			}
 		}
 		if(player)
 		return player.nickName;
	},
})

Template.results.events({
	'click .go-back-button': function(event){
		Router.go('/game:'+gameData._ids[0]);
	}
})