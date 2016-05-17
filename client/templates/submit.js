Template.newQuestion.onCreated(function(){
	for(i=0;i<gameData.game.questions.length;i++){
		gameData.game.questions[i].correct = null;
		gameData.game.questions[i].incorrect1 = null;
		gameData.game.questions[i].incorrect2 = null;
		gameData.game.questions[i].incorrect3 = null;

	}
});

Template.newQuestion.events({
	'click .preview-button': function(event){
		event.preventDefault();
		const question = $('#question').val();

		
		$('#friend-preview').text("According to Anthony, " + question);
		},
	'click .submit-button':function(event){
		event.preventDefault();
		var question = {
			question: $('#question').val(),
			author:$('#author').val()
		}

		Meteor.call('addNewQuestion', question, function(e,r){
			Router.go(`/`);
		});

		
	}



})