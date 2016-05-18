Meteor.subscribe('games');

Template.game.onCreated(function(){
	let player = getPlayer(gameData.game, Meteor.userId());

	if(player === null)
       	Router.go('/');

	gameData.game = hideAnswers(gameData.game);

	let boolean = true;

		for(i=0; i<gameData.game.players.length;i++){
			if(gameData.game.players[i].questionCounter != 0){
				boolean = false;
				break
			}
		}

		if(boolean){
			Meteor.call('startQuiz', gameData._id)
		}

});

Template.game.helpers({
	'inviteTime' : function(){
		return !gameData.game.quizTime && !gameData.game.surveyTime;
	},


	'players' : function(){
		return gameData.game.players;
	},

	'isLeader' : function(){
		let player = getPlayer(gameData.game, Meteor.userId());
		return player.leader;
	},

	startGameDisable: function(){
		if(gameData.game.quizTime || gameData.game.surveyTime)
			return "hidden"
	},
	answerQuestionDisable: function(){
		let player = getPlayer(gameData.game, Meteor.userId());
		if(!gameData.game.surveyTime || player.questionCounter === 0)
			return "disabled"
	},
	takeQuizDisable: function(){
		let player = getPlayer(gameData.game, Meteor.userId());
		if(!gameData.game.quizTime || player.finished){
			return 'disabled';
		}
	},
	joinLink: function(){
		return document.location.origin +"/join:" + gameData._id;
	},
	resultsLink: function(playerID){
		return '/results:' + gameData._id + '~' + playerID;
	},

	bothFinished: function(f1){
		if(!f1)
			return false
		else{
			let player = getPlayer(gameData.game, Meteor.userId());
    		return player.finished;
		}
	}
});

Template.game.events({
	'click #startGame' : function(event){
		if(confirm("Once you start, nobody else can join")){
			Meteor.call('startGame', gameData._id);
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
		let player = getPlayer(gameData.game, Meteor.userId());
    	
		if(!gameData.game.quizTime){
			alert("Everyone needs to answer their questions before you can start");
		}
		else if(player.finished){
			alert("You already completed the quiz!")
			Router.go('results:' + gameData._id + '~' + Meteor.userId());
		}
		else{
			Router.go('/quiz:' + gameData._id);
		}
	
	},



});