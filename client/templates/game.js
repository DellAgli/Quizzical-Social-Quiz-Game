Meteor.subscribe('games');

Template.game.helpers({
	'quizTime' : function(){
		return gameData.game.quizTime;
	},

	'id' : function(){
		return gameData._id;
	},

	'players' : function(){
		return gameData.game.players;
	},

	'isLeader' : function(){
		return gameData.game.players.indexOf(Meteor.user()._id).leader;
	}

});

Template.game.events({
	'click #startGame' : function(event){
		if(confirm("Once you start, nobody else can join")){
			Games.update({'_id' : gameData._id}, {$set: {surveyTime: true}});
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

		if(gameData.game.questionTime){
			Router.go('/quiz:' + gameData._id);
		}
		else{
			alert("Everyone needs to answer their questions before you can start");
		}
	
	}


});