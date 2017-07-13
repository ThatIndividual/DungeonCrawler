function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

let display: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  viewX: number;
  viewY: number;
  viewW: number;
  viewH: number;
  underlayer: HTMLCanvasElement;
  undercontext: CanvasRenderingContext2D;
  underwidth: number;
  underheight: number;
  basecolor: string;
  forecolor: string;
  fogmask: Array<Array<0 | 1>>
};
let time: {
  fps: number;
  interval: number;
  curr: number;
  last: number;
  delta: number;
};
let state: {
  game: "init" | "load" | "input" | "paused";
  viewX: number;
  viewY: number;
  fog: Array<Array<number>>;
  player: Player;
  entities: Array<Entity>;
  pressedKeys: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  }
};
let data: {
  sprites: HTMLImageElement;
  spritesAreLoaded: boolean;
  map: Array<Array<number>>;
  mapW: number;
  mapH: number;
};

function setGame(canvas: HTMLCanvasElement) {
  // DATA //
  const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,4,4,4,4,4,4,2,0,0,0,0,2,4,4,4,2,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,1,2,4,4,4,2,4,4,4,2,0,0,0,0,2,4,4,4,2,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,3,1,2,4,4,4,2,4,4,4,2,2,2,2,2,2,4,4,4,2,0,0],
    [0,0,0,0,1,3,3,3,3,3,3,3,1,2,2,4,2,2,4,4,4,2,4,4,4,2,2,2,4,2,2,0,0],
    [0,0,0,0,1,3,1,1,1,1,1,1,1,2,4,4,4,2,4,4,4,4,4,4,4,2,0,2,4,2,0,0,0],
    [0,0,0,0,1,3,3,3,3,1,0,0,0,2,4,4,4,2,4,4,4,2,4,4,4,2,0,2,4,2,0,0,0],
    [0,0,2,2,2,2,2,2,3,2,2,2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,2,2,4,2,2,0,0],
    [0,0,2,4,4,4,2,4,4,4,2,4,4,4,4,4,4,4,4,4,4,4,2,4,4,4,2,4,4,4,2,0,0],
    [0,0,2,4,4,4,2,4,4,4,4,4,4,4,4,2,4,4,4,4,2,4,2,4,2,4,2,4,4,4,2,0,0],
    [0,0,2,4,4,4,4,4,4,4,2,4,4,4,4,4,4,4,4,4,2,4,4,4,2,4,2,4,4,4,2,0,0],
    [0,0,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,2,4,4,4,2,0,0],
    [0,0,0,0,0,0,1,3,3,3,3,3,3,2,4,4,4,2,0,0,2,4,4,4,4,4,2,4,4,4,2,0,0],
    [0,0,0,0,0,1,1,3,3,3,3,3,3,2,4,4,4,2,0,0,2,4,4,4,4,4,2,4,4,4,2,0,0],
    [0,0,0,0,1,1,3,3,3,3,1,3,3,2,2,4,2,2,2,2,2,4,4,4,4,4,2,2,4,2,2,2,0],
    [0,0,0,1,1,3,3,3,3,3,3,3,2,2,4,4,4,4,4,2,2,4,4,4,4,4,2,2,4,4,4,2,0],
    [0,0,0,1,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,2,4,4,4,4,4,4,4,2,4,4,4,2,0],
    [0,0,0,1,3,3,3,1,1,1,3,2,1,2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,0],
    [0,0,0,1,3,3,3,3,3,3,3,3,3,3,1,4,4,4,4,2,4,4,4,4,4,4,4,2,4,4,4,2,0],
    [0,0,0,1,1,3,3,3,3,3,3,3,3,3,1,1,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,1,3,3,3,3,3,3,3,3,3,3,1,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,3,3,3,3,1,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,3,3,1,1,1,1,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  const mapW = map[0].length,
        mapH = map.length;

  data = {
    sprites: document.createElement("img"),
    spritesAreLoaded: false,
    map,
    mapW,
    mapH
  };

  if (data.hasOwnProperty("spritesAreLoaded") && data.spritesAreLoaded !== true) {
    data.sprites.onload = () => { data.spritesAreLoaded = true; };
    loadSprites();
  };

  // DISPLAY //
  const c = canvas;
  c.setAttribute("width", `${17 * 32}`);
  c.setAttribute("height", `${13 * 32}`);

  const ctx = c.getContext("2d");
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  const u = document.createElement("canvas");
  u.setAttribute("width", `${mapW * 16}`);
  u.setAttribute("height", `${mapH * 16}`);

  const utx = u.getContext("2d");
  utx.mozImageSmoothingEnabled = false;
  utx.webkitImageSmoothingEnabled = false;
  utx.imageSmoothingEnabled = false;

  display = {
    canvas: c,
    context: ctx,
    width: 17 * 32,
    height: 13 * 32,
    viewX: 0,
    viewY: 0,
    viewW: 15,
    viewH: 11,
    underlayer: u,
    undercontext: utx,
    underwidth: mapW * 16,
    underheight: mapH * 16,
    basecolor: "#111133",
    forecolor: "#EEEECC",
    fogmask: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
      [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
  };

  // STATE //
  state = {
    game: "init",
    viewX: 0,
    viewY: 0,
    fog: data.map.map(line => line.map(cell => 0)),
    player: new Player(2, 3),
    entities: [
      new Door(10, 10), new Door(17, 2), new Door(20, 9), new Door(19, 18),
      new Door(28, 8), new Door(28, 7), new Door(28, 6), new Door(28, 5), 
      new Key(4, 10), new Key(12, 13), new Key(18, 7), new Key(5, 21),
      new Buckler(13, 23), new Shield(23, 14), new Sword(23, 6), new Spear(28, 10),
      new Bread(24, 5), new Bread(24, 7), new Bread(16, 10),
      new Drumstick(8, 19), new Drumstick(21, 16),
      new Potion(6, 15), new Potion(25, 11), new Potion(23, 18),
      new Mouse(12, 10), new Mouse(14, 8), new Mouse(16, 8), new Mouse(15, 5),
      new Mouse(18, 16), new Mouse(21, 13), new Mouse(30, 16),
      new Snake(6, 16), new Snake(7, 15), new Snake(11, 14), new Snake(19, 3),
      new Snake(19, 6),
      new Bat(8, 21), new Bat(11, 19), new Bat(13, 22),
      new Slime(21, 10), new Slime(23, 10), new Slime(25, 10),
      new Mage(21, 18), new Mage(25, 18), new Mage(29, 18), new Mage(28, 13),
      new Boss(28, 3)
    ],
    pressedKeys: {
      up: false,
      down: false,
      left: false,
      right: false
    }
  };
}

function initGame(canvas: HTMLCanvasElement) {
  if (typeof (canvas.getContext) !== undefined) {
    setGame(canvas);

    // TIME //
    time = {
      fps: 30,
      interval: 1000 / 30,
      curr: 0,
      last: (new Date()).getTime(),
      delta: 0
    };

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          state.pressedKeys.up = true;
          break;

        case "ArrowDown":
          state.pressedKeys.down = true;
          break;

        case "ArrowLeft":
          state.pressedKeys.left = true;
          break;

        case "ArrowRight":
          state.pressedKeys.right = true;
          break;

        default:
          break;
      }
    });

    gameLoop();
  }
  else
    alert("Please use a browser that supports HTML canvas.");
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);

  time.curr = (new Date()).getTime();
  time.delta = (time.curr - time.last);
  update();

  if (time.delta > time.interval) {
    draw();

    time.last = time.curr - (time.delta % time.interval);
  }
}

