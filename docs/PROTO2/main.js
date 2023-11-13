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

/** @type {{pos: Vector, width: number}[]} */
let walls;
let wallVy;
let wallVw;

function update() {
  const scr = difficulty * 0.4;
  if (!ticks) {
    p = vec(80, 50);
    v = vec();
    jumpWay = 1.75;
    //begining wall generation, the x in times(x, (i)) changes how many
    //walls are on the screen at one time
    walls = [];
    wallVy = 0;
    wallVw = 0;
  }

  console.log(ticks % 60 == 0);
  console.log(ticks);
  if(ticks % 60 == 0){
    walls.push({ pos: vec(-5, 0), width: rnd(6, difficulty * 10)})
  }
  walls.forEach((w, i) => {
    w.pos.x += scr;
    if (w.pos.x > 110) {
      w.pos.x -= rnd(110, 210);
      const pw = walls[wrap(i - 1, 0, walls.length)];
    }
    color("light_red");
    if(i % 2 == 0){
      rect(w.pos.x - 2, 0, 5, w.width);
    }else{
      rect(w.pos.x - 2, 100, 5, w.width * -1);
    }
  });

  remove(walls, (i)=> {
    if(i.pos.x > 110){
      return true;
    }
  })

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
  else if(p.y < 5 || p.y > 97)
    v.y = 0;
  if (box(p, 7, 7).isColliding.rect.light_red) {
    play("explosion");
    end();
  }
}
