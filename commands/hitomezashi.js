const { createCanvas } = require("canvas");
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'hitomezashi',
    description: "Generates a hitomezashi stichting pattern from a given text and key.",

    execute(message, args) {
        const drawConsonant = (y) => {
            for (let x = 0; x < WIDTH; x += 8) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x+4, y);
                ctx.stroke();
            }
        }
        
        const drawVowel = (y) => {
            for (let x = 0; x < WIDTH; x += 8) {
                ctx.beginPath();
                ctx.moveTo(x+4, y);
                ctx.lineTo(x+8, y);
                ctx.stroke();
            }
        }
        
        const drawEven = (x) => {
            for (let y = 0; y < HEIGHT; y += 8) {
                ctx.beginPath();
                ctx.moveTo(x+4, y);
                ctx.lineTo(x+4, y+4);
                ctx.stroke();
            }
        }
        
        const drawOdd = (x) => {
            for (let y = 0; y < HEIGHT; y += 8) {
                ctx.beginPath();
                ctx.moveTo(x+4, y+4);
                ctx.lineTo(x+4, y+8);
                ctx.stroke();
            }
        }
        
        const vowels = ["a", "e", "i", "o", "u"];
        
        const msg = args[0];
        const key = args[1];

        const keyArray = Array.from(String(key), Number);
        
        const WIDTH = 1 + 4 * keyArray.length;
        const HEIGHT = 1 + 4 * msg.length;
        
        const canvas = createCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d");
        
        ctx.imageSmoothingEnabled = false;
        
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        ctx.translate(0.5, 0.5);
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#DDDDDD";
        
        [...msg].forEach((letter, index) => {;
            const y = index * 4;
            if (vowels.includes(letter)) {
                drawVowel(y);
            } else {
                drawConsonant(y);
            }
        });
        
        if (key !== undefined) {
            keyArray.forEach((num, index) => {
                const x = index * 4;
                if (num % 2 === 0) {
                    drawEven(x);
                } else {
                    drawOdd(x);
                }
            });   
        }
        
        const attachment = new MessageAttachment(canvas.toBuffer(),'hitomezashi.png'); 
 
        message.channel.send(attachment);
    }
}
