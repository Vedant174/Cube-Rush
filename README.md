# p5.play-boilerplate
Boiler plate for p5.play

1. Playing character - controlled by player - cube.
2. Obstacles - static.
3. Goal - the player has to reach till the end and avoid the obstacles.
4. Rules - 
	- The player will keep moving forward and will jump to avoid obstacles.
	- The obstacles will be in triangular shape.
	- The player will have 4 lives.
	- Once the player dies he will respawn to latest checkpoint.
	- When the player die 4 times the game will be over.

5. Balance - The player will get an extra life after every checkpoint.
6. Adaptive - The speed of the player and the number of obstacles will increase.
7. Chance vs skill - The player will be able to take help of the boxes in air to cross the obstacle. 
8. Feedback - Player gets ranked dependng on how fast he completes the level.
	    - Player loses life when it touches the obstacle.




1. create sprite for player
2. control player by - velocity, press space to jump
3. create sprite and load, add images for obstacles
4. counter for lives - display on canvas
5. if condition to check player lives. - only 4 or less than or equal to 4
6. Starting lives will be 2 and at the checkpoint he can collect the life
7. if condition to increase the speed of the player after 3rd checkpoint
8. create sprites for the boxes and load and add images
9. ranking - time limit 
10. if condition to check player touching the obstacle
11. End state-
	a. player invisible
	b. game over text shuould be visible
	c. restart button
12. click on restart- 
	a. gameState will be Play
	b. playerLife will be 2 

