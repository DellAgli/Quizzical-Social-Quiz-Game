Template.quiz.onCreated(function(){
	let player = null;
	for(var i = 0; i < gameData.game.players.length; i++) {
  		if (gameData.game.players[i]._id === Meteor.userId()) {
       		 player = gameData.game.players[i];
        	break;
    	}
    };
	gameData.player = player;
    if(player === null)
       	Router.go('/');
    if(player.finished)
    	Router.go('/game:' + gameData._id);
    

	console.log(gameData);
	Meteor.call('getQuiz', gameData._id, Meteor.userId(), function(e,r){
		Session.set('questions', r);
	});
});


Template.quiz.helpers({

	questions : function(){
		return Session.get('questions');
	},



});

Template.quiz.events({

	'click .submit' : function (event){
		event.preventDefault();
		let selection = $('input[name="answer"]:checked');
		let attempts =[];
		for(i =0; i<selection.length; i++){
			let qid = selection[i].attributes.questionid.value;
			let answer =selection[i].attributes.value.value;
			attempts.push({
				questionID : qid,
				answer : answer
			});
		}
		Meteor.call('gradeQuestions', gameData._id, Meteor.userId(), attempts, function(e,r){
			alert("You scored " + r + " points. Check back after everyone has finsished for detailed results.");
			Router.go("/game:"+gameData._id);
		});
	}

});