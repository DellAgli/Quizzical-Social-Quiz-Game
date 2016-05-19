

 Template.newGame.events({
 	'click #newGame' : function(event){
 		var game = {
 			players : [],
 			questions : [],
 			surveyTime : false,
 			quizTime : false,
 			gameName: $('#name').val(),
 			shortURL : null
 		}

 		var player = {
 			_id : Meteor.userId(),
 			nickName : Meteor.user().profile.name,
 			score : 0,
 			questionCounter : 5,
 			answers : [],
 			leader : true,
 			finished : false
 		}

 		game.players.push(player);
		Meteor.call('newGame', game, Meteor.user(), document.location.origin, function(e,r){
	 			Router.go('/game:' + r);
 		});


 		
	}
 	

 });