var Firebase = require("./firebase-node.js");

  var rootRef = new Firebase("http://localhost:9000/firepong")
  var gamestateRef = rootRef.child("gamestate");

  var velX = 8, velY = 3;
  var curX = 200, curY = 200;

  var localGamestate = null;

  gamestateRef.on("value", function(d) {
    localGamestate = d.val();
  });

  setInterval(function() {
    if(localGamestate !== null && localGamestate.paddle0 !== undefined && localGamestate.paddle1 !== undefined) {
      curX += velX;
      curY += velY;

      //first, check for collisions
      if(curX < 45) {
        curX = 45;
        velX = -velX;
      }

      if(curX > 435) {
        curX = 435;
        velX = -velX;
      }

      if(curY < 20) {
        curY = 20;
        velY = -velY;
      }

      if(curY > 460) {
        curY = 460;
        velY = -velY;
      }

      //next, update the ball position.
      gamestateRef.child("ball").set({x: curX, y: curY});
    }
  }, 50);
