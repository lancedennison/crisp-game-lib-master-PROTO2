title = "JUJUMP";

description = `
[Press] Jump
`;

characters = [];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
};

let p, v;
let floors;
let jumpWay;
let floorAppDist;
let scr;

/** @type {{pos: Vector, width: number}[]} */
let walls;
let wallVy;
let wallVw;

function update() {
  if (!ticks) {
    p = vec(80, 50);
    v = vec();
    jumpWay = 1.75;
    walls = times(19, (i) => {
      return {
        pos: vec(i * 6 - 3, 50),
        width: 60,
      };
    });
    wallVy = 0;
    wallVw = 0;
    topWallX = 50;
    topWallW = 60;
  }

  const scr = difficulty * 0.4;
  walls.forEach((w, i) => {
    w.pos.x += scr;
    if (w.pos.x > 110) {
      w.pos.x -= walls.length * 6;
      const pw = walls[wrap(i - 1, 0, walls.length)];
      
    }
    color("light_red");
    rect(w.pos.x -2, 0, 5, 6);
    rect(w.pos.x - 2, 100, 5, -6);
  });


  p.add(v);
  //score += scr = (0.6) + difficulty * 0.1;
  /*if ((floorAppDist -= scr) < 0) {
    floorAppDist = rnd(99);
    floors.push(-9, vec(rnd(99)));
  }*/
  //p.y += scr;
  //color("blue");
  /*floors = floors.filter((f) => {
    f.x += scr;
    box(f, 7, 33);
    return f.x < 99;
  });*/
  color("transparent");
  color("green");
  box(p, 7, 7);
  if (input.isJustPressed) {
    play("jump");
    v.y = jumpWay *= -1;
  }
  else if(p.y < 5 || p.y > 96.5)
    v.y = 0;
  if (box(p, 7, 7).isColliding.rect.blue) {
    play("explosion");
    end();
  }
}
