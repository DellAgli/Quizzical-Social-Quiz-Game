

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
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({_id: this.params._id.slice(1)}),
			};
			return gameData;
		}
	});
});