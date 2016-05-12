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
			console.log("derp");
    		if (gameData.game.players[i]._id === Meteor.userId()) {
       		 player = gameData.game.players[i];
        	break;
    	}
    }



	
		var answeredQuestion = {
			qText : $('#question-text').text(),
			author: player.nickName,
			authorId: Meteor.userId(),
			correct: $('#correct').val(),
			incorrect1: $('#false1').val(),
			incorrect2: $('#false2').val(),
			incorrect3: $('#false3').val(),
			questionID: Random.id()
		}
		//console.log(answeredQuestion);

		Meteor.call('submitQuestion', gameData._id, Meteor.userId(), answeredQuestion, function(e,r){
			console.log(r);
		})
		
		
	}

});

