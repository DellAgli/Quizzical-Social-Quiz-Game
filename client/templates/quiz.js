Meteor.subscribe('games');

Template.quiz.helpers({

	questions : function(){
		console.log(gameData.game);
		var r = [];
		//var game = Games.findOne({'_id' : gameData._id});
		var questions = gameData.game.questions;
		for(i = 0; i<questions.length; i++){
			var answersOrdered = [];
			var nextQuestion={
				'questiontext' : questions[i].qText,
				'author' : questions[i].author,
				'answers' : []
			};
			answersOrdered.push({text:questions[i].correct});
			answersOrdered.push({text:questions[i].incorrect1});
			answersOrdered.push({text:questions[i].incorrect2});
			answersOrdered.push({text:questions[i].incorrect3});

			//var answersShuffled = [];
			//while (answersOrdered != []){
			//	var index = Math.floor(Math.random(answersOrdered.length));
			//	answersShuffled.push(answersOrdered[index]);
			//	answersOrdered.splice(index, 1);
			//}
			nextQuestion.answers = answersOrdered;
			r.push(nextQuestion);
		}
		console.log(r);
		return r;
	}


});