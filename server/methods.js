
Meteor.methods({
 	newGame : function(game, user, domain){
 		let gameID = Games.insert(game);
 		let profile = user.profile;
 		profile.games.push(gameID);
 		Meteor.users.upsert({_id: user._id}, {$set: {profile: profile}});

 		let UrlLong = domain + "/join:" + gameID
 		let apiKey = GOOGLE_URL_SHORTENER_API_KEY
 		res = HTTP.call('POST', "https://www.googleapis.com/urlshortener/v1/url?key=" + apiKey, {
 			content:"application/json",
 			data: {'longUrl': UrlLong},
 			timeout: 3000
 		})

 		Games.upsert({_id: gameID}, {$set: {shortURL: res.data.id}})


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
 			score++;
 			
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
			if(questions[i].authorId != playerID){
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
		}
	}
		return r;
 	},

 	addNewQuestion: function(question){
 		Questions.insert(question);
 	},

 	joinGame: function(gameID, newPlayer, user){
 		let profile = user.profile;
 		profile.games.push(gameID);
 		Meteor.users.upsert({_id: user._id}, {$set: {profile: profile}});
 		Games.update({_id: gameID}, {$push: {players: newPlayer}})
 	},
 	getGames: function(userID){
 		let user = Meteor.users.findOne({_id: userID});
 		if(user){
 		let ids = user.profile.games;
 		let r = [];
 		for(i=0;i<ids.length;i++){
 			r.push(Games.findOne({_id: ids[i]}))
 		}
 		return r
 	}
 },
 	getResults: function(gameID, playerID){
 		let game = Games.findOne({_id: gameID});
 		let player = null;
 		for(i=0;i<game.players.length;i++){
 			if(game.players[i]._id === playerID){
 				player = game.players[i];
 				break
 			}
 		}
 		if(player){
 			let r = [];
 			for(i=0; i<player.answers.length;i++){
 				let question = null;
 				for(j=0;j<game.questions.length;j++){
 					if(game.questions[j].questionID === player.answers[i].questionID){
 						question = game.questions[j];
 						break
 					}
 				}
 				r.push({
 					questionText : question.qText,
 					author: question.author,
 					correctAnswer: question.correct,
 					submittedAnswer: player.answers[i].answer
 				})
 			}
 			return r;
 		}
 	},

 });