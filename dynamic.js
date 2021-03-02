
var t = 20;
var value;
var listOfPlayers =[];
var listOfWords = new Array();
var wordsToWord = new Array();
var count = 0;
var countPlayers =0; 
var checking;
var rounds = 1;
//defining the 2 teams
var firstTeam = {
	name:"Bobocei", 
	players:[], 
	firstRound:[],
	secondRound:[], 
	lastRound:[],
	i:0
}
var secondTeam = {
	name:"Iepurasi", 
	players:[], 
	firstRound:[], 
	secondRound:[], 
	lastRound:[],
	j:0
}

//adding the players and the wods. For a realistyc game we shall need at least 4 players
var numberOfPlayers = parseInt(prompt("How many players will join?", 10));
while (isNaN(numberOfPlayers) || (numberOfPlayers < 4)){
	numberOfPlayers = parseInt(prompt(" You must have at least 4 players!", 10));
};

var numberOfWords = parseInt(prompt("How many words per player?", 10));
while (isNaN(numberOfWords) || (numberOfWords < 1)){
	numberOfWords = parseInt(prompt(" You must give at least one word per player!", 10));
};

//this will help to switch between teams in turns
var teamTurn = 1;

//Creating the teams 
for (var i = 0; i <numberOfPlayers; i++) {
	//listOfPlayers.push(prompt("whos is playing?", ""));
	var aux = prompt("Who is playing?", "");
	while ((aux == null) || (aux == "")){
		aux = prompt ("Who is playing", "");
	}
	listOfPlayers.push(aux);
}

//define suffle function for array
function suffle(myArray) {
	for (var i =myArray.length - 1; i >= 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[myArray[i], myArray[j]] = [myArray[j], myArray[i]];
	}
}

//setting the teams
while(!window.confirm("Ready to find out your teams?")){
	alert("Get ready!")
};
suffle(listOfPlayers);

//adding members to firstTeam
for (var i = 0; i < Math.floor(listOfPlayers.length / 2); i++) {
	firstTeam.players.push(listOfPlayers[i]);
};

// adding members to the second Team
for (var i = Math.floor(listOfPlayers.length / 2); i <listOfPlayers.length; i++) {
	secondTeam.players.push(listOfPlayers[i]);
};

//Display the teams members
$("#teams").css("display", "block");
//building the <ul> for the first Team
var text = "";
for (var i = 0; i < firstTeam.players.length; i++) {
	text = text + " <li>"+ firstTeam.players[i] + "</li>";
};
//building the <ul> for the second Team
var text2 = "";
for (var i = 0; i < secondTeam.players.length; i++) {
	text2 = text2 + " <li>"+ secondTeam.players[i] + "</li>";
};
//display the teams
$("#teams").html("<p> The members of "+ firstTeam.name + " team are:<ul>"+ text + "</ul>" + "<p> Good luck, team!!!!</p>" + "<p> The members of "+ secondTeam.name + " team are:<ul>"+ text2 + "</ul>" + "<p> Good luck, team!!!!</p>");
$("#addingWords").css("display", "block");


//The user will be able to add words by clicking on the button or by pressing enter key

//adding the function to adding word on next button
$("#addWords").keydown(function(){
	if(event.keyCode == 13){
		count = count + 1;
		if (count < numberOfWords) {
			if($("#addWords").val() != "") {
				listOfWords.push($("#addWords").val());
				$("#addWords").val("");
			}
		} else {
		//opens new section to check for new player or next step
			if($("#addWords").val() != "") {
				listOfWords.push($("#addWords").val());
				$("#addWords").val("");
				
			}
			
			$("#checkingPlayer").css("display", "block");
			$("#addingWords").css("display", "none");
			countPlayers = countPlayers +1;
			if (countPlayers == numberOfPlayers) {
				$("#yes").css("opacity", "0.6");
				$("#yes").css("cursor", "not-allowed");
				$("#yes").prop("disabled", true);
				$("#no").css("opacity", "1");
				$("#no").css("cursor", "auto");
				$("#no").prop("disabled", false);	
			}	
			}
	
}})

//define an on enter function for adding words.
 //if new player is to add word
 $("#yes").click(function () {
 	count = 0;
 	$("#addingWords").css("display", "block");
 	$("#checkingPlayer").css("display", "none");
 	$("#addWords").val("");
 	
 })

//if no other player is to be add
$("#no").click(function() {
	$("#playerSection").css("display", "block");
	$("#checkingPlayer").css("display", "none");
	$("#teams").css("display", "none");
	
	//Alert the beggining of the first round and general rules for it.
	alert("We are about to start the round no. 1. In this round, you are allowed to speak about the word but without saying it. May the game begin!")
	$("#contestant").html(firstTeam.players[0]);
})

