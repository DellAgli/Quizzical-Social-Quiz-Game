

Router.configure({
	layoutTemplate: 'main',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'homePage'
	});
	this.route('newQuestion', {
		path:'/submit',
		template: 'newQuestion'
	});
	this.route('createGame', {
		path: '/new-game',
		template: 'newGame',
	});

	this.route('join', {
		path: '/join:_id',
		template: 'join',
		waitOn : function(){
			return Meteor.subscribe('games');
		},
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({'_id': this.params._id.slice(1)}),
			};
			return gameData;
		}
	});

	this.route('game', {
		path: '/game:_id',
		template: 'game',
		waitOn : function(){
			return Meteor.subscribe('games');
		},
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({_id: this.params._id.slice(1)}),
			};
			return gameData;
		}
	});

	this.route('quiz', {
		path: '/quiz:_id',
		template: 'quiz',
		waitOn : function(){
			return Meteor.subscribe('games');
		},
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({'_id': this.params._id.slice(1)}),
			};
			return gameData;
		}
	});

	this.route('answer', {
		path: '/answer:_id',
		template: 'answer',
		waitOn : function(){
			return [Meteor.subscribe('games'), Meteor.subscribe('questions')];
		},
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({_id: this.params._id.slice(1)}),
			};
			return gameData;
		}
	});
});

 	obscureGame = function(id){
 		let returnGame = Games.find({_id: id});
 		for(i = 0; i<game.questions.length; i++){

 		delete returnGame.questions[i].correct;
 		delete returnGame.questions[i].incorrect1;
 		delete returnGame.questions[i].incorrect2;
 		delete returnGame.questions[i].incorrect3;
	}
 		return returnGame;
 		console.log(returnGame);
 	}