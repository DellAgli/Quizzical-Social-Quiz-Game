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

 	gradeQuestion : function(gameID, questionID, answer){
 		let game = Games.find({_id : gameID});
 		let question = null;
 		for(i = 0; i<game.questions.length; i++){
 			if(game.questions[i]._id === questionID){
 				question = game.question[i];
 				break
 			}
 		}
 		if(question.correct === answer){
 			return true;
 		}
 		else{
 			return false;
 		}

 	},

 	submitQuestion : function(gameID, playerID, question){
 		let game = Games.findOne({ '_id' : gameID});
 		let index = -1
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

 	}

 });