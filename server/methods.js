 Meteor.methods({
 	newGame : function(game, user){
 		let gameID = Games.insert(game);
 		let gamesList = user.profile.games;
 		gamesList.push(gameID);
 		Meteor.users.upsert({_id: user._id}, {$set: {profile: {games: gamesList}}});
 		return gameID;
 	},

 	startGame: function(gameID){
 		Games.update({_id : gameID}, {$set: {surveyTime: true}});
 	},

 	startQuiz: function(id){
 		Games.update({'_id' : id}, {$set: {quizTime: true}});
		Games.update({'_id' : id}, {$set: {surveyTime: false}});

 	},

 	gradeQuestions : function(gameID, userID, answers){
 		let game = Games.findOne({_id : gameID});
 		let score = 0;
 		let playerIndex = null;
 		for(i = 0; i<game.players.length; i++){
 			if(game.players[i]._id === userID){
 				playerIndex= i;
 				break
 			}
 		}

 		for(i = 0; i<answers.length; i++){
 			let questionID = answers[i].questionID;
 			let answer = answers[i].answer;
 			let question = null;
 			for(i = 0; i<game.questions.length; i++){
 			if(game.questions[i].questionID === questionID){
 				//console.log(game.questions[i]._id );
 				question = game.questions[i];
 				break
 			}
 		}
 		
 		game.players[playerIndex].answers.push({
 			questionID: questionID,
 			answer: answer
 			});
 		Games.update({_id: gameID}, {$set: {players: game.players}});

 		if(question.correct === answer){
 			score += 5;
 			
 		}
 		}
 		game.players[playerIndex].finished = true;
 		game.players[playerIndex].score = score;
 		Games.update({_id: gameID}, {$set: {players: game.players}});

 		return score;
 		

 	},


 	submitQuestion : function(gameID, playerID, question){
 		let game = Games.findOne({ '_id' : gameID});
 		let index = -1;
 		for(i = 0; i<game.players.length; i++){
 			if(game.players[i]._id === playerID){
 
 				index = i;
 				break
 			}
 		}
 		if(game.players[index].questionCounter > 0){
 			game.players[index].questionCounter--;
 			let r =[]
 			Games.update({_id : gameID }, {$set: {players: game.players}});
 			Games.update({_id : gameID }, {$push : {questions: question}});
 			return game.players[index].questionCounter;
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
 	},

 	addNewQuestion: function(question){
 		Questions.insert(question);
 	},

 	joinGame: function(gameID, newPlayer, user){
 		let gamesList = user.profile.games;
 		gamesList.push(gameID);
 		Meteor.users.upsert({_id: user._id}, {$set: {profile: {games: gamesList}}});
 		Games.upsert({_id: gameID}, {$push: {players: newPlayer}})
 	}

 });