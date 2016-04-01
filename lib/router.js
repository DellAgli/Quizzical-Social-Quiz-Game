Router.route('/', function () {
  this.render('home');
});

Router.route('/question', function () {
  this.render('questionPage');
});