const { createCanvas } = require("canvas");
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'hitomezashi',
    description: "Generates a hitomezashi stitching pattern from a given text and key.",
    usage: "<letters> <numbers>",
    category: "Fun",

    execute(message, args) {
        const drawConsonant = (y) => {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(WIDTH, y);
            ctx.stroke();
        }
        
        const drawVowel = (y) => {
            ctx.beginPath();
            ctx.moveTo(LINE_LENGTH, y);
            ctx.lineTo(WIDTH, y);
            ctx.stroke();
        }
        
        const drawEven = (x) => {
            ctx.beginPath();
            ctx.moveTo(x + LINE_LENGTH, 0);
            ctx.lineTo(x + LINE_LENGTH, HEIGHT);
            ctx.stroke();
        }
        
        const drawOdd = (x) => {
            ctx.beginPath();
            ctx.moveTo(x + LINE_LENGTH, LINE_LENGTH);
            ctx.lineTo(x + LINE_LENGTH, HEIGHT);
            ctx.stroke();
        }

        const LINE_LENGTH = 5;
        
        const vowels = ["a", "e", "i", "o", "u"];
        
        const msg = args[0];
        const key = args[1];

        const keyArray = Array.from(String(key), Number);
        
        const WIDTH = 1 + LINE_LENGTH * keyArray.length;
        const HEIGHT = LINE_LENGTH * msg.length;
        
        const canvas = createCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d");
        
        ctx.imageSmoothingEnabled = false;
        
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        ctx.translate(0.5, 0.5);
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#DDDDDD";
        ctx.setLineDash([LINE_LENGTH, LINE_LENGTH]);
        
        [...msg].forEach((letter, index) => {;
            const y = index * LINE_LENGTH;
            if (vowels.includes(letter)) {
                drawVowel(y);
            } else {
                drawConsonant(y);
            }
        });
        
        if (key !== undefined) {
            keyArray.forEach((num, index) => {
                const x = index * LINE_LENGTH;
                if (num % 2 === 0) {
                    drawEven(x);
                } else {
                    drawOdd(x);
                }
            });   
        }
        
        const attachment = new MessageAttachment(canvas.toBuffer(),'hitomezashi.png'); 
 
        message.channel.send({ files: [attachment] });
    }
}
