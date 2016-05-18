Template.results.onCreated(function(){
	let player = getPlayer(gameData.game, Meteor.userId());

	if(player === null)
       	Router.go('/');

	gameData.game = hideAnswers(gameData.game);

	Meteor.call('getResults', gameData._ids[0], gameData._ids[1], function(e,r){
		Session.set('submissions', r);
	});
});

Template.results.helpers({
	submissions: function(){
		return Session.get('submissions');
	},
	player: function(){
		let player = getPlayer(gameData.game, gameData._ids[1]);
 		if(player)
 		return player.nickName;
	},
	score: function(){
		let player = getPlayer(gameData.game, gameData._ids[1]);
 		if(player)
 		return player.nickName;
	}

})

Template.results.events({
	'click .go-back-button': function(event){
		Router.go('/game:'+gameData._ids[0]);
	}
})