function entityAt(x: number, y: number): number {
  for (let i = 0; i < state.entities.length; i++) {
    const entity = state.entities[i];

    if (x === entity.posX && y === entity.posY)
      return i;
  }

  return -1;
};

////////////
// UPDATE //
////////////
function update() {
  if (state.game === "init") {
    if (data.spritesAreLoaded) {
      renderUnderlayer();
      state.game = "input";
    }
  }
  else if (state.game === "input") {
    state.player.update();
    
    state.pressedKeys = {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }
}

///////////////
// RENDERING //
///////////////
function draw() {
  const ctx = display.context;
  ctx.clearRect(0, 0, display.width, display.height);

  if (state.game === "load") {
    ctx.fillStyle = "#000000";
    ctx.fillText("Loading...", 20, 20);
  }
  else if (state.game === "input") {
    drawUnderlayer();
    for (let i = 0; i < state.entities.length; i++) {
      (state.entities[i] as any).draw();
    }
    state.player.draw();
    drawFog();
    drawUI();
  }
}

function drawUnderlayer() {
  const u = display.underlayer;
  display.context.drawImage(
    u,
    display.viewX * 16, display.viewY * 16, display.viewW * 16, display.viewH * 16,
    0, 0, display.viewW * 32, display.viewH * 32
  );
}

function drawFog() {
  const ctx = display.context;

  for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 15; x++) {
      const absX = display.viewX + x,
            absY = display.viewY + y;

      if (
        absX >= 0 && absX < data.mapW &&
        absY >= 0 && absY < data.mapH &&
        display.fogmask[y][x] === 1
      ) {
        if (state.fog[absY][absX] === 0) {
          ctx.fillStyle = display.basecolor;
          ctx.fillRect(x * 32, y * 32, 32, 32);
        }
        else if (state.fog[absY][absX] === 1) {
          drawSprite(15, 0, x, y);
        }
      }
    }
  }
}

