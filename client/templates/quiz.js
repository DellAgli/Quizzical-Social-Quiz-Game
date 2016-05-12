Template.quiz.onCreated(function(){
	console.log(gameData.game);
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

		for(i =0; i<selection.length; i++){
			let qid = selection[i].attributes.questionid.value;
			let answer =selection[i].attributes.value.value;
			let score = 0;
			Meteor.call('gradeQuestion', gameData._id, Meteor.userId(), qid, answer, function(e,r){
				console.log(r);
				if(r === true){
					score= score + 5;
					console.log(score);
					console.log('Good Job');
					//mark the answer as correct
				}
				else{
					console.log('You suck')
					//mark answer as false
					//mark correct answer
				}
			});
		}

		Meteor.call('finishQuiz', gameData._id, Meteor.userId(), score, function(e,r){

		});
	}

});