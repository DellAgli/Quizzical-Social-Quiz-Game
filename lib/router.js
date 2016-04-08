Router.route('/', function () {
  this.render('home');
});

Router.route('/question', function () {
  this.render('questionPage');
});

Router.route('/submit', function () {
  this.render('submitQuestion');
});