export function makeItRain() {
  const rainFront = document.querySelector(".rain.front-row")
  const rainBack = document.querySelector(".rain.back-row")
  const body = document.querySelector("body")
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += 
      `<div class="drop" style="left: ${increment} %; bottom: ${(randoFiver + randoFiver - 1 + 100)} %; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
        <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
        <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
      </div>`
      backDrops += `<div class="drop" style="right:${increment}%; bottom: ${(randoFiver + randoFiver - 1 + 100)}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
        <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-delay: 0.${randoHundo}s;"></div>
        <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-delay: 0.${randoHundo}s;"></div>
      </div>`
    }




    if (document.body.clientWidth	 > 640) {
      //startSplats(body, rainFront, drops) // всплески не доделаны еще
      startHeavyRain(body, rainBack, backDrops); // нужно эти два пункта выбирать в завивмости от погоды
    }
    rainFront.insertAdjacentHTML('beforeend', drops)

  }
// не пойму работают ли оба дождя или нет? вроде робят  



function startHeavyRain(body, rainBack, backDrops) {
  body.className += 'back-row-toggle '
  rainBack.insertAdjacentHTML('beforeend', backDrops)
}

function stopHeavyRain(body, rainBack) {
  body.className -= ' back-row-toggle '
  rainBack.innerHTML = ' '
}


function startSplats(body, rainFront, drops) {
  body.className += ' splat-toggle '
}

function stopSplats(body) {
  body.className -= ' splat-toggle '
}