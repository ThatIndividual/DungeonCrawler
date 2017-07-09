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
            [0, 0, 0, 0, 1, 1, 2, 2, 3, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 2, 0, 0],
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
            spritesLoaded: false,
            map: map,
            mapW: mapW,
            mapH: mapH
        };
        data.sprites.onload = function () { data.spritesLoaded = true; };
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
            width: 512,
            height: 384,
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
        drawUnderlayer();
        drawFog();
        state.entities[0].draw();
    }
}
function drawSprite(ctx, sx, sy, dx, dy) {
    ctx.drawImage(data.sprites, sx * 16, sy * 16, 16, 16, dx * 32, dy * 32, 32, 32);
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
                    drawSprite(ctx, 15, 0, x, y);
                }
            }
        }
    }
}
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
var Player = (function () {
    function Player() {
        var _this = this;
        this.draw = function () {
            var ctx = display.context;
            drawSprite(ctx, _this.spriteX, _this.spriteY, 7, 5);
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
            if (state.pressedKeys.up) {
                if (data.map[_this.posY - 1][_this.posX] > 2) {
                    _this.posY -= 1;
                    display.viewY -= 1;
                }
            }
            else if (state.pressedKeys.down) {
                if (data.map[_this.posY + 1][_this.posX] > 2) {
                    _this.posY += 1;
                    display.viewY += 1;
                }
            }
            else if (state.pressedKeys.left) {
                if (data.map[_this.posY][_this.posX - 1] > 2) {
                    _this.posX -= 1;
                    display.viewX -= 1;
                }
            }
            else if (state.pressedKeys.right) {
                if (data.map[_this.posY][_this.posX + 1] > 2) {
                    _this.posX += 1;
                    display.viewX += 1;
                }
            }
        };
        this.spriteX = 2;
        this.spriteY = randInt(0, 1);
        this.posX = 2;
        this.posY = 3;
        display.viewX = this.posX - ((display.viewW - 1) / 2);
        display.viewY = this.posY - ((display.viewH - 1) / 2);
        console.log(display.viewX, display.viewY);
    }
    return Player;
}());
