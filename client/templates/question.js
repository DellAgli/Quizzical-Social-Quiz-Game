Meteor.subscribe('questions');
Meteor.subscribe('games');

Template.answer.onCreated(function(){
	let player = getPlayer(gameData.game, Meteor.userId());

	if(player === null)
       	Router.go('/');

	gameData.game = hideAnswers(gameData.game);
	//gameData.player = player;
    if(player === null)
       	Router.go('/');
    if(player.questionCounter === 0)
    	Router.go('/game:' + gameData._id);
});

Template.answer.onRendered(function () {
	Meteor.defer(function () {
    const questionData = Random.choice(Questions.find({approved: true}).fetch());

	try{
	$('#question-text').text(questionData.question);
	$('#author').text("Submitted by: " + questionData.author);
}
	catch(err){
	$('#question-text').text("Please load new question =(");
	}
	
  });
	
});

Template.answer.helpers({
	'questionsLeft': function(){
	let player = getPlayer(gameData.game, Meteor.userId());
    return player.questionCounter;
	}
})

Template.answer.events({
	'click .new-button': function(event){
		event.preventDefault();
		let questionData = Random.choice(Questions.find().fetch());
		$('#question-text').text(questionData.question);
		$('#author').text("Submitted by: " + questionData.author);
		$('#correct').val('');
		$('#false1').val(''); 
		$('#false2').val('');
		$('#false3').val('');
	},

	'click .back' : function(event){
		Router.go('/game:' + gameData._id);
	},

	'click .submit-button':function(event){
		event.preventDefault;
		let player = getPlayer(gameData.game, Meteor.userId());
		let answeredQuestion = {
			qText : $('#question-text').text(),
			author: player.nickName,
			authorId: Meteor.userId(),
			correct: $('#correct').val(),
			incorrect1: $('#false1').val(),
			incorrect2: $('#false2').val(),
			incorrect3: $('#false3').val(),
			questionID: Random.id()
		}

		Meteor.call('submitQuestion', gameData._id, Meteor.userId(), answeredQuestion, function(e,r){
			if(r == 0){
				alert("You have submitted all your questions. Come back once everyone has submitted their's");
				Router.go('/game:' + gameData._id);
			}
			else {
				let questionData = Random.choice(Questions.find().fetch());
				$('#question-text').text(questionData.question);
				$('#author').text("Submitted by: " + questionData.author);
				$('#correct').val('');
				$('#false1').val(''); 
				$('#false2').val('');
				$('#false3').val('');

			}
		})
		
		
	}

});

