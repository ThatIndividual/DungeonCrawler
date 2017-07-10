var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function randInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}
var display;
var time;
var state;
var data;
function initGame(canvas) {
    if (typeof (canvas.getContext) !== undefined) {
        // DATA //
        var map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0, 0, 0, 2, 4, 4, 4, 2, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 2, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 4, 2, 2, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2, 4, 2, 2, 0, 0],
            [0, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 0, 2, 4, 2, 0, 0, 0],
            [0, 0, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 0, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 2, 0, 2, 4, 2, 0, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 0, 0],
            [0, 0, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 4, 4, 4, 2, 0, 0, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 2, 4, 4, 4, 2, 0, 0, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 1, 3, 3, 2, 2, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 2, 2, 2, 0],
            [0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 2, 0],
            [0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0],
            [0, 0, 0, 1, 3, 3, 3, 1, 1, 1, 3, 2, 1, 2, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0],
            [0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0],
            [0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 3, 3, 1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        var mapW = map[0].length, mapH = map.length;
        data = {
            sprites: document.createElement("img"),
            spritesAreLoaded: false,
            map: map,
            mapW: mapW,
            mapH: mapH
        };
        data.sprites.onload = function () { data.spritesAreLoaded = true; };
        loadSprites();
        // DISPLAY //
        var c = canvas;
        c.setAttribute("width", "" + 17 * 32);
        c.setAttribute("height", "" + 13 * 32);
        var ctx = c.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        var u = document.createElement("canvas");
        u.setAttribute("width", "" + mapW * 16);
        u.setAttribute("height", "" + mapH * 16);
        var utx = u.getContext("2d");
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
            fogmask: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        };
        // STATE //
        state = {
            game: "init",
            viewX: 0,
            viewY: 0,
            fog: data.map.map(function (line) { return line.map(function (cell) { return 0; }); }),
            player: new Player(),
            entities: [
                new Door(10, 10), new Door(17, 2),
                new Key(4, 10), new Key(12, 13), new Key(18, 7),
                new Bread(24, 5), new Bread(24, 7),
                new Mouse(12, 10), new Mouse(14, 8), new Mouse(16, 8), new Mouse(15, 5),
                new Snake(19, 3), new Snake(19, 6)
            ],
            pressedKeys: {
                up: false,
                down: false,
                left: false,
                right: false,
                A: false,
                B: false
            }
        };
        // TIME //
        time = {
            fps: 30,
            interval: 1000 / 30,
            curr: 0,
            last: (new Date()).getTime(),
            delta: 0
        };
        window.addEventListener("keydown", function (e) {
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
    if (time.delta > time.interval) {
        update();
        draw();
        time.last = time.curr - (time.delta % time.interval);
    }
}
function entityAt(x, y) {
    for (var i = 0; i < state.entities.length; i++) {
        var entity = state.entities[i];
        if (x === entity.posX && y === entity.posY)
            return i;
    }
    return -1;
}
;
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
            right: false,
            A: false,
            B: false
        };
    }
}
///////////////
// RENDERING //
///////////////
function draw() {
    var ctx = display.context;
    ctx.clearRect(0, 0, display.width, display.height);
    if (state.game === "load") {
        ctx.fillStyle = "#000000";
        ctx.fillText("Loading...", 20, 20);
    }
    else if (state.game === "input") {
        drawUnderlayer();
        for (var i = 0; i < state.entities.length; i++) {
            state.entities[i].draw();
        }
        state.player.draw();
        drawFog();
        drawUI();
    }
}
function drawUnderlayer() {
    var u = display.underlayer;
    display.context.drawImage(u, display.viewX * 16, display.viewY * 16, display.viewW * 16, display.viewH * 16, 0, 0, display.viewW * 32, display.viewH * 32);
}
function drawFog() {
    var ctx = display.context;
    for (var y = 0; y < 11; y++) {
        for (var x = 0; x < 15; x++) {
            var absX = display.viewX + x, absY = display.viewY + y;
            if (absX >= 0 && absX < data.mapW &&
                absY >= 0 && absY < data.mapH &&
                display.fogmask[y][x] === 1) {
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
    var lifestr = ("Life " + state.player.life).split("");
    for (var char = 0; char < lifestr.length; char++)
        drawChar(lifestr[char], char, 11);
    var keystr = ("Keys " + state.player.keys).split("");
    for (var char = 0; char < keystr.length; char++)
        drawChar(keystr[char], char, 12);
}
function drawSprite(sx, sy, dx, dy) {
    display.context.drawImage(data.sprites, sx * 16, sy * 16, 16, 16, dx * 32, dy * 32, 32, 32);
}
function drawChar(char, x, y) {
    var spriteX, spriteY;
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
    display.context.drawImage(data.sprites, spriteX * 8, spriteY * 16, 8, 16, x * 16, y * 32, 16, 32);
}
;
function renderUnderlayer() {
    var utx = display.undercontext, mapY = data.map.length, mapX = data.map[0].length;
    for (var y = 0; y < mapY; y++) {
        for (var x = 0; x < mapX; x++) {
            if (data.map[y][x] === 1) {
                var cavewall = randInt(3, 5);
                utx.drawImage(data.sprites, cavewall * 16, 8 * 16, 16, 16, x * 16, y * 16, 16, 16);
            }
            else if (data.map[y][x] === 2) {
                var brickwall = randInt(0, 2);
                utx.drawImage(data.sprites, brickwall * 16, 8 * 16, 16, 16, x * 16, y * 16, 16, 16);
            }
            else if (data.map[y][x] === 3) {
                utx.drawImage(data.sprites, 13 * 16, 0, 16, 16, x * 16, y * 16, 16, 16);
            }
            else if (data.map[y][x] === 4) {
                utx.drawImage(data.sprites, 14 * 16, 0, 16, 16, x * 16, y * 16, 16, 16);
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
var Entity = (function () {
    function Entity(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    Entity.prototype.draw = function () {
        var ctx = display.context, relX = this.posX - display.viewX, relY = this.posY - display.viewY;
        if (state.fog[this.posY][this.posX] === 1 &&
            this.posX >= display.viewX && this.posX < display.viewX + display.viewW &&
            this.posY >= display.viewY && this.posY < display.viewY + display.viewH) {
            drawSprite(this.spriteX, this.spriteY, relX, relY);
        }
        ;
    };
    ;
    Entity.prototype["delete"] = function (eid) {
        state.entities = state.entities.slice(0, eid).concat(state.entities.slice(eid + 1));
    };
    ;
    return Entity;
}());
;
var Player = (function () {
    function Player() {
        var _this = this;
        this.gainKey = function () {
            _this.keys += 1;
        };
        this.loseKey = function () {
            _this.keys -= 1;
        };
        this.gainLife = function (how_much) {
            _this.life += how_much;
            if (_this.life > 100)
                _this.life -= _this.life % 100;
        };
        this.loseLife = function (how_much) {
            _this.life -= how_much;
        };
        this.draw = function () {
            var ctx = display.context;
            drawSprite(_this.spriteX, _this.spriteY, 7, 5);
        };
        this.update = function () {
            // bust fog
            for (var x = -1; x < 2; x++)
                state.fog[_this.posY - 2][_this.posX + x] = 1;
            for (var x = -2; x < 3; x++) {
                for (var y = -1; y < 2; y++)
                    state.fog[_this.posY + y][_this.posX + x] = 1;
            }
            for (var x = -1; x < 2; x++)
                state.fog[_this.posY + 2][_this.posX + x] = 1;
            // handle input
            var entities = state.entities;
            if (state.pressedKeys.up) {
                if (data.map[_this.posY - 1][_this.posX] > 2) {
                    var eId = entityAt(_this.posX, _this.posY - 1);
                    if (eId !== -1) {
                        if (entities[eId].solid === false) {
                            _this.posY -= 1;
                            display.viewY -= 1;
                        }
                        ;
                        entities[eId].interact(eId);
                    }
                    else {
                        _this.posY -= 1;
                        display.viewY -= 1;
                    }
                    ;
                }
                ;
            }
            else if (state.pressedKeys.down) {
                if (data.map[_this.posY + 1][_this.posX] > 2) {
                    var eId = entityAt(_this.posX, _this.posY + 1);
                    if (eId !== -1) {
                        if (entities[eId].solid === false) {
                            _this.posY += 1;
                            display.viewY += 1;
                        }
                        ;
                        entities[eId].interact(eId);
                    }
                    else {
                        _this.posY += 1;
                        display.viewY += 1;
                    }
                    ;
                }
                ;
            }
            else if (state.pressedKeys.left) {
                if (data.map[_this.posY][_this.posX - 1] > 2) {
                    var eId = entityAt(_this.posX - 1, _this.posY);
                    if (eId !== -1) {
                        if (entities[eId].solid === false) {
                            _this.posX -= 1;
                            display.viewX -= 1;
                        }
                        ;
                        entities[eId].interact(eId);
                    }
                    else {
                        _this.posX -= 1;
                        display.viewX -= 1;
                    }
                    ;
                }
                ;
            }
            else if (state.pressedKeys.right) {
                if (data.map[_this.posY][_this.posX + 1] > 2) {
                    var eId = entityAt(_this.posX + 1, _this.posY);
                    if (eId !== -1) {
                        if (entities[eId].solid === false) {
                            _this.posX += 1;
                            display.viewX += 1;
                        }
                        ;
                        entities[eId].interact(eId);
                    }
                    else {
                        _this.posX += 1;
                        display.viewX += 1;
                    }
                    ;
                }
                ;
            }
        };
        this.spriteX = 2;
        this.spriteY = randInt(0, 1);
        this.posX = 2;
        this.posY = 3;
        display.viewX = this.posX - ((display.viewW - 1) / 2);
        display.viewY = this.posY - ((display.viewH - 1) / 2);
        this.life = 100;
        this.keys = 0;
    }
    return Player;
}());
;
var Door = (function (_super) {
    __extends(Door, _super);
    function Door(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 12;
        _this.spriteY = 8;
        _this.opened = false;
        _this.solid = true;
        return _this;
    }
    ;
    Door.prototype.interact = function () {
        if (state.player.keys > 0) {
            state.player.loseKey();
            this.opened = true;
            this.solid = false;
            this.spriteX = 13;
        }
        ;
    };
    ;
    Door.prototype.update = function () { };
    ;
    return Door;
}(Entity));
;
var Key = (function (_super) {
    __extends(Key, _super);
    function Key(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 11;
        _this.spriteY = 13;
        _this.solid = false;
        return _this;
    }
    ;
    Key.prototype.interact = function (eId) {
        state.player.gainKey();
        this["delete"](eId);
    };
    ;
    Key.prototype.update = function () { };
    ;
    return Key;
}(Entity));
;
var Cheese = (function (_super) {
    __extends(Cheese, _super);
    function Cheese(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 7;
        _this.spriteY = 15;
        _this.solid = false;
        return _this;
    }
    ;
    Cheese.prototype.interact = function (eId) {
        state.player.gainLife(10);
        this["delete"](eId);
    };
    ;
    Cheese.prototype.update = function () { };
    ;
    return Cheese;
}(Entity));
;
var Bread = (function (_super) {
    __extends(Bread, _super);
    function Bread(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 5;
        _this.spriteY = 15;
        _this.solid = false;
        return _this;
    }
    ;
    Bread.prototype.interact = function (eId) {
        state.player.gainLife(20);
        this["delete"](eId);
    };
    ;
    Bread.prototype.update = function () { };
    ;
    return Bread;
}(Entity));
;
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 0;
        _this.spriteY = 4;
        _this.health = 15;
        _this.solid = true;
        return _this;
    }
    ;
    Mouse.prototype.interact = function (eId) {
        this.health -= 5;
        state.player.loseLife(5);
        if (this.health <= 0) {
            this["delete"](eId);
            state.entities.push(new Cheese(this.posX, this.posY));
        }
        ;
    };
    ;
    Mouse.prototype.update = function () { };
    ;
    return Mouse;
}(Entity));
;
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(posX, posY) {
        var _this = _super.call(this, posX, posY) || this;
        _this.spriteX = 6;
        _this.spriteY = 4;
        _this.health = 15;
        _this.solid = true;
        return _this;
    }
    ;
    Snake.prototype.interact = function (eId) {
        this.health -= 5;
        state.player.loseLife(10);
        if (this.health <= 0) {
            this["delete"](eId);
        }
        ;
    };
    ;
    Snake.prototype.update = function () { };
    ;
    return Snake;
}(Entity));
;