function drawUI() {
  const ctx = display.context;

  let levelstr = `Lv ${state.player.level}`;
  for (let char = 0; char < levelstr.length; char++)
    drawChar(levelstr[char], char, 11);

  drawSprite(11, 13, 0, 12);
  let keystring = `   ${state.player.keys}`.split("");
  for (let char = 0; char < keystring.length; char++)
    drawChar(keystring[char], char, 12);

  let lifestring = `HP ${state.player.curLife}`.split("");
  for (let char = 0; char < lifestring.length; char++)
    drawChar(lifestring[char], 6 + char, 11);

  let expstring = `XP ${state.player.exp}`.split("");
  for (let char = 0; char < expstring.length; char++)
    drawChar(expstring[char], 6 + char, 12);

  const weapon = state.player.weapon;
  let playerWeaponSprite: [number, number];
  if (weapon === "Dagger")
    playerWeaponSprite = [0, 17];
  else if (weapon === "Sword")
    playerWeaponSprite = [1, 17];
  else if (weapon === "Spear")
    playerWeaponSprite = [3, 17];
  drawSprite(playerWeaponSprite[0], playerWeaponSprite[1], 10, 11);
  let wpnstring = `Weapon   ${weapon}`.split("");
  for (let char = 0; char < wpnstring.length; char++)
    drawChar(wpnstring[char], 13 + char, 11);

  const armour = state.player.armour;
  let playerArmourSprite: [number, number];
  if (armour === "none")
    playerArmourSprite = [14, 17];
  else if (armour === "Buckler")
    playerArmourSprite = [7, 17];
  else if (armour === "Shield")
    playerArmourSprite = [8, 17];
  drawSprite(playerArmourSprite[0], playerArmourSprite[1], 10, 12);
  let armstring = `Armour   ${state.player.armour}`.split("");
  for (let char = 0; char < armstring.length; char++)
    drawChar(armstring[char], 13 + char, 12);
}

function drawSprite(sx: number, sy: number, dx: number, dy: number) {
  display.context.drawImage(
    data.sprites,
    sx * 16, sy * 16, 16, 16,
    dx * 32, dy * 32, 32, 32
  );
}

function drawChar(char: string, x: number, y: number) {
  let spriteX, spriteY;

  if (char === " ")
    return;
  else if (/^[0-9]$/.test(char)) {
    spriteY = 23;
    spriteX = +char;
  }
  else if (/^[A-Z]$/.test(char)) {
    spriteY = 24;
    spriteX = char.charCodeAt(0) - 65;
  }
  else if (/^[a-z]$/.test(char)) {
    spriteY = 26;
    spriteX = char.charCodeAt(0) - 97;
  }

  display.context.drawImage(
    data.sprites,
    spriteX * 8, spriteY * 16, 8, 16,
    x * 16, y * 32, 16, 32
  );
};

