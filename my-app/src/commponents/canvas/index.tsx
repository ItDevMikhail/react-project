import React, { useEffect } from 'react'

function Canvas() {
    const [star, setStar] = React.useState();
    useEffect(() => {

        return () => {
            window.cancelAnimationFrame(startAnim);
        }
    }, [])
    let c: any,
        $: any,
        startAnim: any,
        m = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
    function gc() {
        let s = "0123456789abcdef",
            c = "#";
        for (let i = 0; i < 6; i++) {
            c += s[Math.ceil(Math.random() * 15)];
        }
        return c;
    }

    let a: any = [];
    window.onload = function () {
        c = document.querySelector("canvas");
        $ = c.getContext("2d");
        $.lineWidth = 2;
        $.globalAlpha = 0.5;
        resize();
        anim();
        c.onmousemove = (e: any) => {
            if (e.layerX || e.layerX == 0) {
                m.x = e.offsetX;
                m.y = e.offsetY;
            }
        };
    };

    function resize() {
        c.height = 200;
        c.width = window.innerWidth;
        for (let i = 0; i < 50; i++) {
            a[i] = new obj(
                window.innerWidth / 2,
                200 / 2,
                2,
                gc(),
                Math.random() * 200 + 20,
                0.04
            );
        }
    }
    class obj {
        x: any;
        y: any;
        r: any;
        cc: any;
        o: any;
        s: any;
        theta: any;
        t: any;
        constructor(x: any, y: any, r: any, cc: any, o: any, s: any) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.cc = cc;
            this.theta = Math.random() * Math.PI * 2;
            this.s = s;
            this.o = o;
            this.t = Math.random() * 50;
            this.o = o;
        }

        rotate() {
            let ls = {
                x: this.x,
                y: this.y
            };
            this.theta += this.s;
            this.x = m.x + Math.cos(this.theta) * this.t;
            this.y = m.y + Math.sin(this.theta) * this.t;

            $.beginPath();
            $.lineWidth = this.r;
            $.strokeStyle = this.cc;
            $.moveTo(ls.x, ls.y);
            $.lineTo(this.x, this.y);
            $.stroke();
        };
    }
    function anim() {
        startAnim = window.requestAnimationFrame(anim);
        $.fillStyle = "rgba(248, 248, 255, 0.08)";
        $.fillRect(0, 0, c.width, c.height);
        a.forEach((e: any) => e.rotate());
    }
    // let keyword = "HOME",
    //     c: HTMLCanvasElement | null,
    //     $: CanvasRenderingContext2D | null,
    //     bgC: HTMLCanvasElement | null,
    //     bg$: CanvasRenderingContext2D | null,
    //     denseness = 10,
    //     parts: Array<any> = [],
    //     mouse = {
    //         x: -100,
    //         y: -100
    //     },
    //     mouseOnScreen = false,
    //     itercount = 0,
    //     itertot = 40;

    // function init() {
    //     c = document.querySelector("canvas");
    //     $ = c!.getContext("2d");

    //     c!.width = 800;
    //     c!.height = 300;

    //     bgC = document.createElement("canvas");
    //     bg$ = bgC.getContext("2d");

    //     bgC.width = 800;
    //     bgC.height = 300;

    //     c!.addEventListener("mousemove", mouseMove);
    //     c!.addEventListener("mouseout", mouseOut);
    //     console.log('init working')
    //     start();

    // };

    // let start = function () {
    //     bg$!.fillStyle = "black";
    //     bg$!.font = "300px impact";
    //     bg$!.textAlign = "center";
    //     bg$!.textBaseline = "middle";
    //     bg$!.fillText(keyword, c!.width / 2, c!.height / 2);
    //     clear();
    //     getCoords();
    // };

    // let getCoords = function () {
    //     let imgData, pixel, height, width;

    //     imgData = bg$!.getImageData(0, 0, c!.width, c!.height);

    //     for (height = 0; height < bgC!.height; height += denseness) {
    //         for (width = 0; width < bgC!.width; width += denseness) {
    //             pixel = imgData.data[(width + height * bgC!.width) * 4 - 1];
    //             if (pixel == 255) {
    //                 drawCircle(width, height);
    //             }
    //         }
    //     }

    //     const intId = setInterval(update, 40);
    //     // console.log('coord')
    // };

    // let drawCircle = function (x: number, y: number) {
    //     let startX = Math.random() * c!.width,
    //         startY = Math.random() * c!.height,
    //         velX = (x - startX) / itertot,
    //         velY = (y - startY) / itertot;

    //     parts.push({
    //         c: "#" + ((Math.random() * 0x949494 + 0xaaaaaa) | 0).toString(16),
    //         x: x,
    //         y: y,
    //         x2: startX,
    //         y2: startY,
    //         r: true,
    //         v: {
    //             x: velX,
    //             y: velY
    //         }
    //     });
    // };

    // let update = function () {
    //     let i, dx, dy, sqrDist, scale;
    //     itercount++;
    //     clear();
    //     for (i = 0; i < parts.length; i++) {
    //         if (parts[i].r == true) {
    //             parts[i].x2 += parts[i].v.x;
    //             parts[i].y2 += parts[i].v.y;
    //         }
    //         if (itercount == itertot) {
    //             parts[i].v = {
    //                 x: Math.random() * 6 * 2 - 6,
    //                 y: Math.random() * 6 * 2 - 6
    //             };
    //             parts[i].r = false;
    //         }

    //         dx = parts[i].x - mouse.x;
    //         dy = parts[i].y - mouse.y;
    //         sqrDist = Math.sqrt(dx * dx + dy * dy);
    //         if (sqrDist < 20) {
    //             console.log('dist')
    //             parts[i].r = true;
    //         }

    //         $!.fillStyle = parts[i].c;
    //         $!.beginPath();
    //         $!.arc(parts[i].x2, parts[i].y2, 4, 0, Math.PI * 2);
    //         $!.closePath();
    //         $!.fill();
    //     }
    // };

    // let mouseMove = function (e: any) {
    //     if (e.layerX || e.layerX == 0) {
    //         mouseOnScreen = true;
    //         mouse.x = e.layerX - c!.offsetLeft;
    //         mouse.y = e.layerY - c!.offsetTop;
    //     }
    // };

    // let mouseOut = function () {
    //     mouseOnScreen = false;

    //     mouse.x = -100;
    //     mouse.y = -100;
    // };

    // let clear = function () {
    //     $!.fillStyle = "#222";
    //     $!.fillRect(0, 0, c!.width, c!.height);
    // };



    return (
        <canvas id="canvas" width="0" height="0">
        </canvas>
    )
}

export default Canvas
