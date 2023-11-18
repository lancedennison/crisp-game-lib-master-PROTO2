title = "GRAVITY SLAM";

description = `
[Press] Jump
`;

characters = [
`
  b
  b
  b
bBBBb
 bbb
  b 
`

];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 90
};

let p, v;
let floors;
let speed;
let delay;
let jumpWay = 1;
let upVel;
let downVel;
let floorAppDist;
let scr;

/** @type {{pos: Vector, width: number, side: number}[]} */
let walls;

let counter = 0;

let spawnrate = 60;

function update() {
  const scr = difficulty * 0.4;
  if (!ticks) {
    p = vec(80, 95);
    v = vec();
    speed = 3.5; //How fast the player changes gravity
    walls = [];
  }

  //generates a wall based on the spawnrate
  if(ticks % spawnrate == 0){
    walls.push({ pos: vec(-5, 0), width: rnd(6, difficulty * 10), side: counter % 2})
    counter ++;
    //adds to score by 1 everytime a wall spawns
    addScore(1)
  }
  
  //ups the spawn every 10 seconds
  if(ticks % 600 == 0){
    if(ticks == 0 && spawnrate < 60){
      spawnrate = 60;
    }
    else{
      //kept like this instead of spawnrate-- incase we want to change the value
      spawnrate = spawnrate - 2;
    }
  }

  walls.forEach((w, i) => {
    w.pos.x += scr;
    color("light_red");
    //determines if wall spawns on top or bottom
    if(w.side == 0){
      rect(w.pos.x - 2, 0, 5, w.width);
    }else{
      rect(w.pos.x - 2, 100, 5, w.width * -1);
    }
  });

  //removes wall if it reaches end of screen
  walls.forEach((i) => {
    if(i.pos.x > 100){
      walls.shift();
    }
  });

  p.add(v);
  //p.y -= delay;
  //delay += jumpway
  color("transparent");
  color("green");
  box(p, 7, 7);
  if (input.isJustPressed) {
    play("jump");
    delay = jumpWay * 1;//adds delay
    jumpWay *= -1;
    v.y = speed * jumpWay;
  } else if(p.y < 7 || p.y > 96) {
    v.y = 0;
  }

  if (jumpWay > 0) {
    char("a", 20, 50);
  } else {
    char("a", 20, 50, {mirror: { y: -1}});
  }

  if (box(p, 7, 7).isColliding.rect.light_red) {
    play("explosion");
    end();
  }
  
}
