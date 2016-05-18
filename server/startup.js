Meteor.startup(() => {
	if(Questions.find().count() == 0){
	Questions.insert({
			question: "What is their favorite movie?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite videogame?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite season?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite animal?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite book?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "If they could live in one place for the rest of their life, where would it be?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What relgion do they follow?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "Where were they born?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "Who is their favorite superhero?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "Who did they vote for in 2012?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "Which of these is a relationship deal-breaker?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite drink?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their biggest regret?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their greatest achievment?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their college major?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "When is their birthday?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "When did they graduate?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their favorite holiday?",
			author: "Anthony Dell'Agli"
		});
	Questions.insert({
			question: "What is their mother's maiden name?",
			author: "Anthony Dell'Agli"
		});
}
})
