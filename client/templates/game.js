Template.game.helpers({
	'quizTime' : function(){
		return gameData.game.quizTime;
	}

});

Template.game.events({
	'click #addQuestions': function(event){
		Router.go('/answer:'+ _id)
	},

	'click #doQuiz': function(event){
		Router.go('quiz:' + _id);
	}


});