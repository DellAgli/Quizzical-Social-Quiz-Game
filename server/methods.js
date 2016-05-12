 Meteor.methods({
 	newGame : function(game){
 		let gameId = Games.insert(game);
 		console.log(gameId);
 		return gameId;
 	},

 	startGame: function(gameID){
 		//console.log(gameID)
 		Games.update({_id : gameID}, {$set: {surveyTime: true}});
 		//console.log(Games.findOne({_id : gameID}));
 		//console.log(Games.findOne({}));
 	},

 	startQuiz: function(id){
 		Games.update({'_id' : id}, {$set: {quizTime: true}});
		Games.update({'_id' : id}, {$set: {surveyTime: false}});

 	},

 	gradeQuestion : function(gameID, userID, questionID, answer){
 		let game = Games.findOne({_id : gameID});
 		console.log(game);
 		let question = null;
 		for(i = 0; i<game.questions.length; i++){
 			if(game.questions[i]._id === questionID){
 				question = game.questions[i];
 				break
 			}
 		}

 		if(question.correct === answer){
 			return true;
 			
 		}
 		else{
 			return question.correct;
 		}

 	},

 	finishQuiz : function(gameID, userID, score){
 		let game = Games.findOne({ '_id' : gameID});
 		let player = null;
 		for(i = 0; i<game.players.length; i++){
 			if(game.players[i]._id === userID){
 				player= game.players[i];
 				break
 			}
 		}
 		player.score = score;
 		//console.log(score);
 		player.finishQuiz = true;
 		Games.update({_id: gameID}, {$push: {players: player}});
 	},

 	submitQuestion : function(gameID, playerID, question){
 		let game = Games.findOne({ '_id' : gameID});
 		let index = -1;
 		console.log(game);
 		for(i = 0; i<game.players.length; i++){
 			if(game.players[i]._id === playerID){
 
 				index = i;
 				break
 			}
 		}
 		if(game.players[index].questionCounter > 0){
 			game.players[index].questionCounter--;
 			console.log(game);
 			let r =[]
 			r[0]= Games.update({_id : gameID }, {$set: {players: game.players}});
 			r[1]= Games.update({_id : gameID }, {$push : {questions: question}});
 			return r
 	}

 	},

 	getQuiz : function(gameID, playerID){
 		let game = Games.findOne({_id: gameID})
 		let r = [];
		var questions = game.questions;
		for(i = 0; i<questions.length; i++){
			//if(questions[i].authorID === playerID){
			var answers = [];
			var nextQuestion={
				'questiontext' : questions[i].qText,
				'author' : questions[i].author,
				'answers' : [],
				'questionID' : questions[i]._id
			}

			answers.push({text:questions[i].correct, questionID :questions[i].questionID});
			answers.push({text:questions[i].incorrect1, questionID :questions[i].questionID});
			answers.push({text:questions[i].incorrect2, questionID :questions[i].questionID});
			answers.push({text:questions[i].incorrect3, questionID :questions[i].questionID});

			
			
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
		//}
	}
		//console.log(r);
		return r;
 	}

 });