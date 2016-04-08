Template.question.onCreated(function () {
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
		//console.log("DERP");
		const questionData = Random.choice(Questions.find().fetch());
		$('#question-text').text(questionData.question);
		$('#author').text("Submitted by: " + questionData.author);
	},	
	'click .submit-button':function(event){
		event.preventDefault();
		
	}

});