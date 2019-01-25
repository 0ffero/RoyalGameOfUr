function rollDice() {
	// Dice Roll
	// Dice will roll between 5 and 10 times each
	$(".dice").removeClass("clickable");
	$(".dice").css("opacity", 1);
	diceArray = new Array(4);
	//diceTotal = 0;
	maximum   = 10; minimum = 5;
	points    = 0;
	
	for (diceNum=0; diceNum<4; diceNum++) {
		randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		//console.log("roll Count = " + randomNumber);
		for (i=1; i<=randomNumber; i++) {
			// Dice are 4 sided, 2 of the points are painted white, positions 1 and 2 are counted as a "dot", positions 3 and 4 are counted as "no dot"
			diceRoll = Math.floor((Math.random() * 4)) + 1;
		}
		if (diceRoll==1 || diceRoll==2) {
			// show a dice with a white dot (counts as a 1)
			diceArray[diceNum] = 1;
			points ++;
		} else {
			// show a dice without the white dot (counts as a 0)
			diceArray[diceNum] = 0;
		}
	}
	
	// fade the dice out
	diceNameArray = ["diceOne", "diceTwo", "diceThree", "diceFour"]
	$(".diceOne, .diceTwo, .diceThree, .diceFour").fadeOut(500, function() {
		//alert("hi");
	})
	
	j = 0;
	fader = setInterval( function() {
		if (j<5) {
			for (d=0; d<4; d++) {
				diceRollImageOffset = Math.floor((Math.random() * 4));
				$("." + diceNameArray[d]).css({ "background-position" : "-" + diceRollImageOffset * 150 + "px" });
				$("." + diceNameArray[d]).fadeToggle(150)
			}
			console.log("random image");
			j++;
		}
		
		if (j==5) {
			for (dn=0; dn<4; dn++) {
				if (diceArray[dn]==0) {
					$("." + diceNameArray[dn]).css("background-position", "-300px");
					$("." + diceNameArray[dn]).data("state","0");
					console.log("No Dice! 0 Points");
				} else {
					$("." + diceNameArray[dn]).css("background-position", "0px");
					$("." + diceNameArray[dn]).data("state","1");
					console.log("Dice! 1 Point");
				}
				$("." + diceNameArray[dn]).fadeIn(1000);
			}
			clearInterval(fader);
			getPossibleMoves(points);
			console.log("Cleared!");
		}
		
	}, 200);
	
}








