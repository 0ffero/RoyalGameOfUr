So, heres my implementation of The Royal Game of Ur.

More info can be found on the wiki: but heres a quick overview of the rules

There are 2 players. Each player gets to throw 4, 4 sided dice.

Each player has 7 counters which have to travel the board until it exists the board (on the right hand side).
There are 3 lanes, 2 of which interact with each other.

[1][1][1][1]   E[1][1]  <-- Player 1s entry lane
<- <- <- <- 1   <- <-

-> -> -> -> -> -> -> ->
[A][A][A][A][A][A][A][A]  <-- Attack Lane
-> -> -> -> -> -> -> ->

[2][2][2][2]    E[2][2]  <-- Player 2s entry and exit lane
<- <- <- <- 2    <- <-

Player one enters the board at the top of the screen, player 2 enters the board at the opposite side (shown above as [E]).
The path of the Player starts on their safe zones, the counters on these first 4 tiles cannot be taken by the other player.
If you throw a 3 for example you can move to the 3rd position. If you throw a 2 from this point you could either move the
first counter another 2 spaces (and move in to the attack lane) or select another counter which will then sit on the 2nd
entry space.
They then move up the attack lane. At this point players can take other player counters, which are sent back to their start 
position when "taken".

Special Squares: The sqaure that looks like the red and black pettles are free shot squares i.e. you get to roll the dice
again. Also, the pettle in the attack lane cannot be taken, so if someones one it, you cannot take that square.

Only one counter is allowed on each sqaure.

You CAN throw a 0.
