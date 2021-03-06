// Setup initial game stats
let score = 0;
let lives = 2;
let pellets = 4;
let dots = 240;
let ghostsEaten = 0;
let level = 1;
let item = 'Cherry';
let rand_num = -1;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
}

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
}

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
}

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
}
// replace this comment with your four ghosts setup as objects
const ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}             Lives: ${lives}`);
  console.log(`Level: ${level}`);
  console.log(`Power-Pellets: ${pellets}     Dots: ${dots}`)
}

function displayMenu() {
  rand_num = Math.floor(Math.random() * 25);
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots > 0) {
    console.log('(d) Eat Dot');
  }
  if (dots > 9) {
    console.log('(f) Eat Ten Dots');
  }
  if (dots > 99) {
    console.log('(g) Eat One Hundred Dots');
  }
  if (pellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  if (rand_num == 9) {
    console.log(`(j) Eat ${item}`);
  }
  ghosts.forEach(function(ghost) {
    if (ghost['edible']) {
      can_eat = '(edible)'
    } else {
      can_eat = '(inedible)'
    }
    console.log(`(${ghost['menu_option']}) Eat ${ghost['name']} ${can_eat}`)
  })
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  dots -= 1;
  levelCheck();
  score += 10;
}

function eatTenDot() {
  console.log('\nCHOMP!');
  dots -= 10;
  levelCheck();
  score += 100;
}

function eatHundredDot() {
  console.log('\nCHOMP!!!!!');
  dots -= 100;
  levelCheck();
  score += 1000;
}

function levelCheck() {
  if (dots == 0 && pellets == 0) {
    if (level < 256) {
      level += 1;
      dots = 240
      pellets = 4;
      ghosts.forEach(function(ghost) {
        ghost['edible'] = false;
      })
    }
    if (level == 2) {
      item = 'Strawberry';
    } else if (level == 3) {
      item = 'Orange';
    } else if (level == 5) {
      item = 'Apple';
    } else if (level == 7) {
      item = 'Pineapple';
    } else if (level == 9) {
      item = 'Galaxian Spaceship';
    } else if (level == 11) {
      item = 'Bell';
    } else if (level == 13) {
      item = 'Key';
    }
  }
}

function eatGhost(ghost) {
  if (ghost['edible']) {
    if (ghostsEaten < 4) {
      ghostsEaten += 1;
    }
    score += (2**ghostsEaten * 100);
    ghost['edible'] = false;
    console.log(`\nOh damn Pac-Man just ate ${ghost['name']}!`);
  } else {
    lives -= 1;
    console.log(`\n${ghost['name']} devoured Pac-Man`);
    checkLives();
  }
}

function eatPowerPellet() {
  ghosts.forEach(function(ghost) {
    ghost['edible'] = true;
  })
  pellets -= 1;
  console.log('\nTasty!');
  score += 50;
}

function eatItem() {
  switch(item) {
    case 'Cherry':
      score += 100;
      console.log('\nThat was a tasty cherry!')
      break;
    case 'Strawberry':
      score += 300;
      console.log('\nThat was a tasty strawberry!')
      break;
    case 'Orange':
      score += 500;
      console.log('\nThat was a tasty orange!')
      break;
    case 'Apple':
      score += 700;
      console.log('\nThat was a tasty apple!')
      break;
    case 'Pineapple':
      score += 1000;
      console.log('\nThat was a tasty pineapple!')
      break;
    case 'Galaxian Spaceship':
      score += 2000;
      console.log('\nWhoa was that a spaceship?!')
      break;
    case 'Bell':
      score += 3000;
      console.log('\nCool, a fancy bell!')
      break;
    case 'Key':
      score += 5000;
      console.log('\nThat key sure is worth a lot of points!')
      break;
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      if (dots > 0) {
        eatDot();
        break;
      } else {
        console.log('\nNo more dots!');
        break;
      }
    case 'f':
      if (dots > 9) {
        eatTenDot();
        break;
      } else {
        console.log('\nNot enough dots!');
        break;
      }
    case 'g':
      if (dots > 99) {
        eatHundredDot();
        break;
      } else {
        console.log('\nNot enough dots!');
        break;
      }
    case 'p':
      if (pellets > 0) {
        eatPowerPellet();
        break;
      } else {
        console.log('\nNo more power pellets!');
        break;
      }
    case 'j':
      if (rand_num == 9) {
        eatItem();
        break;
      } else {
        console.log('\nNo extras to take!');
        break;
      }
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function checkLives() {
  if (lives == 0) {
    process.exit();
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
