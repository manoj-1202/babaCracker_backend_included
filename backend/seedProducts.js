const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); 

dotenv.config();

const productData = [
  {
    id: 1,
    category: "7CM SPARKLERS",
    name: "7CM Electric Sparklers",
    actualPrice: 24,
    ourPrice: 10,
    per: "Box (10 Pcs)"
  },
  {
    id: 2,
    category: "7CM SPARKLERS",
    name: "7CM Crackling Sparklers",
    actualPrice: 32,
    ourPrice: 13,
    per: "Box (10 Pcs)"
  },
  {
    id: 3,
    category: "7CM SPARKLERS",
    name: "7CM Green Sparklers",
    actualPrice: 36,
    ourPrice: 14,
     per: "Box (10 Pcs)"
  },
  {
    id: 4,
    category: "7CM SPARKLERS",
    name: "7CM Red Sparklers",
    actualPrice: 40,
    ourPrice: 16,
    per: "Box (10 Pcs)"
  },
  {
    id: 5,
    category: "10CM SPARKLERS",
    name: "10CM Electric Sparklers",
    actualPrice: 40,
    ourPrice: 16,
    per: "Box (10 Pcs)"
  },
  {
    id: 6,
    category: "10CM SPARKLERS",
    name: "10CM Crackling Sparklers",
    actualPrice: 50,
    ourPrice: 20,
    per: "Box (10 Pcs)"
  },
  {
    id: 7,
    category: "10CM SPARKLERS",
    name: "10CM Green Sparklers",
    actualPrice: 60,
    ourPrice: 24,
    per: "Box (10 Pcs)"
  },
  {
    id: 8,
    category: "10CM SPARKLERS",
    name: "10CM Red Sparklers",
    actualPrice: 65,
    ourPrice: 26,
    per: "Box (10 Pcs)"
  },
  {
    id: 9,
    category: "15CM SPARKLERS",
    name: "15CM Electric Sparklers",
    actualPrice: 110,
    ourPrice: 44,
    per: "Box (10 Pcs)"
  },
  {
    id: 10,
    category: "15CM SPARKLERS",
    name: "15CM Crackling Sparklers",
    actualPrice: 120,
    ourPrice: 48,
    per: "Box (10 Pcs)"
  },
  {
    id: 11,
    category: "15CM SPARKLERS",
    name: "15CM Green Sparklers",
    actualPrice: 140,
    ourPrice: 56,
    per: "Box (10 Pcs)"
  },
  {
    id: 12,
    category: "15CM SPARKLERS",
    name: "15CM Red Sparklers",
    actualPrice: 155,
    ourPrice: 62,
    per: "Box (10 Pcs)"
  },
  {
    id: 13,
    category: "30CM SPARKLERS",
    name: "30CM Electric Sparklers",
    actualPrice: 110,
    ourPrice: 44,
    per: "Box (5 Pcs)"
  },
  {
    id: 14,
    category: "30CM SPARKLERS",
    name: "30CM Crackling Sparklers",
    actualPrice: 120,
    ourPrice: 48,
    per: "Box (5 Pcs)"
  },
  {
    id: 15,
    category: "30CM SPARKLERS",
    name: "30CM Green Sparklers",
    actualPrice: 140,
    ourPrice: 56,
    per: "Box (5 Pcs)"
  },
  {
    id: 16,
    category: "30CM SPARKLERS",
    name: "30CM Red Sparklers",
    actualPrice: 155,
    ourPrice: 62,
    per: "Box (5 Pcs)"
  },
  {
    id: 17,
    category: "50CM SPARKLERS",
    name: "50CM Electric Sparklers",
    actualPrice: 450,
    ourPrice: 180,
    per: "Box (5 Pcs)"
  },
  {
    id: 18,
    category: "50CM SPARKLERS",
    name: "50CM Color Sparklers",
    actualPrice: 500,
    ourPrice: 200,
    per: "Box (5 Pcs)"
  },
  {
    id: 19,
    category: "50CM SPARKLERS",
    name: "50CM 5IN1 Sparklers",
    actualPrice: 550,
    ourPrice: 220,
    per: "Box (5 Pcs)"
  },
  {
    id: 20,
    category: "50CM SPARKLERS",
    name: "Golden Rotating Sparklers",
    actualPrice: 550,
    ourPrice: 220,
    per: "Box (1 Pcs)"
  },
  {
    id: 21,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Small",
    actualPrice: 130,
    ourPrice: 70,
    per: "Box (10 Pcs)"
  },
  {
    id: 22,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Big",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 23,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Special",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (10 Pcs)"
  },
  {
    id: 24,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Asoka",
    actualPrice: 280,
    ourPrice: 112,
    per: "Box (10 Pcs)"
  },
  {
    id: 25,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Giant",
    actualPrice: 300,
    ourPrice: 120,
    per: "Box (10 Pcs)"
  },
  {
    id: 26,
    category: "FLORAL FLOWER POTS",
    name: "Flower Pot Delux",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 27,
    category: "FLORAL FLOWER POTS",
    name: "Colour Koti",
    actualPrice: 460,
    ourPrice: 184,
    per: "Box (10 Pcs)"
  },
  {
    id: 28,
    category: "FLORAL FLOWER POTS",
    name: "Colour Koti Delux",
    actualPrice: 600,
    ourPrice: 240,
    per: "Box (10 Pcs)"
  },
  {
    id: 29,
    category: "GROUND CHAKKAR",
    name: "Ground Chakaram Big",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (10 Pcs)"
  },
  {
    id: 30,
    category: "GROUND CHAKKAR",
    name: "Ground Chakaram Special",
    actualPrice: 160,
    ourPrice: 64,
    per: "Box (10 Pcs)"
  },
  {
    id: 31,
    category: "GROUND CHAKKAR",
    name: "Ground Chakaram Delux",
    actualPrice: 280,
    ourPrice: 112,
    per: "Box (10 Pcs)"
  },
  {
    id: 32,
    category: "GROUND CHAKKAR",
    name: "Wire Chakkar",
    actualPrice: 350,
    ourPrice: 140,
    per: "Box (10 Pcs)"
  },
  {
    id: 33,
    category: "GROUND CHAKKAR",
    name: "4X4 Wheel",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (5 Pcs)"
  },
  {
    id: 34,
    category: "GROUND CHAKKAR",
    name: "Whistling Wheel",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 35,
    category: "GROUND CHAKKAR",
    name: "Disco Wheel",
    actualPrice: 130,
    ourPrice: 52,
    per: "Box (5 Pcs)"
  },
  {
    id: 36,
    category: "GROUND CHAKKAR",
    name: "Classic Wheel",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 37,
    category: "HAND TWINKLING STARS",
    name: "1 1/2 Twinkling Star",
    actualPrice: 70,
    ourPrice: 28,
    per: "Box (10 Pcs)"
  },
  {
    id: 38,
    category: "HAND TWINKLING STARS",
    name: "4 Twinkling Star",
    actualPrice: 180,
    ourPrice: 72,
    per: "Box (10 Pcs)"
  },
  {
    id: 39,
    category: "HAND LIGHTING STARS PENCIL",
    name: "Candy Crush Pencil",
    actualPrice: 120,
    ourPrice: 48,
    per: "Box (3 Pcs)"
  },
  {
    id: 40,
    category: "HAND LIGHTING STARS PENCIL",
    name: "Navrang Pencil",
    actualPrice: 340,
    ourPrice: 136,
    per: "Box (5 Pcs)"
  },
  {
    id: 41,
    category: "HAND LIGHTING STARS PENCIL",
    name: "Lamba Lamba",
    actualPrice: 800,
    ourPrice: 320,
    per: "Box (2 Pcs)"
  },
  {
    id: 42,
    category: "TIME PASS BIJILI",
    name: "Red Bijil (50Pcs)",
    actualPrice: 40,
    ourPrice: 16,
    per: "Bag (50 Pcs)"
  },
  {
    id: 43,
    category: "TIME PASS BIJILI",
    name: "Red Bijili (100Pcs)",
    actualPrice: 80,
    ourPrice: 32,
    per: "Bag (100 Pcs)"
  },
  {
    id: 44,
    category: "TIME PASS BIJILI",
    name: "Stripped Bijili (100Pcs)",
    actualPrice: 100,
    ourPrice: 40,
    per: "Bag (100 Pcs)"
  },
  {
    id: 45,
    category: "ONE SOUND CRACKERS",
    name: "2.75\" Kuruvi",
    actualPrice: 22,
    ourPrice: 8,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 46,
    category: "ONE SOUND CRACKERS",
    name: "3.5\" Lakshmi / Parrot",
    actualPrice: 40,
    ourPrice: 18,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 47,
    category: "ONE SOUND CRACKERS",
    name: "4\" Lakshmi",
    actualPrice: 60,
    ourPrice: 25,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 48,
    category: "ONE SOUND CRACKERS",
    name: "4\" Lakshmi Super Delux",
    actualPrice: 90,
    ourPrice: 36,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 49,
    category: "ONE SOUND CRACKERS",
    name: "4\" Gold Lakshmi",
    actualPrice: 80,
    ourPrice: 32,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 50,
    category: "ONE SOUND CRACKERS",
    name: "5\" Mega Delux",
    actualPrice: 100,
    ourPrice: 40,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 51,
    category: "ONE SOUND CRACKERS",
    name: "6\" Mega Delux",
    actualPrice: 120,
    ourPrice: 48,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 52,
    category: "ONE SOUND CRACKERS",
    name: "2 Sound Crackers",
    actualPrice: 100,
    ourPrice: 40,
    per: "Pkt (5 Pcs)"
  },
  {
    id: 53,
    category: "REPEATING BIJILIS CRACKERS",
    name: "100 WATTS",
    actualPrice: 90,
    ourPrice: 36,
    per: "Box (1 Pcs)"
  },
  {
    id: 54,
    category: "REPEATING BIJILIS CRACKERS",
    name: "1000 WATTS (short)",
    actualPrice: 450,
    ourPrice: 180,
    per: "Box (1 Pcs)"
  },
  {
    id: 55,
    category: "REPEATING BIJILIS CRACKERS",
    name: "2000 WATTS (short)",
    actualPrice: 900,
    ourPrice: 360,
    per: "Box (1 Pcs)"
  },
  {
    id: 56,
    category: "REPEATING BIJILIS CRACKERS",
    name: "5000 WATTS (short)",
    actualPrice: 2400,
    ourPrice: 960,
    per: "Box (1 Pcs)"
  },
  {
    id: 57,
    category: "REPEATING BIJILIS CRACKERS",
    name: "10000 WATTS (short)",
    actualPrice: 4400,
    ourPrice: 1760,
    per: "Box (1 Pcs)"
  },
  {
    id: 58,
    category: "DIGITAL WALA",
    name: "SHIN CHAN 5IN1",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 59,
    category: "DIGITAL WALA",
    name: "90 WATTS CRACKLIN",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (3 Pcs)"
  },
  {
    id: 60,
    category: "DIGITAL WALA",
    name: "MAGIC WHIP 1K",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (1 Pcs)"
  },
  {
    id: 61,
    category: "BOMB",
    name: "Bullet Bomb",
    actualPrice: 80,
    ourPrice: 32,
    per: "Box (10 Pcs)"
  },
  {
    id: 62,
    category: "BOMB",
    name: "Hydro Bomb",
    actualPrice: 150,
    ourPrice: 60,
    per: "Box (10 Pcs)"
  },
  {
    id: 63,
    category: "BOMB",
    name: "King Of King",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 64,
    category: "BOMB",
    name: "Classic Bomb",
    actualPrice: 260,
    ourPrice: 104,
    per: "Box (10 Pcs)"
  },
  {
    id: 65,
    category: "BOMB",
    name: "Dinosaur Bomb",
    actualPrice: 450,
    ourPrice: 180,
    per: "Box (10 Pcs)"
  },
  {
    id: 66,
    category: "BOMB",
    name: "Agni Bomb",
    actualPrice: 500,
    ourPrice: 200,
    per: "Box (10 Pcs)"
  },
  {
    id: 67,
    category: "BOMB",
    name: "Digital Bomb",
    actualPrice: 600,
    ourPrice: 240,
    per: "Box (10 Pcs)"
  },
  {
    id: 68,
    category: "PAPER BOMB",
    name: "1/4 KG Paper Bomb",
    actualPrice: 130,
    ourPrice: 52,
    per: "Box (1 Pcs)"
  },
  {
    id: 69,
    category: "PAPER BOMB",
    name: "1/2 KG Paper Bomb",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 70,
    category: "PAPER BOMB",
    name: "1KG Paper Bomb",
    actualPrice: 480,
    ourPrice: 192,
    per: "Box (1 Pcs)"
  },
  {
    id: 71,
    category: "PAPER BOMB",
    name: "Veeran 1",
    actualPrice: 650,
    ourPrice: 260,
    per: "Box (10 Pcs)"
  },
  {
    id: 72,
    category: "PAPER BOMB",
    name: "Veeran 2",
    actualPrice: 850,
    ourPrice: 340,
    per: "Box (10 Pcs)"
  },
  {
    id: 73,
    category: "PAPER BOMB",
    name: "HACKER BOMB",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 74,
    category: "FANCY ROCKETS",
    name: "Rocket Bomb",
    actualPrice: 150,
    ourPrice: 60,
    per: "Box (10 Pcs)"
  },
  {
    id: 75,
    category: "FANCY ROCKETS",
    name: "Lunic Rocket Expree",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (10 Pcs)"
  },
  {
    id: 76,
    category: "FANCY ROCKETS",
    name: "Whistling Rocket",
    actualPrice: 450,
    ourPrice: 180,
    per: "Box (5 Pcs)"
  },
  {
    id: 77,
    category: "FANCY ROCKETS",
    name: "3 Sound Rocket",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 78,
    category: "PEACOCK DANCE",
    name: "Magical Peacock",
    actualPrice: 350,
    ourPrice: 140,
    per: "Box (1 Pcs)"
  },
  {
    id: 79,
    category: "PEACOCK DANCE",
    name: "Peacock Special",
    actualPrice: 450,
    ourPrice: 180,
    per: "Box (1 Pcs)"
  },
  {
    id: 80,
    category: "PEACOCK DANCE",
    name: "Bada Peacock",
    actualPrice: 1000,
    ourPrice: 400,
    per: "Box (1 Pcs)"
  },
  {
    id: 81,
    category: "PEACOCK DANCE",
    name: "Peacock Feather",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 82,
    category: "KIDS SPECIAL",
    name: "Money in Bank",
    actualPrice: 150,
    ourPrice: 60,
    per: "Box (1 Pcs)"
  },
  {
    id: 83,
    category: "KIDS SPECIAL",
    name: "Magic Butterfly",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 84,
    category: "KIDS SPECIAL",
    name: "Helicopter- Fly in Sky",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 85,
    category: "KIDS SPECIAL",
    name: "Drone Nights",
    actualPrice: 350,
    ourPrice: 140,
    per: "Box (10 Pcs)"
  },
  {
    id: 86,
    category: "KIDS SPECIAL",
    name: "Bambaram Speed max",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (10 Pcs)"
  },
  {
    id: 87,
    category: "KIDS SPECIAL",
    name: "Photo Flash",
    actualPrice: 125,
    ourPrice: 50,
    per: "Box (5 Pcs)"
  },
  {
    id: 88,
    category: "KIDS SPECIAL",
    name: "Rainbom Color Smoke",
    actualPrice: 420,
    ourPrice: 168,
    per: "Box (3 Pcs)"
  },
  {
    id: 89,
    category: "KIDS SPECIAL",
    name: "Golden Flower",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 90,
    category: "KIDS SPECIAL",
    name: "Kit Kat / Chit Put",
    actualPrice: 80,
    ourPrice: 32,
    per: "Box (10 Pcs)"
  },
  {
    id: 91,
    category: "KIDS SPECIAL",
    name: "Magic Pops",
    actualPrice: 26,
    ourPrice: 10,
    per: "Box (10 Pcs)"
  },
  {
    id: 92,
    category: "KIDS SPECIAL",
    name: "Electric Stone",
    actualPrice: 30,
    ourPrice: 12,
    per: "Box (10 Pcs)"
  },
  {
    id: 93,
    category: "KIDS SPECIAL",
    name: "Zee Boom Baa",
    actualPrice: 25,
    ourPrice: 10,
    per: "Box (10 Pcs)"
  },
  {
    id: 94,
    category: "KIDS SPECIAL",
    name: "Selfie Stick",
    actualPrice: 120,
    ourPrice: 48,
    per: "Box (3 Pcs)"
  },
  {
    id: 95,
    category: "KIDS SPECIAL",
    name: "Cartoon Special",
    actualPrice: 60,
    ourPrice: 24,
    per: "Box (5 Pcs)"
  },
  {
    id: 96,
    category: "KIDS SPECIAL",
    name: "Old is Gold",
    actualPrice: 240,
    ourPrice: 96,
    per: "Box (10 Pcs)"
  },
  {
    id: 97,
    category: "KIDS SPECIAL",
    name: "Sword Crackling",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (10 Pcs)"
  },
  {
    id: 98,
    category: "KIDS SPECIAL",
    name: "BAT",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (10 Pcs)"
  },
  {
    id: 99,
    category: "KIDS SPECIAL",
    name: "Snake Cartoon",
    actualPrice: 40,
    ourPrice: 16,
    per: "Box (10 Pcs)"
  },
  {
    id: 100,
    category: "KIDS SPECIAL",
    name: "Snake Tablet",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (10 Pcs)"
  },
  {
    id: 101,
    category: "KIDS SPECIAL",
    name: "Sky Shot Crackling",
    actualPrice: 40,
    ourPrice: 16,
    per: "Box (1 Pcs)"
  },
  {
    id: 102,
    category: "FOUNTAIN",
    name: "Robo Dance",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 103,
    category: "FOUNTAIN",
    name: "Sun Light",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 104,
    category: "FOUNTAIN",
    name: "Star Light",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 105,
    category: "FOUNTAIN",
    name: "Moon Light",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 106,
    category: "FOUNTAIN",
    name: "Hero series",
    actualPrice: 120,
    ourPrice: 48,
    per: "Box (2 Pcs)"
  },
  {
    id: 107,
    category: "FOUNTAIN",
    name: "Magical siren",
    actualPrice: 380,
    ourPrice: 152,
    per: "Box (3 Pcs)"
  },
  {
    id: 108,
    category: "FOUNTAIN",
    name: "Water Queen",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (1 Pcs)"
  },
  {
    id: 109,
    category: "FOUNTAIN",
    name: "King Star Crackling Mothers",
    actualPrice: 550,
    ourPrice: 220,
    per: "Box (3 Pcs)"
  },
  {
    id: 110,
    category: "FOUNTAIN",
    name: "Cocunet Crackling Balaji",
    actualPrice: 1300,
    ourPrice: 520,
    per: "Box (3 Pcs)"
  },
  {
    id: 111,
    category: "FOUNTAIN",
    name: "5IN1 Fountain",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 112,
    category: "FOUNTAIN",
    name: "Asrafi Pops",
    actualPrice: 200,
    ourPrice: 80,
    per: "Box (5 Pcs)"
  },
  {
    id: 113,
    category: "TIN BEER",
    name: "Red Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 114,
    category: "TIN BEER",
    name: "Green Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 115,
    category: "TIN BEER",
    name: "Gold Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 116,
    category: "TIN BEER",
    name: "Silver Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 117,
    category: "TIN BEER",
    name: "Red & Green Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (1 Pcs)"
  },
  {
    id: 118,
    category: "CHOTA FANCY",
    name: "Captain America",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 119,
    category: "CHOTA FANCY",
    name: "Hulh",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 120,
    category: "CHOTA FANCY",
    name: "Avengers",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 121,
    category: "CHOTA FANCY",
    name: "Iron Man",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 122,
    category: "CHOTA FANCY",
    name: "Jack pot",
    actualPrice: 100,
    ourPrice: 40,
    per: "Box (1 Pcs)"
  },
  {
    id: 123,
    category: "SKY WONDERS - SINGLE SHOTS",
    name: "2\" FANCY PIPES (4 variety)",
    actualPrice: 300,
    ourPrice: 120,
    per: "Box (1 Pcs)"
  },
  {
    id: 124,
    category: "SKY WONDERS - SINGLE SHOTS",
    name: "2.5\" FANCY PIPES (4 variety)",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (1 Pcs)"
  },
  {
    id: 125,
    category: "SKY WONDERS - SINGLE SHOTS",
    name: "2.5\" Trible Ball -3 Steps",
    actualPrice: 500,
    ourPrice: 200,
    per: "Box (1 Pcs)"
  },
  {
    id: 126,
    category: "SKY WONDERS - SINGLE SHOTS",
    name: "2\" 3pcs Pipe (4 variety)",
    actualPrice: 580,
    ourPrice: 232,
    per: "Box (1 Pcs)"
  },
  {
    id: 127,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.5\" Fancy Pipes (4 Variety)",
    actualPrice: 600,
    ourPrice: 240,
    per: "Box (1 Pcs)"
  },
  {
    id: 128,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.5\" Pink Pearl Special",
    actualPrice: 700,
    ourPrice: 280,
    per: "Box (1 Pcs)"
  },
  {
    id: 129,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.5\" Nayagara Special",
    actualPrice: 800,
    ourPrice: 320,
    per: "Box (1 Pcs)"
  },
  {
    id: 130,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.5\" 7 Steps 1=7",
    actualPrice: 750,
    ourPrice: 300,
    per: "Box (1 Pcs)"
  },
  {
    id: 131,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.\" Double Pack (2pcs)",
    actualPrice: 1400,
    ourPrice: 560,
    per: "Box (2 Pcs)"
  },
  {
    id: 132,
    category: "SKY WONDERS - 3.5\" FANCY",
    name: "3.5\" Double Ball",
    actualPrice: 950,
    ourPrice: 380,
    per: "Box (1 Pcs)"
  },
  {
    id: 133,
    category: "SKY WONDERS - 4\" FANCY",
    name: "4\" Fancy Pipes (4 Variety)",
    actualPrice: 900,
    ourPrice: 360,
    per: "Box (1 Pcs)"
  },
  {
    id: 134,
    category: "SKY WONDERS - 4\" FANCY",
    name: "4\" Double Ball",
    actualPrice: 1200,
    ourPrice: 480,
    per: "Box (1 Pcs)"
  },
  {
    id: 135,
    category: "SKY WONDERS - 4\" FANCY",
    name: "4\" Nayagara Special",
    actualPrice: 1000,
    ourPrice: 400,
    per: "Box (1 Pcs)"
  },
  {
    id: 136,
    category: "SKY WONDERS - 4\" FANCY",
    name: "4\" 12 Steps",
    actualPrice: 1000,
    ourPrice: 400,
    per: "Box (1 Pcs)"
  },
  {
    id: 137,
    category: "SKY WONDERS - 4\" FANCY",
    name: "4\" Double Pack (2 Pcs)",
    actualPrice: 1750,
    ourPrice: 700,
    per: "Box (2 Pcs)"
  },
  {
    id: 138,
    category: "SKY WONDERS - 6\" BADA FANCY",
    name: "6\" Fancy Pipe",
    actualPrice: 2000,
    ourPrice: 800,
    per: "Box (1 Pcs)"
  },
  {
    id: 139,
    category: "MULTI SKY THUNDERS - BUDGET",
    name: "30 Shot Muticolor",
    actualPrice: 900,
    ourPrice: 360,
    per: "Box (1 Pcs)"
  },
  {
    id: 140,
    category: "MULTI SKY THUNDERS - BUDGET",
    name: "60 Shot Muticolor",
    actualPrice: 1800,
    ourPrice: 720,
    per: "Box (1 Pcs)"
  },
  {
    id: 141,
    category: "MULTI SKY THUNDERS - BUDGET",
    name: "120 Shot Muticolor",
    actualPrice: 2700,
    ourPrice: 1080,
    per: "Box (1 Pcs)"
  },
  {
    id: 142,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "7 Shot Color",
    actualPrice: 250,
    ourPrice: 100,
    per: "Box (5 Pcs)"
  },
  {
    id: 143,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "12 Shot Rider",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (1 Pcs)"
  },
  {
    id: 144,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "15 Shot Multicolor",
    actualPrice: 700,
    ourPrice: 280,
    per: "Box (1 Pcs)"
  },
  {
    id: 145,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "25 Shot Rider",
    actualPrice: 500,
    ourPrice: 200,
    per: "Box (1 Pcs)"
  },
  {
    id: 146,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "30 Shot Muticolor",
    actualPrice: 1100,
    ourPrice: 440,
    per: "Box (1 Pcs)"
  },
  {
    id: 147,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "60 Shot Muticolor",
    actualPrice: 2200,
    ourPrice: 880,
    per: "Box (1 Pcs)"
  },
  {
    id: 148,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "120 Shot Muticolor",
    actualPrice: 4400,
    ourPrice: 1760,
    per: "Box (1 Pcs)"
  },
  {
    id: 149,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "240 Shot Muticolor",
    actualPrice: 8000,
    ourPrice: 3200,
    per: "Box (1 Pcs)"
  },
  {
    id: 150,
    category: "NEW ARRIVAL -2025",
    name: "Lemon Tree Ayyan",
    actualPrice: 400,
    ourPrice: 160,
    per: "Box (1 Pcs)"
  },
  {
    id: 151,
    category: "NEW ARRIVAL -2025",
    name: "Tricolor Fountain",
    actualPrice: 600,
    ourPrice: 240,
    per: "Box (3 Pcs)"
  },
  {
    id: 152,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "Gun + Rollcap",
    actualPrice: 0,
    ourPrice: 150,
    per: "Box (1 Pcs)"
  },
  {
    id: 153,
    category: "MULTI SKY THUNDERS - PREMIUM",
    name: "Gun + Ring cap",
    actualPrice: 0,
    ourPrice: 200,
    per: "Box (1 Pcs)"
  },
  {
    id: 154,
    category: "GIFT BOX BRANDED",
    name: "Gift box 21 ITEMS",
    actualPrice: 0,
    ourPrice: 400,
    per: "Box"
  },
  {
    id: 155,
    category: "GIFT BOX BRANDED",
    name: "Gift box 27 ITEMS",
    actualPrice: 0,
    ourPrice: 600,
    per: "Box"
  },
  {
    id: 156,
    category: "GIFT BOX BRANDED",
    name: "Gift box 37 ITEMS",
    actualPrice: 0,
    ourPrice: 800,
    per: "Box"
  },
  {
    id: 157,
    category: "GIFT BOX BRANDED",
    name: "Gift box 45 ITEMS",
    actualPrice: 0,
    ourPrice: 1100,
    per: "Box"
  },
  {
    id: 158,
    category: "GIFT BOX BUDGET",
    name: "Gift box 25 ITEMS",
    actualPrice: 0,
    ourPrice: 400,
    per: "Box"
  },
  {
    id: 159,
    category: "GIFT BOX BUDGET",
    name: "Gift box 30 ITEMS",
    actualPrice: 0,
    ourPrice: 500,
    per: "Box"
  },
  {
    id: 160,
    category: "GIFT BOX BUDGET",
    name: "Gift box 35 ITEMS",
    actualPrice: 0,
    ourPrice: 600,
    per: "Box"
  },
  {
    id: 161,
    category: "GIFT BOX BUDGET",
    name: "Gift box 40 ITEMS",
    actualPrice: 0,
    ourPrice: 700,
    per: "Box"
  },
  {
    id: 162,
    category: "GIFT BOX BUDGET",
    name: "Gift box 50 ITEMS",
    actualPrice: 0,
    ourPrice: 1000,
    per: "Box"
  }
];

// Connect to MongoDB and seed products
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Optional: clear existing products before seeding
    await Product.deleteMany({});
    console.log('Existing products deleted');

    // Insert all products
    const productsToInsert = productData.map(({ id, ...rest }) => rest); 
    // Excluding 'id' if you want MongoDB to handle _id automatically

    const inserted = await Product.insertMany(productsToInsert);
    console.log(`${inserted.length} products inserted.`);

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB or seeding data:', err);
  });