function getPossibleMoves(points) {
	moveList = "";
	$(".diceheader").html("You threw a " + points);
	currentPlayer = $("#variables").data("currentplayer");

	$(".dice").each( function() {
		diceState = $("#" + this.id).data("state");
		if (diceState==0) { $("#" + this.id).fadeTo(1000, 0.4); }
	});
	
	if (points>0) {
		console.log(points + " moves. Getting possible moves");
		if (currentPlayer == 1) {
			$("#playerA").css("background-color", "white");
			$("#playerB").css("background-color", "black");
			counterSetName = "counterA"; opponentName="B";
			listOfPositions = ["HMA","SA1","SA2","SA3","SA4","AT1","AT2","AT3","AT4","AT5","AT6","AT7","AT8","HA1","HA2","FNA"];
		} else {
			$("#playerB").css("background-color", "white");
			$("#playerA").css("background-color", "black");
			counterSetName = "counterB"; opponentName="A";
			listOfPositions = ["HMB","SB1","SB2","SB3","SB4","AT1","AT2","AT3","AT4","AT5","AT6","AT7","AT8","HB1","HB2","FNB"];
		}	
		
		for (i=1; i<=7; i++) { // FOR EACH COUNTER
			counterName = "#" + counterSetName + i;
			// GET CURRENT POSITION LIST
			currentPosition = $(counterName).data("currentposition"); // THIS IS THE POSITION NAME : NOT POSITION NUMBER
			if (currentPosition != "FNA" && currentPosition != "FNB") {				
				for (currentPosID = 0; currentPosID <= listOfPositions.length; currentPosID++) {
					if (listOfPositions[currentPosID]==currentPosition) {
						currentPositionID = currentPosID;
					}
				}
				movepostemp = currentPositionID + points;
				if (movepostemp<=listOfPositions.length) {
					movePosition = listOfPositions[movepostemp];
					
					if (moveList.includes(currentPosition)==false) { // CHECK IF CURRENT POSITION IS ALREADY IN OUR MOVELIST STRING

						// CHECK IF MOVEPOS IS VALID
						taken = $("." + movePosition).data("taken");
						if (taken==0) {
							$(counterName).data("moveposition", movePosition);
							$(counterName).addClass("clickable");
							moveList += i.toString() + currentPosition;
						} else if (taken==opponentName && movePosition != "AT4") { // ATTACK SQUARE 4 (AT4) CAN NEVER BE TAKEN!
							// SPACE IS CURRENTLY TAKEN BY OPPONENT IE THIS WILL BE A TAKE MOVE
							$(counterName).data({ "moveposition": movePosition, "taking": "1" });
							$(counterName).addClass("clickable");
							moveList += i.toString() + currentPosition;
						}
						
					} else {
						// CHECK MOVE LIST FOR DUPE MOVE AND ASSIGN IT TO CURRENT COUNTER
						strpos = moveList.indexOf(currentPosition)-1;
						dupeOfCounterNum = moveList.substr(strpos,1);
						dupeMovePos = $("#" + counterSetName + dupeOfCounterNum).data("moveposition");
						dupeMoveTaking = $("#" + counterSetName + dupeOfCounterNum).data("taking");
						// console.log("This is a dupe of counter " + counterSetName + dupeOfCounterNum + ". Setting moveposition to " + dupeMovePos + " and taking to " + dupeMoveTaking);
						$(counterName).data("moveposition", dupeMovePos); $(counterName).data("taking", dupeMoveTaking);
						$(counterName).addClass("clickable");
					}
				}
			}
		}
		
		$("." + counterSetName).each( function() {
			if ($("#" + this.id).data("moveposition")==0) {
				if ($("#" + this.id).data("currentposition") != "FNA" && $("#" + this.id).data("currentposition") != "FNB") {
					$("#" + this.id).fadeTo(1000, 0.7);
				}
			}
		});
		
		if (moveList.length != 0) {
			console.log("List of differing start positions " + moveList);
			if (points == 1) { plural = ""; } else { plural="s"; }
			popup("You threw a " + points, "Click one of your counters to move it<br/>" + points + " space" + plural, 0);
			setTimeout( function() {
				
			}, 2000);
		} else {
			console.log("No available moves. Moving on to next player");
			popup("No Available Moves", "You threw a " + points + ". You have no available moves though.<br/>Moving on to other player.", 1);
			$(".counterA, .counterB").css("opacity", 1);
			setTimeout( function() {
				nextPlayersShot(currentPlayer);
			}, 2000);
		}
	}  else {
		console.log("Player threw a 0. Switch to next player");
		popup("You threw a 0", "Moving on to other player.", 1);
		console.log("------------- END OF TURN -------------");
		setTimeout(function() {
			// FIND NEXT PLAYER
			nextPlayersShot(currentPlayer);
		}, 2000);
		
	}
}





function nextPlayersShot(currentPlayer) { // THIS FUNCTION IS RUN WHEN THE PLAYER HAS MOVED THEIR PIECE OR THEYVE ROLLED A 0
	if (currentPlayer==1) { 
		newPlayer = 2;
		classname="playerB";
		classreset="playerA";
	} else { 
		newPlayer = 1;
		classname="playerA";
		classreset="playerB"; 
	}
	$(".diceheader").html("Player " + newPlayer + " throw the dice");
	$("." + classreset).css("background-color", "black"); $("." + classname).css("background-color", "white");
	$("#variables").data({ "currentplayer": newPlayer, hasdicebeenrolled: 0 });
	popup("Player " + newPlayer.toString(), "Please throw the dice", 0);
	$(".dice").addClass("clickable"); // MAKE THE DICE CLICKABLE AGAIN
}


