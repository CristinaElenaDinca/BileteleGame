
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
document.getElementById("teams").style.visibility = "visible";
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
document.getElementById("teams").innerHTML = "<p> The members of "+ firstTeam.name + " team are:<ul>"+ text + "</ul>" + "<p> Good luck, team!!!!</p>" + "<p> The members of "+ secondTeam.name + " team are:<ul>"+ text2 + "</ul>" + "<p> Good luck, team!!!!</p>";

//define input words
document.getElementById("addWord").onclick = function () {	
	count = count + 1;
	if (count < numberOfWords) {
		if(document.getElementById("addWords").value != "") {
			listOfWords.push(document.getElementById("addWords").value);
			document.getElementById("addWords").value = '';
		}
	} else {
		//opens new section to check for new player or next step
		if(document.getElementById("addWords").value != "") {
			listOfWords.push(document.getElementById("addWords").value);
			document.getElementById("addWords").value = '';
		}
		document.getElementById("checkingPlayer").style.visibility = "visible";
		document.getElementById("addingWords").style.visibility = "hidden";
		countPlayers = countPlayers +1;
		if (countPlayers == numberOfPlayers) {
			document.getElementById("yes").style.opacity = "0.6";
			document.getElementById("yes").style.cursor = "not-allowed";
			document.getElementById("yes").disabled = true;
			document.getElementById("no").style.opacity = "1";
			document.getElementById("no").style.cursor = "auto";
			document.getElementById("no").disabled = false;		
		}
	}
} 

 //if new player is to add word
 document.getElementById("yes").onclick = function () {
 	count = 0;
 	document.getElementById("addingWords").style.visibility = "visible";
 	document.getElementById("checkingPlayer").style.visibility = "hidden";
 	document.getElementById("addWords").value = '';
 }

//if no other player is to be add
document.getElementById("no").onclick = function() {
	document.getElementById("playerSection").style.visibility = "visible";
	document.getElementById("checkingPlayer").style.visibility = "hidden";
	//Alert the beggining of the first round and general rules for it.
	alert("We are about to start the round no. " + rounds + " In this round, you are allowed to speak about the word but without saying it. May the game begin!")
	document.getElementById("contestant").innerHTML = firstTeam.players[0];
}

//define timer function
function startTimer() {
	document.getElementById("timer").innerHTML = t;
	t = t-1;
	if (t == -2) {
		clearInterval(value);
		checking = false;
		alert ("Time is up! Next Player!");
		document.getElementById("timer").innerHTML = 0;
		document.getElementById("next").style.opacity = "0.6";
		document.getElementById("next").style.cursor = "not-allowed";
		document.getElementById("next").disabled = true;
		document.getElementById("word").innerHTML = "";
	};
}

//define stop timer function
function stopTimer () {
	clearInterval(value);
	t = 20;
	document.getElementById("timer").innerHTML = t;
}