function renderUnderlayer() {
  const utx = display.undercontext,
        mapY = data.map.length,
        mapX = data.map[0].length;
  
  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
      if (data.map[y][x] === 1) {
        const cavewall = randInt(3, 5);
        utx.drawImage(
          data.sprites,
          cavewall * 16, 8 * 16, 16, 16,
          x * 16, y * 16, 16, 16
        );
      }
      else if (data.map[y][x] === 2) {
        const brickwall = randInt(0, 2);
        utx.drawImage(
          data.sprites,
          brickwall * 16, 8 * 16, 16, 16,
          x * 16, y * 16, 16, 16
        );
      }
      else if (data.map[y][x] === 3) {
        utx.drawImage(
          data.sprites,
          13 * 16, 0, 16, 16,
          x * 16, y * 16, 16, 16
        );
      }
      else if (data.map[y][x] === 4) {
        utx.drawImage(
          data.sprites,
          14 * 16, 0, 16, 16,
          x * 16, y * 16, 16, 16
        );
      }
    }
  }
}

function loadSprites() {
  data.sprites.setAttribute("src", "data:image/png;base64,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");
}

//////////////
// ENTITIES //
//////////////
class Player {
  public posX: number;
  public posY: number;

  private gender: number;
  public level: number;
  public exp: number;
  public curLife: number;
  public maxLife: number;
  public keys: number;
  public weapon: "Dagger" | "Sword" | "Spear";
  public armour: "none" | "Buckler" | "Shield";

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;

    display.viewX = this.posX - ((display.viewW - 1) / 2);
    display.viewY = this.posY - ((display.viewH - 1) / 2);

    this.gender = randInt(0, 1);
    this.level = 1;
    this.exp = 0;

    this.curLife = 100;
    this.maxLife = 100;
    this.keys = 0;

