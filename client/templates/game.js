Meteor.subscribe('games');

Template.game.onCreated(function(){
	let player = null;
	for(var i = 0; i < gameData.game.players.length; i++) {
  		if (gameData.game.players[i]._id === Meteor.userId()) {
       		 player = gameData.game.players[i];
        	break;
    	}
    };
	gameData.player = player;

	if(player === null)
       	Router.go('/');


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

	for(i=0;i<gameData.game.questions.length;i++){
		gameData.game.questions[i].correct = null;
		gameData.game.questions[i].incorrect1 = null;
		gameData.game.questions[i].incorrect2 = null;
		gameData.game.questions[i].incorrect3 = null;

	}
});

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
		if(!gameData.game.surveyTime || gameData.player.questionCounter === 0)
			return "disabled"
	},
	takeQuizDisable: function(){
		if(!gameData.game.quizTime || gameData.player.finished){
			return 'disabled';
		}
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
		if(!gameData.game.quizTime){
			alert("Everyone needs to answer their questions before you can start");		}
		else if(gameData.player.finished){
			alert("You already completed the quiz and scored " + gameData.player.score + " points.")
		}
		else{
			Router.go('/quiz:' + gameData._id);
		}
	
	}


});