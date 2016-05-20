Template.quiz.onCreated(function(){
	let player = getPlayer(gameData.game, Meteor.userId());
	gameData.game = hideAnswers(gameData.game);

	if(player === null)
       	Router.go('/');

    if(player.finished)
    	Router.go('/game:' + gameData._id);
    

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
		//console.log(attempts);
		Meteor.call('gradeQuestions', gameData._id, Meteor.userId(), attempts, function(e,r){
			alert("You scored " + r + " points. Check back after everyone has finsished for detailed results.");
			Router.go("/results:"+gameData._id+'~'+Meteor.userId());
		});
	}

});