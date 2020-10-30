document.addEventListener("DOMContentLoaded", () => {
  const space = document.querySelector(".space");
  const spacecraft = document.createElement("div");
  let spacecraftLeftSpace = 50;
  let startPoint = 150;
  let spacecraftBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimeId;
  let rightTimeId;
  let score = 0;
  function createSpaceCraft() {
    space.appendChild(spacecraft);
    spacecraft.classList.add("spacecraft");
    spacecraftLeftSpace = platforms[0].left;
    spacecraft.style.left = spacecraftLeftSpace + "px";
    spacecraft.style.bottom = spacecraftBottomSpace + "px";
  }
  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");
      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      space.appendChild(visual);
    }
  }
  function createPlatform() {
    for (i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
    if (spacecraftBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";
        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          score++;
          playerScore();
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
    }
  }
  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      spacecraftBottomSpace += 20;
      spacecraft.style.bottom = spacecraftBottomSpace + "px";
      if (spacecraftBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }
  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      spacecraftBottomSpace -= 5;
      spacecraft.style.bottom = spacecraftBottomSpace + "px";
      if (spacecraftBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          spacecraftBottomSpace >= platform.bottom &&
          spacecraftBottomSpace <= platform.bottom + 15 &&
          spacecraftLeftSpace + 60 >= platform.left &&
          spacecraftLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          console.log("Landed");
          startPoint = spacecraftBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  function gameOver() {
    console.log("Game Over");
    isGameOver = true;
    while (space.firstChild) {
      space.removeChild(space.firstChild);
    }
    
    space.innerHTML = score;
    document.querySelector(".space").innerHTML = "Your Score is " + score + " <br> Refresh the page to Restart the game"
    
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimeId);
    clearInterval(rightTimeId);
  }
  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }
  
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimeId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimeId = setInterval(function () {
      if (spacecraftLeftSpace >= 0) {
        spacecraftLeftSpace -= 5;
        spacecraft.style.left = spacecraftLeftSpace + "px";
      } else moveRight();
    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimeId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimeId = setInterval(function () {
      if (spacecraftLeftSpace <= 340) {
        spacecraftLeftSpace += 5;
        spacecraft.style.left = spacecraftLeftSpace + "px";
      }
    }, 30);
  }

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(rightTimeId);
    clearInterval(leftTimeId);
  }

  function start() {
    if (!isGameOver) {
      createPlatform();
      createSpaceCraft();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener("keyup", control);
    }
  }
  //attach a start button
  start();
  function playerScore() {
    
    const playerScore = "Your Score is" + score++;
    const displayScore = document.querySelector(".score");
    
  }
});
