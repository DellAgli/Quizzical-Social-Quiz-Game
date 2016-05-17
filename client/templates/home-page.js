Template.homePage.onCreated(function(){
	Meteor.call('getGames', Meteor.userId(), function(e,r){
		Session.set('currentGames', r);
	});
})


Template.homePage.helpers({
	'currentGames': function(){
		if(Meteor.user()){
			return Session.get('currentGames');
		}
	},
	gamelink : function(id){
		return"/game:"+id;
	}
});