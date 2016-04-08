Template.newQuestion.events({
	'click .preview-button': function(event){
		event.preventDefault();
		const question = $('#question').val();

		$('#self-preview').text("In your opinion, " + question);
		$('#friend-preview').text("According to Anthony, " + question);
		},
	'click .submit-button':function(event){
		event.preventDefault();
		var question = {
			question: $('#question').val(),
			author: "someone"
		}

		Questions.insert(question);

		Router.go(`/`);
	}



})