Meteor.subscribe('games');

Template.quiz.helpers({

	questions : function(){
		var r = [];
		var game = gameData.game;
		console.log();
		var questions = game.questions;
		for(i = 0; i<questions.length; i++){
			

			var answersOrdered = [];
			var nextQuestion={
				'text' : questions[i].qtext,
				'author' : questions[i].author,
				'answers' : []
			};
			answersOrdered.push(questions[i].correct);
			answersOrdered.push(questions[i].incorrect1);
			answersOrdered.push(questions[i].incorrect2);
			answersOrdered.push(questions[i].incorrect3);

			var answersShuffled = [];
			while (answersOrdered != []){
				var index = Math.floor(Math.random(answersOrdered.length));
				answersShuffled.push(answersOrdered[index]);
				answersOrdered.splice(index, 1);
			}
			nextQuestion.push(answersShuffled);
			questions.push(nextQuestion);
		}
		return r;
	}


});