    this.weapon = "Dagger";
    this.armour = "none";
  }

  rollDamage() {
    switch (this.weapon) {
      case "Dagger":
        return randInt(1, 3);
      case "Sword":
        return randInt(1, 6);
      case "Spear":
        return randInt(1, 12);
    };
  };

  gainXP(how_much: number) {
    this.exp += how_much;

    switch (this.level) {
      case 1:
        if (this.exp >= 100) {
          this.level = 2;
          this.exp -= 100;
          this.maxLife = 105;
          this.gainLife(5);
        }
        break;

       case 2:
        if (this.exp >= 200) {
          this.level = 3;
          this.exp -= 200;
          this.maxLife = 110;
          this.gainLife(10);
        }
        break;

      case 3:
        if (this.exp >= 300) {
          this.level = 4;
          this.exp -= 300;
          this.maxLife = 115;
          this.gainLife(15);
        }
        break;

      case 4:
        if (this.exp >= 400) {
          this.level = 5;
          this.exp -= 400;
          this.maxLife = 120;
          this.gainLife(20);
        }
        break;

      case 5:
        if (this.exp >= 500) {
          this.level = 6;
          this.exp -= 500;
          this.maxLife = 125;
        }
        break;
    }
  };

  gainLife = (how_much: number) => {
    this.curLife += how_much;

    if (this.curLife > this.maxLife)
      this.curLife -= this.curLife % this.maxLife;
  };

  loseLife = (how_much: number) => {
    switch (this.armour) {
      case "none":
        this.curLife -= how_much;
        break;
      case "Buckler":
        this.curLife -= Math.ceil(how_much * 0.75);
        break;
      case "Shield":
        this.curLife -= Math.ceil(how_much * 0.50);
        break;
    };

    if (this.curLife <= 0) {
      setGame(display.canvas);
    }
  };

  gainKey = () => {
    this.keys += 1;
  };

  loseKey = () => {
    this.keys -= 1;
  };

  draw = () => {
    const ctx = display.context;
    if (this.armour === "none")
      ctx.drawImage(
        data.sprites,
        0 * 16, this.gender * 16, 8, 16,
        7 * 32, 5 * 32, 16, 32
      );
    if (this.armour === "Buckler")
      ctx.drawImage(
        data.sprites,
        1 * 16, this.gender * 16, 8, 16,
        7 * 32, 5 * 32, 16, 32
      );
    if (this.armour === "Shield")
      ctx.drawImage(
        data.sprites,
        2 * 16, this.gender * 16, 8, 16,
        7 * 32, 5 * 32, 16, 32
      );

    if (this.weapon === "Dagger")
      ctx.drawImage(
        data.sprites,
        8 + 0 * 16, this.gender * 16, 8, 16,
        16 + 7 * 32, 5 * 32, 16, 32
      );
    if (this.weapon === "Sword")
      ctx.drawImage(
        data.sprites,
        8 + 1 * 16, this.gender * 16, 8, 16,
        16 + 7 * 32, 5 * 32, 16, 32
      );
    if (this.weapon === "Spear")
      ctx.drawImage(
        data.sprites,
        8 + 2 * 16, this.gender * 16, 8, 16,
        16 + 7 * 32, 5 * 32, 16, 32
      );
  };

  update = () => {
    // bust fog
    for (let x = -1; x < 2; x++)
      state.fog[this.posY - 2][this.posX + x] = 1;
    for (let x = -2; x < 3; x++) {
      for (let y = -1; y < 2; y++)
        state.fog[this.posY + y][this.posX + x] = 1;
    }
    for (let x = -1; x < 2; x++)
      state.fog[this.posY + 2][this.posX + x] = 1;

    // handle input
    const entities = state.entities;

    if (state.pressedKeys.up) {
      if (data.map[this.posY - 1][this.posX] > 2) {
        const eId = entityAt(this.posX, this.posY - 1);

        if (eId !== -1) {
          if (entities[eId].solid === false) {
            this.posY -= 1;
            display.viewY -= 1;
          };

          entities[eId].interact(eId);
        }
        else {
          this.posY -= 1;
          display.viewY -= 1;
        };
      };
    }
    else if (state.pressedKeys.down) {
      if (data.map[this.posY + 1][this.posX] > 2) {
        const eId = entityAt(this.posX, this.posY + 1);

        if (eId !== -1) {
          if (entities[eId].solid === false) {
            this.posY += 1;
            display.viewY += 1;
          };

          entities[eId].interact(eId);
        }
        else {
          this.posY += 1;
          display.viewY += 1;
        };
      };
    }
    else if (state.pressedKeys.left) {
      if (data.map[this.posY][this.posX - 1] > 2) {
        const eId = entityAt(this.posX - 1, this.posY);

        if (eId !== -1) {
          if (entities[eId].solid === false) {
            this.posX -= 1;
            display.viewX -= 1;
          };

          entities[eId].interact(eId);
        }
        else {
          this.posX -= 1;
          display.viewX -= 1;
        };
      };
    }
    else if (state.pressedKeys.right) {
      if (data.map[this.posY][this.posX + 1] > 2) {
        const eId = entityAt(this.posX + 1, this.posY);

        if (eId !== -1) {
          if (entities[eId].solid === false) {
            this.posX += 1;
            display.viewX += 1;
          };

          entities[eId].interact(eId);
        }
        else {
          this.posX += 1;
          display.viewX += 1;
        };
      };
    };
  };
};

abstract class Entity {
  spriteX: number;
  spriteY: number;
  posX: number;
  posY: number;
  solid: boolean;

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  abstract update(): void;
  abstract interact(eid: number): void;

  draw() {
    const ctx = display.context,
          relX = this.posX - display.viewX,
          relY = this.posY - display.viewY;

    if (
      state.fog[this.posY][this.posX] === 1 &&
      this.posX >= display.viewX && this.posX < display.viewX + display.viewW &&
      this.posY >= display.viewY && this.posY < display.viewY + display.viewH &&
      !(this.posX === state.player.posX && this.posY === state.player.posY)
    ) {
      drawSprite(this.spriteX, this.spriteY, relX, relY);
    };
  };

  delete(eid: number) {
    state.entities = state.entities.slice(0, eid).concat(state.entities.slice(eid + 1));
  };
};

class Door extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 12;
    this.spriteY = 8;

    this.solid = true;
  };

  interact() {
    if (this.solid && state.player.keys > 0) {
      state.player.loseKey();
      this.solid = false;
      this.spriteX = 13;
    };
  };

  update() {};
};

class Key extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 11;
    this.spriteY = 13;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.gainKey();
    this.delete(eId);
  };

  update() {};
};

