Template.game.helpers({
	'quizTime' : function(){
		return gameData.game.quizTime;
	},

	'id' : function(){
		return gameData._id;
	}

});

Template.game.events({
	'click #addQuestions': function(event){
		Router.go('/answer:'+ gameData._id)
	},

	'click #doQuiz': function(event){
		Router.go('/quiz:' + gameData._id);
	}


});