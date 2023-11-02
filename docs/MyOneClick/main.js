title = "Time it!";

description = `Avoid the \npurple walls

`;

characters = [
  `
  bbbb
 bBBBBb
 bBBBBb
 bBBBBb
 bBBBBb
  bbbb
 `,
];

options = {
  viewSize: { x: 100, y: 100 },
  theme: "shapeDark",
};

let ballX;
let ballY;
let ballVelX = 0;
let ballVelY = 0;
let gravity = 0;
let barAngle;
let barAngleVel;
let BarSpeed;
// Walls
let Wall_left;
let Wall_right;
let Wall_top;
let Wall_bottom;
//WallColors
let wallColors;
let colorLast = 5 * 60;
let WallChoice;
let colorChanged = false;
let currentWall = 0;
let colorChangeTimer = 3 * 60; // Start with 5 seconds (60 frames per second)
let timeToChangeColor = colorChangeTimer; // Initialize the time

const centerPos = vec(50, 50);

function update() {
  if (!ticks) {
    ballX = 50;
    ballY = 50;
    barAngle = PI / 2;
    BarSpeed = 10;
    barAngleVel = 2;
    wallColors = ["purple", "purple", "purple", "purple"];
    
  }
  
  timeToChangeColor--;
  // Change wall color randomly after 5 seconds
  if (timeToChangeColor === 0) {
    // Reset the previous wall color
    wallColors[currentWall] = "purple";
  
    // Select a random wall to change its color
    currentWall = rndi(0, 4);
    wallColors[currentWall] = "green";
  
    timeToChangeColor = colorChangeTimer; // Reset the timer
    colorChanged = true;
  }
  // Reset wall color after 1 second
  if (colorChanged && ticks % colorLast ==0) {
    wallColors[currentWall] = "purple";
    colorChanged = false;
  }

  color(wallColors[0]);
  Wall_left = rect(0, 0, 7, 150);
  color(wallColors[1]);
  Wall_top = rect(0, 0, 100, 7);
  color(wallColors[2]);
  Wall_right = rect(93, 0, 7, 150);
  color(wallColors[3]);
  Wall_bottom = rect(0, 93, 100, 7);

  color("black");
  rect(10, 119, 80, 1);

  // Update the ball's position
  ballX += ballVelX;
  ballY += ballVelY;

  // Apply gravity to the ball's velocity
  ballVelY += gravity;

  // Check for collisions with the red wall (currentWall)
  if (currentWall === 0 && ballX < 7) {
    increaseScore();
  } else if (currentWall === 1 && ballY < 7) {
    increaseScore();
  } else if (currentWall === 2 && ballX > 93) {
    increaseScore();
  } else if (currentWall === 3 && ballY > 93) {
    increaseScore();
  }
  if (currentWall !== 0 && ballX < 7) {
    end();
  } else if (currentWall !== 1 && ballY < 7) {
    end();
  } else if (currentWall !== 2 && ballX > 93) {
    end();
  } else if (currentWall !== 3 && ballY > 93) {
    end();
  }

  // Left wall collision
  if (ballX < 7) {
    resetBallPosition();
  }

  // Right wall collision
  if (ballX > 93) {
    resetBallPosition();
  }

  // Top wall collision
  if (ballY < 7) {
    resetBallPosition();
  }

  // Bottom wall collision
  if (ballY > 93) {
    resetBallPosition();
  }

  if (input.isJustPressed) {
    const shootSpeed = 2;
    ballVelX = Math.cos(barAngle) * shootSpeed;
    ballVelY = Math.sin(barAngle) * shootSpeed;
  }

  box(ballX, ballY, 5, 5);

  barAngle += barAngleVel * 0.03 * 1;

  bar(50, 50, BarSpeed * 20, 1, barAngle, 0);
}

function increaseScore() {
  // Increase the score when the ball collides with the red wall
  score++;
}


function resetBallPosition() {
  ballX = 50;
  ballVelX = 0;
  ballY = 50;
  ballVelY = 0;
}