function highlightCounter(position) {
	$("#container").append('<div class="highlighter" style="height: 104px; width: 104px;  position: absolute; left: ' + position.x + '; top: ' + position.y + '"></div>');
}

function popup(title,message,error) {	
	$("#popup").css({ "display": "none", "opacity": 1 });
	showpopup(title, message, error);
}

function showpopup(title, message, type, timeout=1000) {
	console.log("Showing popup");
	// type 0: normal   type 1: error  type 2: winner (originally being passed as error because there were only 2 types of pop-up. now expanded to infinity
	if (type==1) { color = "red"; } else { color = "white"; }
	$(".title").html(title);
	$(".message").html(message);
	$("#popup").css({ "color": color, "box-shadow": "0px 0px 40px " + color });
	$("#popup").fadeIn(500, function() { // FADE IT IN
		setTimeout( function() {
			console.log("Hiding popup");
			if (type == 2) { fadeouttimer = 30000; } else { fadeouttimer = 500; }
			$("#popup").fadeOut(fadeouttimer);
		}, timeout );
	});
}



function findPath(player, goingfrom, movingto) {
	posA = 0; posASet = false;
	posB = 0; posBSet = false;
	pathList = "";
	
	while (posASet == false && posBSet == false) {
		if (player == 1) {
			listOfPositions = ["HMA","SA1","SA2","SA3","SA4","AT1","AT2","AT3","AT4","AT5","AT6","AT7","AT8","HA1","HA2","FNA"];
		} else {
			listOfPositions = ["HMB","SB1","SB2","SB3","SB4","AT1","AT2","AT3","AT4","AT5","AT6","AT7","AT8","HB1","HB2","FNB"];
		}
		for (i=0; i<listOfPositions.length; i++) {
			// THE NEXT PIECE OF CODE HAS BEEN BUILT LINEARLY (DIFFICULT FOR ME TO TRACE BUT MUCH EASIER ON THE CPU).
			// ACTUAL WAY THIS CODE RUNS IS 
			// 1) POSA IS SET  2) ANY CORNER POSITION BEFORE POSY IS SET AS A DESTINATION 3) POSY IS SET
			if (listOfPositions[i] == movingto ) { posB = i; posBSet = true; }
			if (posASet == true && posBSet == false) {
				if (listOfPositions[i] == "SA4" || listOfPositions[i] == "SB4" || listOfPositions[i] == "AT1" || listOfPositions[i] == "AT8" || listOfPositions[i] == "HA1" || listOfPositions[i] == "HB1") {
					// THIS IS A CORNER (ROTATE 90°), PUT SIMPLE TELL THE COUNTER IT HAS TO MOVE HERE FIRST BEFORE CONTINUING
					pathList += listOfPositions[i] + ",";
				}				
			}
			if (listOfPositions[i] == goingfrom) { posA = i; posASet = true; }
		}
	}
	
	// ADD END POSITION TO THE PATH
	pathList += movingto;
	return pathList;
	
}




function scale(divName) { // UNUSED ATM
	curwidth  		= $("#" + divName).css("width" ).replace("px", "");
	curheight 		= $("#" + divName).css("height").replace("px", "");
	curleft   		= $("#" + divName).css("left"  ).replace("px", "");
	curtop    		= $("#" + divName).css("top"   ).replace("px", "");
	xyOffset  = (curwidth * 1.2) - curwidth;
	
	// , background-size: (curwith*1.2) (curheight*1.2) 
	// , background-size: curwith curheight
	
	$("#" + divName).animate({ width: (curwidth*1.2), height: (curheight*1.2), left: (curleft-xyOffset), top: (curtop-xyOffset)}, 500).animate({ width: curwidth, height: curheight, left: curleft, top: curtop }, 500);
}