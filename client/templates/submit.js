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