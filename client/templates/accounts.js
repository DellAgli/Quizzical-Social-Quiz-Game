 Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        Accounts.createUser({
            email: event.target.registerEmail.value,
            password: event.target.registerPassword.value,
            profile: {
            	name : event.target.registerName.value,
            	games: []
            }
        }, 
        function(e){
        	if(e){
        		$('.reg-error').text(e.reason);
        	}
        	else{
        		$('.modal-backdrop').hide();
        	}
        });
    }
});


 Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        Meteor.loginWithPassword(
        	event.target.loginEmail.value,
        	event.target.loginPassword.value,
        	function(e){
        	if(e){
        		$('.log-error').text(e.reason);
        	}
        	else{
        		$('.modal-backdrop').hide();
        	}
        	});
    }
});

Template.accountsSystem.events({
	'click .log-out': function(){
		Meteor.logout();
        Router.go('/');
	}
});