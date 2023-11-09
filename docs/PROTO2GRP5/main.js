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

function update() {
  if (!ticks) {
    p = vec(50, 50);
    v = vec();
    floors = [vec(50, 70)];
    jumpWay = floorAppDist = 1;
  }
  p.add(v);
  score += scr = (0.6) + difficulty * 0.1;
  if ((floorAppDist -= scr) < 0) {
    floorAppDist = rnd(99);
    floors.push(vec(rnd(99), -9));
  }
  //p.y += scr;
  color("blue");
  floors = floors.filter((f) => {
    f.y += scr;
    box(f, 33, 7);
    return f.y < 99;
  });
  color("transparent");
  color("green");
  box(p, 7, 7);
  if (input.isJustPressed) {
    play("jump");
    v.x = jumpWay *= -1;
  }
  else if(p.x < 5 || p.x > 96.5)
    v.x = 0;
  if (box(p, 7, 7).isColliding.rect.blue) {
    play("explosion");
    end();
  }
}
