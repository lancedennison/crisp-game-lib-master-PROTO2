title = "SLEEP";

description = `
[Press] Jump
`;

characters = [];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 90
};

let p, v;
let floors;
let jumpWay;
let floorAppDist;
let scr;

/** @type {{pos: Vector, width: number, side: number}[]} */
let walls;

let counter = 0;

function update() {
  const scr = difficulty * 0.4;
  if (!ticks) {
    p = vec(80, 50);
    v = vec();
    jumpWay = 1.75; //How fast the player changes gravity
    walls = [];
  }

  //generates a wall every second
  if(ticks % 60 == 0){
    walls.push({ pos: vec(-5, 0), width: rnd(6, difficulty * 10), side: counter % 2})
    counter ++;
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
  color("transparent");
  color("green");
  box(p, 7, 7);
  if (input.isJustPressed) {
    play("jump");
    v.y = jumpWay *= -1;
  }
  else if(p.y < 5 || p.y > 97)
    v.y = 0;
  if (box(p, 7, 7).isColliding.rect.light_red) {
    play("explosion");
    end();
  }
}
