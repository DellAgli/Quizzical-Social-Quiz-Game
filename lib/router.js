Router.configure({
	layoutTemplate: 'main'
});

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
		waitOn: function () {
			Meteor.subscribe('games', this.params._id);
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
		waitOn: function () {
			Meteor.subscribe('games', this.params._id);
		},
		data: function() {
			gameData = {
				_id: this.params._id.slice(1),
				game: Games.findOne({_id: this.params._id.slice(1)}),
			};
			return gameData;
		}
	});


	this.route('answer', {
		path: '/answer:_id',
		template: 'answer',
		waitOn: function () {
			Meteor.subscribe('games', this.params._id);
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