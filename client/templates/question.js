Meteor.subscribe('questions');
Meteor.subscribe('games');

Template.answer.onRendered(function () {
	Meteor.defer(function () {
    const questionData = Random.choice(Questions.find().fetch());
	//console.log(questionData);

	try{
	$('#question-text').text(questionData.question);
	$('#author').text("Submitted by: " + questionData.author);
}
	catch(err){
	$('#question-text').text("Please load new question =(");
	}
	$('#author').text("Submitted by: " + "=(");
  });
	
});

Template.answer.events({
	'click .new-button': function(event){
		event.preventDefault();
		const questionData = Random.choice(Questions.find().fetch());
		$('#question-text').text(questionData.question);
		$('#author').text("Submitted by: " + questionData.author);
	},

	'click .back' : function(event){
		Router.go('/game:' + gameData._id);
	},

	'click .submit-button':function(event){
		event.preventDefault;



		let player = null;

		for(var i = 0; i < gameData.game.players.length; i++) {
    		if (gameData.game.players[i]._id === Meteor.userId()) {
       		 player = gameData.game.players[i];
        	break;
    	}
    }



		if(player.questionCounter !== 0){
		var answeredQuestion = {
			qText : $('#question-text').text(),
			author: "someone",
			correct: $('#correct').val(),
			incorrect1: $('#false1').val(),
			incorrect2: $('#false2').val(),
			incorrect3: $('#false3').val()
		}

		player.questionCounter--;
		
		gameData.game.questions.push(answeredQuestion);

		Games.update({'_id' : gameData._id},{$set:{players : gameData.game.players, questions : gameData.game.questions}});
		
		}
		else
			alert("You have already submitted all your questions for this game. Please wait for your friends to finish")
		
	}

});

