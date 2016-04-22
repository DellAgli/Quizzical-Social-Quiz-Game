Meteor.subscribe('games');

Template.quiz.helpers({

	questions : function(){
		console.log(gameData.game);
		var r = [];
		//var game = Games.findOne({'_id' : gameData._id});
		var questions = gameData.game.questions;
		for(i = 0; i<questions.length; i++){
			var answers = [];
			var nextQuestion={
				'questiontext' : questions[i].qText,
				'author' : questions[i].author,
				'answers' : []
			}

			answers.push({text:questions[i].correct});
			answers.push({text:questions[i].incorrect1});
			answers.push({text:questions[i].incorrect2});
			answers.push({text:questions[i].incorrect3});

			
			
			var index = answers.length;
			var temp;
			var random;
			while(0 !== index){
				random = Math.floor(Math.random()*index);
				index--;

				temp = answers[index];
				answers[index] = answers[random];
				answers[random] = temp;
			}

			nextQuestion.answers = answers;
			r.push(nextQuestion);
		}
		console.log(r);
		return r;
	}


});

Template.quiz.events({

	'click .submit' : function (){
		console.log("Submit");
	}

});