class Cheese extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 7;
    this.spriteY = 15;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.gainLife(10);
    this.delete(eId);
  };

  update() {};
};

class Bread extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 5;
    this.spriteY = 15;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.gainLife(20);
    this.delete(eId);
  };

  update() {};
};

class Drumstick extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 0;
    this.spriteY = 15;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.gainLife(30);
    this.delete(eId);
  };

  update() {};
};

class Potion extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 5;
    this.spriteY = 16;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.gainLife(50);
    this.delete(eId);
  };

  update() {};
};

class Buckler extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 7;
    this.spriteY = 17;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.armour = "Buckler";
    this.delete(eId);
  };

  update() {};
};

class Shield extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 8;
    this.spriteY = 17;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.armour = "Shield";
    this.delete(eId);
  };

  update() {};
};

class Sword extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 1;
    this.spriteY = 17;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.weapon = "Sword";
    this.delete(eId);
  };

  update() {};
};

class Spear extends Entity {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 3;
    this.spriteY = 17;

    this.solid = false;
  };

  interact(eId: number) {
    state.player.weapon = "Spear";
    this.delete(eId);
  };

  update() {};
};

abstract class Monster extends Entity {
  public curHealth: number;
  public maxHealth: number;
  public damage: [number, number];

  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.solid = true;
  };

  draw() {
    const ctx = display.context,
          relX = this.posX - display.viewX,
          relY = this.posY - display.viewY;

    if (
      state.fog[this.posY][this.posX] === 1 &&
      this.posX >= display.viewX && this.posX < display.viewX + display.viewW &&
      this.posY >= display.viewY && this.posY < display.viewY + display.viewH
    ) {
      drawSprite(this.spriteX, this.spriteY, relX, relY);

      if (this.curHealth !== this.maxHealth) {
        ctx.fillStyle = display.basecolor;
        ctx.fillRect(relX * 32, (relY + 1) * 32, 32 , 4);

        ctx.fillStyle = display.forecolor;
        ctx.fillRect(
          (relX * 32) + 1,
          ((relY + 1) * 32) + 1,
          Math.ceil((this.curHealth / this.maxHealth) * 30),
          2
        );
      };
    };
  };

  rollDamage() {
    return randInt(this.damage[0], this.damage[1]);
  };
};

class Mouse extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 0;
    this.spriteY = 4;

    this.curHealth = 10;
    this.maxHealth = 10;
    this.damage = [1, 3];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      state.player.gainXP(10);
      this.delete(eId);

      if (randInt(0, 2) === 0)
        state.entities.push(new Cheese(this.posX, this.posY));
    };
  };

  update() {};
};

class Bat extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 1;
    this.spriteY = 4;

    this.curHealth = 7;
    this.maxHealth = 7;
    this.damage = [2, 4];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      state.player.gainXP(15);
      this.delete(eId);
    };
  };

  update() {};
};

class Snake extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 6;
    this.spriteY = 4;

    this.curHealth = 20;
    this.maxHealth = 20;
    this.damage = [1, 5];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      state.player.gainXP(20);
      this.delete(eId);
    };
  };

  update() {};
};

class Slime extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 0;
    this.spriteY = 7;

    this.curHealth = 15;
    this.maxHealth = 15;
    this.damage = [3, 6];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      state.player.gainXP(30);
      this.delete(eId);
    };
  };

  update() {};
};

class Mage extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 3;
    this.spriteY = 2;

    this.curHealth = 30;
    this.maxHealth = 30;
    this.damage = [1, 12];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      state.player.gainXP(100);
      state.entities.push(new Key(this.posX, this.posY));
      this.delete(eId);
    };
  };

  update() {};
};

class Boss extends Monster {
  constructor(posX: number, posY: number) {
    super(posX, posY);
    this.spriteX = 4;
    this.spriteY = 2;

    this.curHealth = 50;
    this.maxHealth = 50;
    this.damage = [8, 16];
  };

  interact(eId: number) {
    this.curHealth -= state.player.rollDamage();
    state.player.loseLife(this.rollDamage());

    if (this.curHealth <= 0) {
      this.delete(eId);
    };
  };

  update() {};
};