//define timer function
function startTimer() {
	$("#timer").html(t);
	t = t-1;
	if (t == -2) {
		clearInterval(value);
		checking = false;
		alert ("Time is up! Next Player!");
		$("#timer").html(0);
		$("#next").css("opacity","0.6");
		$("#next").css("cursor", "not-allowed");
		$("#next").prop("disabled", true);
		$("#word").html("");
	};
}

//define stop timer function
function stopTimer () {
	clearInterval(value);
	t = 20;
	$("#timer").html(t);
}

//function to be called on enter press
function enterKey() {
	if(event.keyCode == 13){ 
		if (checking == true) {
			//does the same thing as pressing the "next" button
			wordsToWord.push($("#word").html());
			if (teamTurn == 1) {
				switch (rounds) {
					case 1:
					firstTeam.firstRound.push($("#word").html());
					break;
					case 2: 
					firstTeam.secondRound.push($("#word").html());
					break;
					case 3:
					firstTeam.lastRound.push($("#word").html());
					break;	
				}
			}else {
				switch (rounds) {
					case 1:
					secondTeam.firstRound.push($("#word").html());
					break;
					case 2: 
					secondTeam.secondRound.push($("#word").html());
					break;
					case 3:
					secondTeam.lastRound.push($("#word").html());
					break;	
				}				
			}
			listOfWords.shift();
			if (listOfWords[0] != undefined) {
				$("#word").html(listOfWords[0]);
			} else{
				rounds = rounds +1;
				switch (rounds) {
					case 2: 
					alert("You have finished the words!!NEXT ROUND IS UP!! In round no." + rounds + " you are allowed to say JUST ONE word to lead your team to guess (surly not the word they are supposed to guess!)");
					nextRound();
					window.removeEventListener("keypress", enterKey);
					break;
					case 3:
					alert("You have finished the words!!NEXT ROUND IS UP!! In round no." + rounds + " you are allowed only to mime the word! Last one! Give your best, team!!!");
					nextRound();
					window.removeEventListener("keypress", enterKey);
					break;
					default:
						//that means we have reached the end of the game. Hide all the sections and display the result
						$("#teams").css("display", "none");
						$("#playerSection").css("display", "none");
						$("result").css("display", "block");
						window.removeEventListener("keypress", enterKey);
						finale();
						stopTimer();

					};
				}
		//REMOVE EVENT LISTENER if the player has failed and is expecting a new player 
	} else {
		window.removeEventListener("keypress", enterKey);
	}
		//REMOV EVENT LISTENER	if the time is up
	}else {
		window.removeEventListener("keypress", enterKey);
	}
}

//calling the enterKey function	
window.addEventListener('keydown', enterKey);	

//actions to be taken when clicking on START button
$("#start").click(function (){
	//change boolean variable
	checking = true;
	//Able and anable buttons
	$("#next").css("opacity", "1");
	$("#next").css("cursor","auto");
	$("#next").prop("disabled", false);
	$("#failed").css("opacity", "1");
	$("#failed").css("cursor", "auto");
	$("#failed").prop("disabled", false);
	$("#start").css("opacity", "0.6");
	$("#start").css("cursor", "not-allowed");
	$("#start").prop("disabled", true);
	//starting the countdown
	value = setInterval (startTimer,1000);
	//make appeare a random word after clicking the "start" button
	suffle(listOfWords);
	$("#word").html(listOfWords[0]);
	
})

//actions to be taken if the button FAILED (NEXT PLAYER) is clicked
$("#failed").click(function(){
	//changing the team and the team member that is about to play
	if (teamTurn == 2){
		teamTurn = 1;
		if (secondTeam.j < (secondTeam.players.length -1)) {
			secondTeam.j = secondTeam.j+1;
		}else { 
			secondTeam.j = 0;
		}
	}else {
		teamTurn = 2;
		if (firstTeam.i < (firstTeam.players.length -1)) {
			firstTeam.i = firstTeam.i+1;
		}else { 
			firstTeam.i = 0;
		}		
	};
	//display the player on the pecific section
	if (teamTurn == 1) {
		$("#contestant").html(firstTeam.players[firstTeam.i]);
	}else {
		$("#contestant").html(secondTeam.players[secondTeam.j]);
	}
	//change the boolean variable
	checking = false;
	//stop the countdown
	stopTimer();
	//clear the "word" section
	$("#word").html("");
 	//Able and anable buttons
 	$("#next").css("opacity", "0.6");
 	$("#next").css("cursor", "not-allowed");
 	$("#next").prop("disabled", true);
 	$("#failed").css("opacity", "0.6");
 	$("#failed").css("cursor", "not-allowed");
 	$("#failed").prop("disabled", true);
 	$("#start").css("opacity", "1");
 	$("#start").css("cursor", "auto");
 	$("#start").prop("disabled", false);
 })

