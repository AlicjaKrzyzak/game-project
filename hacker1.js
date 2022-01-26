let hacker = document.querySelector(".hacker");
let board = document.querySelector(".board");

window.addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(hacker).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    hacker.style.left = left - 10 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 460) {
    hacker.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    let movebullet = setInterval(() => {
      let rocks = document.getElementsByClassName("bitcoins");

      for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        if (rock != undefined) {
          let rockbound = rock.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();
          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); 
          }
        }
      }
      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }
      bullet.style.left = left + "px"; 
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

let generaterocks = setInterval(() => {
  let rock = document.createElement("div");
  rock.classList.add("bitcoins");
  let rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  rock.style.left = Math.floor(Math.random() * 450) + "px";
  board.appendChild(rock);
}, 1500);

let moverocks = setInterval(() => {
  let rocks = document.getElementsByClassName("bitcoins");
  if (rocks != undefined) {
    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i]; 
      let rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      if (rocktop >= 475) {
        alert("You lost all bitcoins. Start again.");
        clearInterval(moverocks);
        window.location.reload();
      }
      rock.style.top = rocktop + 10 + "px";
    }
  }
}, 450);