Template.question.onRendered(function () {
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

Template.question.events({
	'click .new-button': function(event){
		event.preventDefault();

		const questionData = Random.choice(Questions.find().fetch());
		$('#question-text').text(questionData.question);
		$('#author').text("Submitted by: " + questionData.author);
	},	
	'click .submit-button':function(event){
		event.preventDefault;

		var answeredQuestion = {
			author: "someone",
			correct: $('#correct').val(),
			incorrect1: $('#false1').val(),
			incorrect2: $('#false2').val(),
			incorrect3: $('#false3').val()
		}

		console.log(answeredQuestion);
		
	}

});