//define function to get to next round
function nextRound() {
	var size = wordsToWord.length;
	for (var i = 0; i <= size - 1; i++) {
		listOfWords[i] = wordsToWord.shift();
	}
	//stop the countdown
	stopTimer();
	//stop the event listener on enter
	checking = false;
	//clear the "word" section
	$("#word").html("");
 	//Able and anable buttons
 	$("#next").css("opacity", "0.6");
 	$("#next").css("cursor", "not-allowed");
 	$("#next").prop("disabled", true);
 	$("#failed").css("opacity", "0.6");
 	$("#failed").css("cursor", "not-allowed");
 	$("#failed").prop("disabled", true);
 	$("#start").css("opacity", "1");
 	$("#start").css("cursor", "auto");
 	$("#start").prop("disabled", false);
 }


//define a function to write the result section
function finale() {
 	$("#teams").css("display", "block");
 	$("#playerSection").css("display", "none");
 	$("#result").css("display", "block");
 	var firstTeamTotal = firstTeam.firstRound.length + firstTeam.secondRound.length + firstTeam.lastRound.length;
 	var secondTeamTotal = secondTeam.firstRound.length + secondTeam.secondRound.length + secondTeam.lastRound.length;
 	if (firstTeamTotal > secondTeamTotal) {
 		$("#displayWinner").html(firstTeam.name);
 		$("#displayTotalScore").html(firstTeamTotal);
 		$("#firstRoundWinner").html(firstTeam.firstRound.length);
 		$("#secondRoundWinner").html(firstTeam.secondRound.length);
 		$("#lastRoundWinner").html(firstTeam.lastRound.length);
 		$("#displaySecond").html(secondTeam.name);
 		$("#displayTotalScoreSecond").html(secondTeamTotal);
 		$("#firstRoundSecond").html(secondTeam.firstRound.length);
 		$("#secondRoundSecond").html(secondTeam.secondRound.length);
 		$("#lastRoundSecond").html(secondTeam.lastRound.length);						
 	}else {
 		$("#displayWinner").html(secondTeam.name);
 		$("#displayTotalScore").html(secondTeamTotal);
 		$("#firstRoundWinner").html(secondTeam.firstRound.length);
 		$("#secondRoundWinner").html(secondTeam.secondRound.length);
 		$("#lastRoundWinner").html(secondTeam.lastRound.length);
 		$("#displaySecond").html(firstTeam.name);
 		$("#displayTotalScoreSecond").html(firstTeamTotal);
 		$("#firstRoundSecond").html(firstTeam.firstRound.length);
 		$("#secondRoundSecond").html(firstTeam.secondRound.length);
 		$("#lastRoundSecond").html(firstTeam.lastRound.length);			
 	};
 }

//actions to be taken on the "next" button: 
$("#next").click(function(){
	if (t != -1){
		//2. adding the previous word to the array ment to mime,
		wordsToWord.push($("#word").html());
		//adding the word to the team string
		if (teamTurn == 1) {
			switch (rounds) {
				case 1:
				firstTeam.firstRound.push($("#word").html());
				break;
				case 2: 
				firstTeam.secondRound.push($("#word").html());
				break;
				case 3:
				firstTeam.lastRound.push($("#word").html());
				break;	
			};
		}else {
			switch (rounds) {
				case 1:
				secondTeam.firstRound.push($("#word").html());
				break;
				case 2: 
				secondTeam.secondRound.push($("#word").html());
				break;
				case 3:
				secondTeam.lastRound.push($("#word").html());
				break;	
			};				
		};
		//3. shortening the initial array by one
		listOfWords.shift();
		if (listOfWords[0] != undefined) {
			//changing the word to be guessed,
			$("#word").html(listOfWords[0]);
		} else{
			//if all the words have being guessed, the next round is announced
			rounds = rounds +1;
			switch (rounds) {
				case 2: 
				alert("You have finished the words!!NEXT ROUND IS UP!! In round no." + rounds + " you are allowed to say JUST ONE word to lead your team to guess (surly not the word they are supposed to guess!)");
				nextRound();
				break;
				case 3:
				alert("You have finished the words!!NEXT ROUND IS UP!! In round no." + rounds + " you are allowed only to mime the word! Last one! Give your best, team!!!");
				nextRound();
				break;
				default:
					//that means we have reached the end of the game. Hide all the sections and display the result
					finale();
					stopTimer();					
				break;	
				}
			}	
		} else {
		//if the time is up, the next player is announced and the NEXT button has gets disabled
		alert ("Time is up! Next Player!");
		$("#next").css("opacity", "0.6");
		$("#next").css("cursor", "not-allowed");
		$("#next").prop("disabled", true);
	};
});