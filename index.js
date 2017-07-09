function randInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}
var display;
var time;
var state;
var data;
function initGame(canvas) {
    if (typeof (canvas.getContext) !== undefined) {
        var c = canvas;
        var ctx = c.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        display = {
            canvas: c,
            context: ctx,
            width: 512,
            height: 384,
            viewX: 0,
            viewY: 0,
            viewW: 15,
            viewH: 11
        };
        time = {
            fps: 30,
            interval: 1000 / 30,
            curr: 0,
            last: (new Date()).getTime(),
            delta: 0
        };
        state = {
            game: "init",
            viewX: 0,
            viewY: 0,
            entities: [new Player()],
            pressedKeys: {
                up: false,
                down: false,
                left: false,
                right: false,
                A: false,
                B: false
            }
        };
        var map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
            [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
            [0, 0, 1, 1, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2],
            [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 1, 1, 1, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        var mapW = map[0].length, mapH = map.length;
        var u = document.createElement("canvas");
        u.setAttribute("height", "" + mapH * 16);
        u.setAttribute("width", "" + mapW * 16);
        var utx = u.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        data = {
            sprites: document.createElement("img"),
            spritesLoaded: false,
            map: map,
            underlayer: u,
            undercontext: utx,
            underwidth: mapW * 16,
            underheight: mapH * 16
        };
        data.sprites.onload = function () { data.spritesLoaded = true; };
        loadSprites();
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
        draw(display.context);
        time.last = time.curr - (time.delta % time.interval);
    }
}
////////////
// UPDATE //
////////////
function update() {
    if (state.game === "init") {
        if (data.spritesLoaded) {
            renderUnderlayer();
            state.game = "input";
        }
    }
    else if (state.game === "input") {
        for (var i = 0; i < state.entities.length; i++)
            state.entities[0].update();
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
function draw(ctx) {
    ctx.clearRect(0, 0, display.width, display.height);
    if (state.game === "load") {
        ctx.fillStyle = "#000000";
        ctx.fillText("Loading...", 20, 20);
    }
    else if (state.game === "input") {
        var u = data.underlayer;
        ctx.drawImage(u, display.viewX * 16, display.viewY * 16, display.viewW * 16, display.viewH * 16, 0, 0, display.viewW * 32, display.viewH * 32);
        state.entities[0].draw();
    }
}
function drawSprite(ctx, sx, sy, dx, dy) {
    ctx.drawImage(data.sprites, sx * 16, sy * 16, 16, 16, dx * 32, dy * 32, 32, 32);
}
function drawUnderlayer() {
}
function renderUnderlayer() {
    var utx = data.undercontext, mapY = data.map.length, mapX = data.map[0].length;
    for (var y = 0; y < mapY; y++) {
        for (var x = 0; x < mapX; x++) {
            if (data.map[y][x] === 1) {
                var cavetype = randInt(3, 5);
                utx.drawImage(data.sprites, cavetype * 16, 8 * 16, 16, 16, x * 16, y * 16, 16, 16);
            }
            else if (data.map[y][x] === 2) {
                var walltype = randInt(0, 2);
                utx.drawImage(data.sprites, walltype * 16, 8 * 16, 16, 16, x * 16, y * 16, 16, 16);
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
var Player = (function () {
    function Player() {
        var _this = this;
        this.draw = function () {
            var ctx = display.context;
            drawSprite(ctx, _this.spriteX, _this.spriteY, 7, 5);
        };
        this.update = function () {
            if (state.pressedKeys.up) {
                if (data.map[_this.posY - 1][_this.posX] === 0) {
                    _this.posY -= 1;
                    display.viewY -= 1;
                }
            }
            else if (state.pressedKeys.down) {
                if (data.map[_this.posY + 1][_this.posX] === 0) {
                    _this.posY += 1;
                    display.viewY += 1;
                }
            }
            else if (state.pressedKeys.left) {
                if (data.map[_this.posY][_this.posX - 1] === 0) {
                    _this.posX -= 1;
                    display.viewX -= 1;
                }
            }
            else if (state.pressedKeys.right) {
                if (data.map[_this.posY][_this.posX + 1] === 0) {
                    _this.posX += 1;
                    display.viewX += 1;
                }
            }
        };
        this.spriteX = randInt(0, 7);
        this.spriteY = randInt(0, 1);
        this.posX = 1;
        this.posY = 2;
        display.viewX = this.posX - ((display.viewW - 1) / 2);
        display.viewY = this.posY - ((display.viewH - 1) / 2);
        console.log(display.viewX, display.viewY);
    }
    return Player;
}());
