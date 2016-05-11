Meteor.subscribe('games');

Template.game.helpers({
	'inviteTime' : function(){
		return !gameData.game.quizTime && !gameData.game.surveyTime;
	},

	'id' : function(){
		return gameData._id;
	},

	'players' : function(){
		return gameData.game.players;
	},

	'isLeader' : function(){
		return gameData.game.players.indexOf(Meteor.user()._id).leader;
	},

	startGameDisable: function(){
		if(gameData.game.quizTime || gameData.game.surveyTime)
			return "disabled"
	},
	answerQuestionDisable: function(){
		if(!gameData.game.surveyTime)
			return "disabled"
	},
	takeQuizDisable: function(){
		let boolean = true;
		if(gameData.game.quizTime)
			boolean = false;
		else{
			let b2 = true //is everyone ready
			for(i = 0; i<gameData.game.players.length; i++){
				if(gameData.game.players[i].questionCounter != 0){
					b2 = false
					break
				}
			}
			if(b2){
				boolean = false;
			}
		}
		if(boolean)
			return "disabled"
	},
});

Template.game.events({
	'click #startGame' : function(event){
		if(confirm("Once you start, nobody else can join")){
			Meteor.call('startGame', gameData._id);
			console.log("DERP");
			}
			
	},

	'click #addQuestions': function(event){
		if(gameData.game.surveyTime){
		Router.go('/answer:'+ gameData._id)
		}
		else{
			alert("Have all your friends join before you answer questions");
		}
	},

	'click #doQuiz': function(event){
		let players = gameData.game.players;
		let boolean = true;

		for(i=0; i<players.length;i++){
			if(players[i].questionCounter != 0){
				boolean = false;
				break
			}
		}

		if(boolean){
			Meteor.call('startQuiz', gameData._id)
		}


		if(gameData.game.quizTime){
			Router.go('/quiz:' + gameData._id);
		}
		else{
			alert("Everyone needs to answer their questions before you can start");
		}
	
	}


});