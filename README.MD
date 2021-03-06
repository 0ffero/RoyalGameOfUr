So, heres my implementation of The Royal Game of Ur.

<b>Reason</b>: I saw the game on youtube and thought "I bet I can make that in javascript"... so I did.

<b>Dev and implementation</b>: Originally built for Firefox, but the animation system isnt as smooth "looking" as it is in
Chrome. So, although it will work in firefox its meant to be played in Chrome. This'll probably never be fixed as I only
planned for me to play it, and Ill always just play it in Chrome :)

<b>Outcome</b>: Index.html and indexsound.html. No external images or sounds (as I base64 encoded them all). Uses Jquery.

More info can be found on the wiki (https://en.wikipedia.org/wiki/Royal_Game_of_Ur): but heres a quick overview of the rules

<b>Rules</b>:
There are 2 players. Each player gets to throw 4, 4 sided dice.

Each player has 7 counters which have to travel the board until it exits the board (on the right hand side).
There are 3 lanes, of which players interact with each other in the middle lane (the attack lane).

<pre>
[1][1][1][1]S    E[1][1]  <-- Player 1s entry and exit lane
<- <- <- <- 1      <- <-

-> -> -> -> -> -> -> ->
[A][A][A][A][A][A][A][A]  <-- Attack Lane
-> -> -> -> -> -> -> ->

[2][2][2][2]S    E[2][2]  <-- Player 2s entry and exit lane
<- <- <- <- 2     <- <-
</pre>

Player one enters the board at the top of the screen (shown as "S"), player 2 enters the board at the opposite side "S".

Players exit the board at "E".

The path of the Player starts in their safe zones, the counters on these first 4 tiles cannot be taken by the other player.

If you throw a 3 for example you can move to the 3rd starting lane position. If you throw a 2 from this position you could
either move the first counter another 2 spaces (and move into the attack lane) or select a new counter which will then move
to the 2nd starting lane space.

They then move up the attack lane. At this point players can take other player's counters, which are sent back to their start 
position when "taken".

If a counter reaches the exit lane on the right it cannot be taken and is theoretically safe. Side note: "theoretically": although
it cannot be taken, you will have to throw a specific number to move the counter off the board i.e if the player is on the 1st of
the 2 exit quares they MUST throw either a 1 to move it to the last sqaure, or a 2 to allow it to exit the board. If neither of
these are thrown then player loses their shot until they can move. This also happens at other points in the game. Make sure you
always have enough space to move or you'll lose your turn ;)

Special Squares: The sqaure that looks like the red and black petals are free shot squares i.e. you get to roll the dice again after
you move to it.
Also, counters on the petal in the attack lane cannot be taken, so if someone is on it, you cannot take that position.

Only one counter is allowed on each sqaure.

You CAN throw a 0.

Feel free to use the source code at will (and modify at your own risk).