//function to be called on enter press
function enterKey() {
	if(event.keyCode == 13){ 
		if (checking == true) {
			//does the same thing as pressing the "next" button
			wordsToWord.push(document.getElementById("word").innerHTML);
			if (teamTurn == 1) {
				switch (rounds) {
					case 1:
					firstTeam.firstRound.push(document.getElementById("word").innerHTML);
					break;
					case 2: 
					firstTeam.secondRound.push(document.getElementById("word").innerHTML);
					break;
					case 3:
					firstTeam.lastRound.push(document.getElementById("word").innerHTML);
					break;	
				}
			}else {
				switch (rounds) {
					case 1:
					secondTeam.firstRound.push(document.getElementById("word").innerHTML);
					break;
					case 2: 
					secondTeam.secondRound.push(document.getElementById("word").innerHTML);
					break;
					case 3:
					secondTeam.lastRound.push(document.getElementById("word").innerHTML);
					break;	
				}				
			}
			listOfWords.shift();
			if (listOfWords[0] != undefined) {
				document.getElementById("word").innerHTML = listOfWords[0];
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
						document.getElementById("teams").style.visibility = "hidden";
						document.getElementById("playerSection").style.visibility = "hidden"
						document.getElementById("result").style.visibility = "visible";
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
document.getElementById("start").onclick = function (){
	//change boolean variable
	checking = true;
	//Able and anable buttons
	document.getElementById("next").style.opacity = "1";
	document.getElementById("next").style.cursor = "auto";
	document.getElementById("next").disabled = false;
	document.getElementById("failed").style.opacity = "1";
	document.getElementById("failed").style.cursor = "auto";
	document.getElementById("failed").disabled = false;
	document.getElementById("start").style.opacity = "0.6";
	document.getElementById("start").style.cursor = "not-allowed";
	document.getElementById("start").disabled = true;
	//starting the countdown
	value = setInterval (startTimer,1000);
	//make appeare a random word after clicking the "start" button
	suffle(listOfWords);
	document.getElementById("word").innerHTML = listOfWords[0];
	
}

//actions to be taken if the button FAILED (NEXT PLAYER) is clicked
document.getElementById("failed").onclick = function(){
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
		document.getElementById("contestant").innerHTML = firstTeam.players[firstTeam.i];
	}else {
		document.getElementById("contestant").innerHTML = secondTeam.players[secondTeam.j];
	}
	//change the boolean variable
	checking = false;
	//stop the countdown
	stopTimer();
	//clear the "word" section
	document.getElementById("word").innerHTML = "";
 	//Able and anable buttons
 	document.getElementById("next").style.opacity = "0.6";
 	document.getElementById("next").style.cursor = "not-allowed";
 	document.getElementById("next").disabled = true;
 	document.getElementById("failed").style.opacity = "0.6";
 	document.getElementById("failed").style.cursor = "not-allowed";
 	document.getElementById("failed").disabled = true;
 	document.getElementById("start").style.opacity = "1";
 	document.getElementById("start").style.cursor = "auto";
 	document.getElementById("start").disabled = false;
 }

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
	document.getElementById("word").innerHTML = "";
 	//Able and anable buttons
 	document.getElementById("next").style.opacity = "0.6";
 	document.getElementById("next").style.cursor = "not-allowed";
 	document.getElementById("next").disabled = true;
 	document.getElementById("failed").style.opacity = "0.6";
 	document.getElementById("failed").style.cursor = "not-allowed";
 	document.getElementById("failed").disabled = true;
 	document.getElementById("start").style.opacity = "1";
 	document.getElementById("start").style.cursor = "auto";
 	document.getElementById("start").disabled = false;
 }


//define a function to write the result section
function finale() {
 	document.getElementById("teams").style.visibility = "hidden";
 	document.getElementById("playerSection").style.visibility = "hidden"
 	document.getElementById("result").style.visibility = "visible";
 	var firstTeamTotal = firstTeam.firstRound.length + firstTeam.secondRound.length + firstTeam.lastRound.length;
 	var secondTeamTotal = secondTeam.firstRound.length + secondTeam.secondRound.length + secondTeam.lastRound.length;
 	if (firstTeamTotal > secondTeamTotal) {
 		document.getElementById("displayWinner").innerHTML = firstTeam.name;
 		document.getElementById("displayTotalScore").innerHTML = firstTeamTotal;
 		document.getElementById("firstRoundWinner").innerHTML = firstTeam.firstRound.length;
 		document.getElementById("secondRoundWinner").innerHTML = firstTeam.secondRound.length;
 		document.getElementById("lastRoundWinner").innerHTML = firstTeam.lastRound.length;
 		document.getElementById("displaySecond").innerHTML = secondTeam.name;
 		document.getElementById("displayTotalScoreSecond").innerHTML = secondTeamTotal;
 		document.getElementById("firstRoundSecond").innerHTML = secondTeam.firstRound.length;
 		document.getElementById("secondRoundSecond").innerHTML = secondTeam.secondRound.length;
 		document.getElementById("lastRoundSecond").innerHTML = secondTeam.lastRound.length;						
 	}else {
 		document.getElementById("displayWinner").innerHTML = secondTeam.name;
 		document.getElementById("displayTotalScore").innerHTML = secondTeamTotal;
 		document.getElementById("firstRoundWinner").innerHTML = secondTeam.firstRound.length;
 		document.getElementById("secondRoundWinner").innerHTML = secondTeam.secondRound.length;
 		document.getElementById("lastRoundWinner").innerHTML = secondTeam.lastRound.length;
 		document.getElementById("displaySecond").innerHTML = firstTeam.name;
 		document.getElementById("displayTotalScoreSecond").innerHTML = firstTeamTotal;
 		document.getElementById("firstRoundSecond").innerHTML = firstTeam.firstRound.length;
 		document.getElementById("secondRoundSecond").innerHTML = firstTeam.secondRound.length;
 		document.getElementById("lastRoundSecond").innerHTML = firstTeam.lastRound.length;			
 	};
 }

//actions to be taken on the "next" button: 
document.getElementById("next").onclick = function(){
	if (t != -1){
		//2. adding the previous word to the array ment to mime,
		wordsToWord.push(document.getElementById("word").innerHTML);
		//adding the word to the team string
		if (teamTurn == 1) {
			switch (rounds) {
				case 1:
				firstTeam.firstRound.push(document.getElementById("word").innerHTML);
				break;
				case 2: 
				firstTeam.secondRound.push(document.getElementById("word").innerHTML);
				break;
				case 3:
				firstTeam.lastRound.push(document.getElementById("word").innerHTML);
				break;	
			};
		}else {
			switch (rounds) {
				case 1:
				secondTeam.firstRound.push(document.getElementById("word").innerHTML);
				break;
				case 2: 
				secondTeam.secondRound.push(document.getElementById("word").innerHTML);
				break;
				case 3:
				secondTeam.lastRound.push(document.getElementById("word").innerHTML);
				break;	
			};				
		};
		//3. shortening the initial array by one
		listOfWords.shift();
		if (listOfWords[0] != undefined) {
			//changing the word to be guessed,
			document.getElementById("word").innerHTML = listOfWords[0];
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
		document.getElementById("next").style.opacity = "0.6";
		document.getElementById("next").style.cursor = "not-allowed";
		document.getElementById("next").disabled = true;
	};
};