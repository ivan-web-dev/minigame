let ship = {
  "item": document.querySelector(".minigame-ship"),
  "firstSizeWidth": 800,
  "firstSizeHeight": 620,
  "top": 52,
  "right": 750,
  "class": "minigame-ship",
  "sizeWidthNow": 0,
  "sizeHeightNow": 0,
  "topNow": 0,
  "rightNow": 0
};
let craneHeader = {
  "item": document.querySelector(".minigame-crane-header"),
  "firstSizeWidth": 612,
  "firstSizeHeight": 350,
  "top": 62,
  "right": 745,
  "class": "minigame-crane-header",
  "sizeWidthNow": 0,
  "sizeHeightNow": 0,
  "topNow": 0,
  "rightNow": 0
};
// let craneFooter = {
//   "item": document.querySelector(".minigame-crane-footer"),
//   "firstSizeWidth": 329,
//   "firstSizeHeight": 489,
//   "top": 194,
//   "right": 840,
//   "class": "minigame-crane-footer",
//   "sizeWidthNow": 0,
//   "sizeHeightNow": 0,
//   "topNow": 0,
//   "rightNow": 0
// };
let craneFront = {
    "item": document.querySelector(".crane-front"),
    "firstSizeWidth": 251,
    "firstSizeHeight": 350,
    "top": 254,
    "right": 887,
    "class": "crane-front",
    "sizeWidthNow": 0,
    "sizeHeightNow": 0,
    "topNow": 0,
    "rightNow": 0
};
let craneBack = {
  "item": document.querySelector(".crane-back"),
  "firstSizeWidth": 284,
  "firstSizeHeight": 491,
  "top": 194,
  "right": 852,
  "class": "crane-back",
  "sizeWidthNow": 0,
  "sizeHeightNow": 0,
  "topNow": 0,
  "rightNow": 0
};
let craneLeg = {
  "item": document.querySelector(".crane-leg"),
  "firstSizeWidth": 190,
  "firstSizeHeight": 151,
  "top": 453,
  "right": 986,
  "class": "crane-leg",
  "sizeWidthNow": 0,
  "sizeHeightNow": 0,
  "topNow": 0,
  "rightNow": 0
};
let car1 = {
  "item": document.querySelector(".minigame-car_1"),
  "firstSizeWidth": 139,
  "firstSizeHeight": 95,
  "top": 60,
  "right": 1520,
  "class": "minigame-car_1",
  "sizeWidthNow": 0,
  "sizeHeightNow": 0,
  "topNow": 0,
  "rightNow": 0
}
let objects = { // объект с объектами которые нужно адаптировать
  ship, craneHeader, craneFront, craneBack, craneLeg, car1 // craneFooter, 
};
let level = 1;
let gameRecord = 0;

function mainFunc(level, gameRecord) {
  function randomSpawnContainers() { // отвечает за рандомный цвет контейнеров
    let containers = document.querySelector(".minigame-containers-block"); // Получаем блок с контейнерами 
    let containerColors = ["red", "blue", "yellow"]; // Создаем список доступных цветов
    let containerQuantity = 8 + 1; // Количество созданных контейнеров

    for (let i = 1; i < containerQuantity; i++) { // Цикл до количества контейнеров
      let containerColorNow = Math.floor(Math.random() * 3); // Получаем рандомный индекс массива

      containerColorNow = containerColors[containerColorNow]; // Получаем цвет по индексу

      /* containers.innerHTML += `<div class="container-block container-block-${i}"><img src="./images/container-${containerColorNow}.png" class="minigame-container minigame-container-${i}" alt="" id="${i}"><div class="arrow"></div></div>`; // Создаем контейнер */
      containers.innerHTML += `<div class="container-block container-block-${i}" id="${i}"><img src="./images/container-${containerColorNow}.png" class="minigame-container minigame-container-${i}" alt="">
      <div class="arrow"></div></div>`;
    }
  } randomSpawnContainers();

  function calculateProperties(size) { // высчитывает значения для адаптации
    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  }

  function moveContainerForTrain(railwayAndTrainPosition, activeElements, styleBlock, usedElements, containers, dataObj, railwayAndTrainBlock, usedElementsObj) { // Анимация передвижения 
    // if (activeElements[0].classList.contains("minigame-container") && activeElements[1].classList.contains("minigame-railway-carriage")) { // проверка правильно ли выбраны элементы
    if (activeElements[0].classList.contains("container-block") && activeElements[1].classList.contains("minigame-railway-carriage")) { // проверка правильно ли выбраны элементы
      carriageCount = activeElements[1].getAttribute("count"); // получаем уровень заполнения перевозки
      let trainCount = railwayAndTrainBlock.getAttribute("count"); // получаем уровень заполнения всего поезда
      let craneBlock = document.querySelector(".crane-block"); // получаем блок с краном
      let rope = document.querySelector(".rope"); // получаем блок с веревкой
      let carriageID = activeElements[1].getAttribute("id"); // получаем ID перевозки
      let positionX; // итоговая позиция контейнера по X
      let positionY; // итоговая позиция контейнера по Y
      let craneBlockPosition; // позиция блока с краном
      let ropeAnim; // номер для анимации веревки
      //let trainBlock = document.querySelector(".minigame-train-block");
      let ship = document.querySelector(".minigame-ship_container");
      let shipCount = ship.getAttribute("containers");
      
      if (Number(shipCount) > 1) {
        ship.setAttribute("containers", Number(shipCount) - 1);
      } else {
        setTimeout(() => {
          ship.setAttribute("containers", Number(shipCount) - 1);
          
          ship.classList.add("ship-end");
          ship.classList.remove("ship-start");
        }, 6000);
      }
      
      if (carriageID == 1) { // если ID перевозки равен 1
        craneBlock.style.top = `${dataObj.cranePos1.craneStartPosY}px`; // подставляем крану высоту крану
        craneBlock.style.left = `${dataObj.cranePos1.craneStartPosX}px`; // подставляем значения крана по X
        
        craneBlock.setAttribute("crane-position", 1); // устанавливаем крану позицию
        craneBlockPosition = 1; // перезаписываем переменную с краном, подставляем ей значение крана 
      } else if (carriageID == 2) { // если ID перевозки равен 2
        craneBlock.setAttribute("crane-position", 2); // устанавливаем крану позицию
        craneBlockPosition = 2; // перезаписываем переменную с краном, подставляем ей значение крана 
        
        setTimeout(() => { // двигаем кран после n секунд
          craneBlock.style.top = `${dataObj.cranePos2.craneStartPosY}px`; // подставляем крану высоту крану
          craneBlock.style.left = `${dataObj.cranePos2.craneStartPosX}px`; // подставляем значения крана по X
        }, 2000);
        
        setTimeout(() => { // двигаем кран обратно после n секунд
          craneBlock.style.top = `${dataObj.cranePos1.craneStartPosY}px`; // подставляем крану высоту крану
          craneBlock.style.left = `${dataObj.cranePos1.craneStartPosX}px`; // подставляем значения крана по X
          
          craneBlockPosition = 1; // возвращаем первую позицию крану в переменную
          craneBlock.setAttribute("crane-position", 1); // возвращаем первую позицию крану 
        }, 9000);
      } else {
        craneBlock.setAttribute("crane-position", 3);
        craneBlockPosition = 3;
        
        setTimeout(() => {
          craneBlock.style.top = `${dataObj.cranePos3.craneStartPosY}px`;
          craneBlock.style.left = `${dataObj.cranePos3.craneStartPosX}px`;
        }, 2000);
        
        setTimeout(() => {
          craneBlock.style.top = `${dataObj.cranePos1.craneStartPosY}px`;
          craneBlock.style.left = `${dataObj.cranePos1.craneStartPosX}px`;
          
          craneBlockPosition = 1;
          craneBlock.setAttribute("crane-position", 1);
        }, 9000);
      };

      if (Number(carriageCount) == 0) { // если уровень заполнения перевозки равен 0
        positionX = activeElements[1].getAttribute("position-x"); // Получаем итоговую позицию для контейнера по X
        positionY = activeElements[1].getAttribute("position-y"); // Получаем итоговую позицию для контейнера по Y
        ropeAnim = 1; // Подставляем номер анимации 
      } else if (Number(carriageCount) == 1) {
        positionX = activeElements[1].getAttribute("position-x2"); // Получаем итоговую позицию для контейнера по X
        positionY = activeElements[1].getAttribute("position-y2"); // Получаем итоговую позицию для контейнера по Y
        ropeAnim = 2; // Подставляем номер анимации 
      } else {
        alert("Перевозка заполнена"); // Выводим сообщение об ошибке 
        return; // завершаем функцию при ошибке
      }

      containerID = activeElements[0].getAttribute("id"); // получаем ID выбранного контейнера

      if (ropeAnim == 1) {  // номер анимации для веревки равен 1
        rope.classList.add("ropeStart"); // добавляем движение веревке
        rope.classList.remove("carEndRope1");
        rope.classList.remove("carEndRope2");
        rope.classList.remove("ropeEnd1279-cb2");
        rope.classList.remove("ropeEnd1279-2-cb2");
        rope.classList.remove("ropeEnd1279-cb3");
        rope.classList.remove("ropeEnd1279-2-cb3");
        
        
        if (craneBlockPosition == 2) { 
          rope.classList.add("ropeStart1279-cb2"); // добавляем движение веревке
        } else if (craneBlockPosition == 3) {
          rope.classList.add("ropeStart1279-cb3"); // добавляем движение веревке
        }
        
        
        if (craneBlockPosition == 2 || craneBlockPosition == 3) { 
          setTimeout(() => {
            rope.classList.add("ropeStop");
          }, 2000);
          setTimeout(() => {
            rope.classList.remove("ropeStop");
          }, 3000);
        };
        
        rope.classList.remove("ropeEnd");
        rope.classList.remove("ropeEnd2");
      } else {
        rope.classList.add("ropeStart2");
        rope.classList.remove("carEndRope1");
        rope.classList.remove("carEndRope2");
        rope.classList.remove("ropeEnd1279-cb2");
        rope.classList.remove("ropeEnd1279-2-cb2");
        rope.classList.remove("ropeEnd1279-cb3");
        rope.classList.remove("ropeEnd1279-2-cb3");
        
        if (craneBlockPosition == 2) { 
          rope.classList.add("ropeStart1279-2-cb2"); // добавляем движение веревке
        } else if (craneBlockPosition == 3) {
          rope.classList.add("ropeStart1279-2-cb3"); // добавляем движение веревке
        }
        
        if (craneBlockPosition == 2 || craneBlockPosition == 3) {
          setTimeout(() => {
            rope.classList.add("ropeStop");
          }, 2000);
          setTimeout(() => {
            rope.classList.remove("ropeStop");
          }, 3000);
        };
        
        rope.classList.remove("ropeEnd2");
        rope.classList.remove("ropeEnd");
      }
      
      if (craneBlockPosition == 1) { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos1["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos1["0%"]["right"]}px;
            } 33% {
              top: ${dataObj.containerAnim.cranePos1["33%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos1["33%"]["right"]}px;
            } 66% {
              top: ${ropeAnim == 1 ? dataObj.containerAnim.cranePos1.containerPos1 : dataObj.containerAnim.cranePos1.containerPos2}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 3s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 6000;
      } else if (craneBlockPosition == 2) { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos2["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["0%"]["right"]}px;
            } 25% {
              top: ${dataObj.containerAnim.cranePos2["25%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["25%"]["right"]}px;
            } 50% {
              top: ${dataObj.containerAnim.cranePos2["50%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["50%"]["right"]}px;
            } 75% {
              top: ${ropeAnim == 1 ? dataObj.containerAnim.cranePos2.containerPos1 : dataObj.containerAnim.cranePos2.containerPos2}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 4s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 9000;
      } else { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos3["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["0%"]["right"]}px;
            } 25% {
              top: ${dataObj.containerAnim.cranePos3["25%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["25%"]["right"]}px;
            } 50% {
              top: ${dataObj.containerAnim.cranePos3["50%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["50%"]["right"]}px;
            } 75% {
              top: ${ropeAnim == 1 ? dataObj.containerAnim.cranePos3.containerPos1 : dataObj.containerAnim.cranePos3.containerPos2}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 4s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 9000;
      }
      
      activeElements[0].classList.add(`animation-${containerID}`); // Добавляем анимацию контейнеру
      activeElements[1].setAttribute("count", Number(carriageCount) + 1); // Увеличиваем счётсчик перевозки
      usedElements.push(activeElements[0]); // Добавляем контейнер в массив использованных контейнеров
      usedElementsObj.push(`${containerID}: '100%': 'top': ${positionY}, 'right': ${positionX}`); // Добавляем контейнер в массив использованных контейнеров как объект
      railwayAndTrainBlock.setAttribute("count", Number(trainCount) + 1); // Увеличиваем уровень заполненности поезда
      
      function animTrainEnd(railwayAndTrainBlock, activeElements) {
        let carriageCount = activeElements[1].getAttribute("count");
        
        activeElements[0].classList.remove(`animation-${containerID}`);
        activeElements[0].classList.remove(`minigame-container-${containerID}`);
        
        if (activeElements[1].classList.contains("railway-carriage-1")) {
          if (carriageCount == 1) {
            activeElements[0].classList.add("minigame-container-railway_1-pos_1");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          } else {
            activeElements[0].classList.add("minigame-container-railway_1-pos_2");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          }
        } else if (activeElements[1].classList.contains("railway-carriage-2")) {
          if (carriageCount == 1) {
            activeElements[0].classList.add("minigame-container-railway_2-pos_1");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          } else {
            activeElements[0].classList.add("minigame-container-railway_2-pos_2");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          }
        } else {
          if (carriageCount == 1) {
            activeElements[0].classList.add("minigame-container-railway_3-pos_1");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          } else {
            activeElements[0].classList.add("minigame-container-railway_3-pos_2");
            railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
          }
        }
        
        railwayAndTrainBlock.insertAdjacentElement("beforeend", activeElements[0]);
      }
      
      setTimeout(() => {
        animTrainEnd(railwayAndTrainBlock, activeElements);
        
        activeElements = []; // Очищаем массив с выбранными элементами
      }, 6000);
      
      if (railwayAndTrainBlock.getAttribute("count") == 6) { // анимация конца проезда поезда
        setTimeout(() => {
          railwayAndTrainBlock.classList.add("trainEnd");
          railwayAndTrainBlock.classList.remove("trainStart");
        }, 8000);
      }
      
      if (ropeAnim == 1) {
        setTimeout(() => {
          if (craneBlockPosition == 2) { 
            rope.classList.add("ropeEnd1279-cb2"); // добавляем движение веревке
          } else if (craneBlockPosition == 3) {
            rope.classList.add("ropeEnd1279-cb3"); // добавляем движение веревке
          }
          
          rope.classList.remove("ropeStart1279-cb2");
          rope.classList.remove("ropeStart1279-2-cb2");
          rope.classList.remove("ropeStart1279-cb3");
          rope.classList.remove("ropeStart1279-2-cb3");
          
          rope.classList.add("ropeEnd");
          rope.classList.remove("ropeStart");
          rope.classList.remove("ropeStart2");
          
          activeElements[0].classList.remove("container-z-index");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      } else {
        setTimeout(() => {
          if (craneBlockPosition == 2) { 
            rope.classList.add("ropeEnd1279-2-cb2"); // добавляем движение веревке
          } else if (craneBlockPosition == 3) {
            rope.classList.add("ropeEnd1279-2-cb3"); // добавляем движение веревке
          }
          
          rope.classList.remove("ropeStart1279-cb2");
          rope.classList.remove("ropeStart1279-2-cb2");
          rope.classList.remove("ropeStart1279-cb3");
          rope.classList.remove("ropeStart1279-2-cb3");
          
          rope.classList.add("ropeEnd2");
          rope.classList.remove("ropeStart2");
          rope.classList.remove("ropeStart");
          
          activeElements[0].classList.remove("container-z-index");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      }
      
      containers.forEach(container => {
        container.classList.add("minigame-lock-element");
        
        setTimeout(() => {
          container.classList.remove("minigame-lock-element");
        }, freezeGame);
      });
    } else {
      //alert("Выберите сначала контейнер, а потом вагонетку!");
      activeElements = []; // Очищаем массив с выбранными элементами
    }
  }
  
  function moveContainerForCars(activeElements, styleBlock, usedElements, dataObj, usedElementsObj, freezeGame, containers) {
    if (activeElements[0].classList.contains("container-block") && activeElements[1].classList.contains("minigame-car__container")) { // проверка правильно ли выбраны элементы
    // if (activeElements[0].classList.contains("minigame-container") && activeElements[1].classList.contains("minigame-car__container")) { // проверка правильно ли выбраны элементы
      let craneBlock = document.querySelector(".crane-block"); // получаем блок с краном 
      let rope = document.querySelector(".rope"); // получаем блок с веревкой
      let carID = activeElements[1].getAttribute("id"); // получаем ID перевозки
      let positionX; // итоговая позиция контейнера по X
      let positionY; // итоговая позиция контейнера по Y
      let craneBlockPosition; // позиция блока с краном
      let ropeAnim; // номер для анимации веревки
      let minigameCars = document.querySelector(".minigame-cars");
      let minigameCarsCount = minigameCars.getAttribute("count");
      // minigameCarsCount = minigameCars.getAttribute("count");
      
      if (activeElements[1].getAttribute("count")) {
        // alert("Машина уже заполнена!");
        return;
      } else {
        activeElements[1].setAttribute("count", 1);
      }
      
      let ship = document.querySelector(".minigame-ship_container");
      let shipCount = ship.getAttribute("containers");
      
      if (Number(shipCount) > 0) {
        ship.setAttribute("containers", Number(shipCount) - 1);
      } else {
        setTimeout(() => {
          ship.classList.add("ship-end");
          ship.classList.remove("ship-start");
        }, 6000);
      }
      
      if (minigameCarsCount) {
        minigameCarsCount = minigameCars.getAttribute("count");
        minigameCars.setAttribute("count", Number(minigameCarsCount) + 1);
        minigameCarsCount = minigameCars.getAttribute("count");
      } else {
        minigameCars.setAttribute("count", 1);
      }
      
      if (carID == 5) { // если ID машины равен 5
        craneBlock.style.top = `${dataObj.cranePos1.craneStartPosY}px`; // подставляем крану высоту крану
        craneBlock.style.left = `${dataObj.cranePos1.craneStartPosX}px`; // подставляем значения крана по X
        
        craneBlock.setAttribute("crane-position", 1); // устанавливаем крану позицию
        craneBlockPosition = 1; // перезаписываем переменную с краном, подставляем ей значение крана 
      } else { // если ID машины равен 4
        craneBlock.setAttribute("crane-position", 2); // устанавливаем крану позицию
        craneBlockPosition = 2; // перезаписываем переменную с краном, подставляем ей значение крана 
        
        setTimeout(() => { // двигаем кран после n секунд
          craneBlock.style.top = `${dataObj.cranePos2.craneStartPosY}px`; // подставляем крану высоту крану
          craneBlock.style.left = `${dataObj.cranePos2.craneStartPosX}px`; // подставляем значения крана по X
        }, 2000);
        
        setTimeout(() => { // двигаем кран обратно после n секунд
          craneBlock.style.top = `${dataObj.cranePos1.craneStartPosY}px`; // подставляем крану высоту крану
          craneBlock.style.left = `${dataObj.cranePos1.craneStartPosX}px`; // подставляем значения крана по X
          
          craneBlockPosition = 1; // возвращаем первую позицию крану в переменную
          craneBlock.setAttribute("crane-position", 1); // возвращаем первую позицию крану 
        }, 9000);
      }
      
      positionX = activeElements[1].getAttribute("position-x"); // Получаем итоговую позицию для контейнера по X
      positionY = activeElements[1].getAttribute("position-y"); // Получаем итоговую позицию для контейнера по Y
      
      if (activeElements[1].classList.contains("minigame-car_1")) {
        ropeAnim = 2; // Подставляем номер анимации 
      } else {
        ropeAnim = 1; // Подставляем номер анимации
      }
      
      containerID = activeElements[0].getAttribute("id"); // получаем ID выбранного контейнера

      if (ropeAnim == 1) {  // номер анимации для веревки равен 1
        
        console.log(ropeAnim);
        
        rope.classList.remove("ropeEnd"); // добавляем движение веревке
        rope.classList.remove("ropeEnd2"); // добавляем движение веревке
        rope.classList.add("carStartRope1"); // добавляем движение веревке
        
        if (craneBlockPosition == 2 || craneBlockPosition == 3) { 
          setTimeout(() => {
            rope.classList.add("ropeStop");
          }, 2000);
          setTimeout(() => {
            rope.classList.remove("ropeStop");
          }, 3000);
        };
        
        rope.classList.remove("carEndRope1");
        rope.classList.remove("carEndRope2");
      } else {
        console.log(ropeAnim);
        
        rope.classList.add("carStartRope2");
        
        if (craneBlockPosition == 2 || craneBlockPosition == 3) {
          setTimeout(() => {
            rope.classList.add("ropeStop");
          }, 2000);
          setTimeout(() => {
            rope.classList.remove("ropeStop");
          }, 3000);
        };
        
        rope.classList.remove("carEndRope2");
        rope.classList.remove("carEndRope1");
      }
      
      if (craneBlockPosition == 1) { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos1["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos1["0%"]["right"]}px;
            } 33% {
              top: ${dataObj.containerAnim.cranePos1["33%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos1["33%"]["right"]}px;
            } 66% {
              top: ${dataObj.carPos2["carPosY75%"]}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 3s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 6000;
      } else if (craneBlockPosition == 2) { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos2["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["0%"]["right"]}px;
            } 25% {
              top: ${dataObj.containerAnim.cranePos2["25%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["25%"]["right"]}px;
            } 50% {
              top: ${dataObj.containerAnim.cranePos2["50%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos2["50%"]["right"]}px;
            } 75% {
              top: ${dataObj.carPos1["carPosY75%"]}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 4s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 9000;
      } else { 
        styleBlock.innerHTML += `
          @keyframes moveContainer${containerID} {
            0% {
              top: ${dataObj.containerAnim.cranePos3["0%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["0%"]["right"]}px;
            } 25% {
              top: ${dataObj.containerAnim.cranePos3["25%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["25%"]["right"]}px;
            } 50% {
              top: ${dataObj.containerAnim.cranePos3["50%"]["top"]}px;
              right: ${dataObj.containerAnim.cranePos3["50%"]["right"]}px;
            } 75% {
              top: ${ropeAnim == 1 ? dataObj.containerAnim.cranePos3.containerPos1 : dataObj.containerAnim.cranePos3.containerPos2}px;
              right: ${positionX}px;
            } 100% {
              top: ${positionY}px;
              right: ${positionX}px;
            }
          } .animation-${containerID} {
            animation-name: moveContainer${containerID};
            animation-duration: 4s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1000ms;
          }
        `; // создаем анимацию
        
        freezeGame = 9000;
      }

      activeElements[0].classList.add(`animation-${containerID}`); // Добавляем анимацию контейнеру
      usedElements.push(activeElements[0]); // Добавляем контейнер в массив использованных контейнеров
      usedElementsObj.push(`${containerID}: '100%': 'top': ${positionY}, 'right': ${positionX}`); // Добавляем контейнер в массив использованных контейнеров как объект
      
      function animCarEnd(activeCar, activeContainer) {
        activeContainer.classList.remove(`animation-${containerID}`);
        activeContainer.classList.remove(`minigame-container-${containerID}`);
        
        if (activeCar.classList.contains("minigame-car_1")) {
          activeContainer.classList.add(`minigame-car_1__container`);
        } else {
          activeContainer.classList.add(`minigame-car_2__container`);
        }
        
        activeCar.insertAdjacentElement("beforeend", activeContainer);
      }
      
      if (minigameCarsCount == 2) {
        setTimeout(() => {
          animCarEnd(activeElements[1], activeElements[0]);
          
          activeElements = []; // Очищаем массив с выбранными элементами
        }, 5000);
        
        setTimeout(() => {
          minigameCars.classList.add("minigame-cars_end");
          minigameCars.classList.remove("minigame-cars_start");
        }, 6000);
      } else {
        setTimeout(() => {
          animCarEnd(activeElements[1], activeElements[0]);
          
          activeElements = []; // Очищаем массив с выбранными элементами
        }, 5000);
      }
      
      if (ropeAnim == 1) {
        setTimeout(() => {
          rope.classList.add("carEndRope1");
          rope.classList.remove("carStartRope1");
          rope.classList.remove("carStartRope2");
          rope.classList.remove("ropeEnd");
          rope.classList.remove("ropeEnd2");
          rope.classList.remove("carEndRope2");
          rope.classList.remove("ropeEnd1279-cb2");
          rope.classList.remove("ropeEnd1279-2-cb2");
          rope.classList.remove("ropeEnd1279-cb3");
          rope.classList.remove("ropeEnd1279-2-cb3");
          
          activeElements[0].classList.remove("container-z-index");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      } else {
        setTimeout(() => {
          rope.classList.add("carEndRope2");
          rope.classList.remove("carStartRope2");
          rope.classList.remove("carStartRope1");
          rope.classList.remove("carStartRope1");
          rope.classList.remove("carStartRope2");
          rope.classList.remove("ropeEnd");
          rope.classList.remove("ropeEnd2");
          rope.classList.remove("carEndRope1");
          rope.classList.remove("ropeEnd1279-cb2");
          rope.classList.remove("ropeEnd1279-2-cb2");
          rope.classList.remove("ropeEnd1279-cb3");
          rope.classList.remove("ropeEnd1279-2-cb3");
          
          //activeElements[0].classList.remove("container-z-index");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      }
      
      containers.forEach(container => {
        container.classList.add("minigame-lock-element");
        
        setTimeout(() => {
          container.classList.remove("minigame-lock-element");
        }, freezeGame);
      });
    } else {
      activeElements = []; // Очищаем массив с выбранными элементами
    }
  }
  
  function clearGame() {
    let containers = document.querySelector(".minigame-containers-block");
    let train = document.querySelector(".minigame-train-block");
    let cars = document.querySelector(".minigame-cars");
    let ship = document.querySelector(".minigame-ship_container");
    
    containers.innerHTML = "";
    train.innerHTML = `
      <img src="./images/train.png" alt="train" class="minigame-train">
      <div class="carriage-block carriage-block-1">
        <img src="./images/railway-carriage.png" alt="railway-carriage" class="minigame-railway-carriage railway-carriage-1" count="0" id="1">
        <div class="arrow"></div>
      </div>
      <div class="carriage-block carriage-block-2">
        <img src="./images/railway-carriage.png" alt="railway-carriage" class="minigame-railway-carriage railway-carriage-2" count="0" id="2">
        <div class="arrow"></div>
      </div>
      <div class="carriage-block carriage-block-3">
        <img src="./images/railway-carriage.png" alt="railway-carriage" class="minigame-railway-carriage railway-carriage-3" count="0" id="3">
        <div class="arrow"></div>
      </div>
    `;
    cars.innerHTML = `
      <div class="minigame-car__container minigame-car_1" id="4">
        <img src="./images/car.png" alt="car" class="minigame-car">
        <img src="./images/cabin.png" alt="" class="minigame-car_cabin">
        <div class="arrow"></div>
      </div>
      <div class="minigame-car__container minigame-car_2" id="5">
        <img src="./images/car.png" alt="car" class="minigame-car">
        <img src="./images/cabin.png" alt="" class="minigame-car_cabin">
        <div class="arrow"></div>
      </div>
    `;
    ship.setAttribute("containers", 8);
    train.setAttribute("count", 0);
    cars.setAttribute("count", 0);
    
    ship.classList.remove("ship-start");
    train.classList.remove("trainStart");
    cars.classList.remove("minigame-cars_start");
    ship.classList.remove("ship-end");
    train.classList.remove("trainEnd");
    cars.classList.remove("minigame-cars_end");
  }
  
  function gameTimer(level, gameRecord) {
    let timerSpan = document.querySelector(".minigame-timer span");
    let gameRecordElem = document.querySelector(".minigame-record span");
    let gameRecordship = document.querySelector(".minigame-ship_container");
    let gameRecordTrain = document.querySelector(".minigame-train-block");
    let gameRecordCar = document.querySelector(".minigame-cars");
    let timerRecord;
    
    console.log(gameRecord);
    gameRecordElem.innerText = gameRecord;
    
    if (level == 1) {
      // timerRecord = 5;
      timerRecord = 120;
      timerSpan.innerText = `${timerRecord}`;
    } else if (level == 2) {
      timerRecord = 100;
      timerSpan.innerText = `${timerRecord}`;
      // gameRecordElem.innerText = gameRecord;
    } else {
      timerRecord = 90;
      timerSpan.innerText = `${timerRecord}`;
      // gameRecordElem.innerText = gameRecord;
    }
    
    let mainTimeout = setTimeout(() => {
      let intervalIdentify = setInterval(() => {
        if (timerRecord) {
          let gameRecordTrainNum = Number(gameRecordTrain.getAttribute("count"));
          let gameRecordCarNum = Number(gameRecordCar.getAttribute("count"));
          
          gameRecord = gameRecordTrainNum + gameRecordCarNum;
          gameRecordElem.innerText = gameRecord;
          
          timerRecord = timerRecord - 1;
          timerSpan.innerText = `${timerRecord}`;
        } else {
          clearInterval(intervalIdentify);
          alert("Game over");
          clearGame();
          mainFunc(level, 0);
          return;
        }; if (Number(gameRecordship.getAttribute("containers")) == 0) {
          clearInterval(intervalIdentify);
          
          setTimeout(() => {
            level = Number(level) + 1;
            clearTimeout(mainTimeout);
            clearGame();
            mainFunc(Number(level), gameRecord);
            
            console.log(level);
          }, 8000);
          
          return;
        }
      }, 1000);
    }, 8000);
  }

  function gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj, freezeGame) {
    let containerBlock = document.querySelector(".minigame-containers-block"); // получаем родительский блок с контейнерами
    // let containersAll = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
    let containersAll = document.querySelectorAll(".container-block"); // Получаем все контейнеры
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let cars = document.querySelectorAll(".minigame-car__container");
    let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением
    let activeElements = []; // создаем массив для выбранных элементов
    let usedElements = []; // использованные контейнеры
    let usedElementsObj = []; // 
    let containers = [];
    let containerZIndexAll = 150;
    
    containersAll.forEach((container) => {
      containers.push(container);
    });
    
    document.querySelector(".minigame-ship_container").classList.add("ship-start"); 
    document.querySelector(".minigame-train-block").classList.add("trainStart"); 
    document.querySelector(".minigame-cars").classList.add("minigame-cars_start"); 

    let firstAnim = setTimeout(function FirstAnimateAndClicks() { // ждем первую анимацию
      //lockBg.classList.add("minigame-lock_active"); // Подставляем затемнение

      //function FirstAnimateAndClicks() {
        containers.forEach((container) => { // пробегаемся по контейнерам
          if (usedElements.length >= 1) { // если в массиве 0 или 1 использованный элемент
            usedElements.forEach((element) => { // пробегаемся по массиву
              if (element !== container) { // если он не равнет контейнеру
                let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
                container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
                //container.style.zIndex = `${containerZIndex + 21}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров
              }
            });
          } else { // если больше одного элемента в массиве
            let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
            container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
            //container.style.zIndex = `${containerZIndex + 21}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров
          }

            container.addEventListener("click", (event) => { // при клике на какой-либо контейнер
              let containerActive = container; // сохраняем выбранный контейнер
              let containerID = container.getAttribute("id"); // сохраняем ID контейнера
              let result = true; // результат проверки
              
              container.classList.add("container-z-index");
              
              if (usedElements.length !== 0) { // проверка на уже использованный контейнер 
                usedElements.forEach((element) => { // пробегаемся по использованным элементам
                  if (element == containerActive) { // если контейнер равен активному контейнеру
                    activeElements = []; // очищаем массив с выбранными элементами
                    result = false; // результат ставим неверным
                    
                    alert("Вы уже переложили этот контейнер! Выберите другой"); // выводим надпись на экран
                    return; // останавливаем цикл
                  }
                });
              };
              
              if (result) { // если результат верный
                if (activeElements.length || activeElements == undefined) { // если нету выбранного элемента 
                  alert("Вы уже выбрали контейнер, теперь выберите транспорт"); // выводим надпись на экран
                  console.log("alert: " + activeElements); // выводим в консоль
                } else { // если есть выбранный элемент
                  activeElements.push(containerActive); // добавляем его в массив
    
                  containers.forEach((containerNoActive) => { // перебираем контейнеры
                    if (containerNoActive !== containerActive) { // если контейнер не выбранный
                      let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
    
                      containerNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                      //containerNoActive.style.zIndex = `${containerZIndexNow - 20}`; // уменьшаем z-index
                    } else { // если контейнер выбранный
                      let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
    
                      //containerNoActive.style.zIndex = `${containerZIndexNow + 10}`; // уменьшаем z-index
                    }
                  });
                };
    
                //railwayAndTrainBlock.style.zIndex = `101`; // увеличиваем z-index блока с поездом
                //cars.forEach((car) => {
                //  car.style.zIndex = `102`;
                //});
    
                railwaysCarriages.forEach((carriage) => { // пробегаемся по перевозкам
                  let carriageZIndex = Number(getComputedStyle(carriage).zIndex); // получаем z-index перевозки
                  carriage.classList.add("minigame-container_bg"); // добавляем свечение
                  //carriage.style.zIndex = `${carriageZIndex + 101}` // добавляем z-index перевозке
    
                  carriage.addEventListener("click", (event) => { // при клике на перевозку
                    let carriageActive = carriage; // сохраняем выбранную перевозку
                    let newContainers = [];
                    
                    activeElements.push(carriageActive); // добавляем её в массив
                    
                    moveContainerForTrain(railwayAndTrainPosition, activeElements, styleBlock, usedElements, containers, dataObj, railwayAndTrainBlock, usedElementsObj, freezeGame); // вызываем функцию
                    
                    containers.forEach((container) => { // пробегаемся по контейнерам
                      let oldContainerID = container.getAttribute("id"); // получаем айди контейнера
                      
                      if (oldContainerID !== containerID) { // сверяем контейнеры по ID
                        newContainers.push(container); // добавляем в массив использованный контейнер
                      } else { // если контейнер не использованный
                        let containerZIndexNow = Number(getComputedStyle(container).zIndex); // получаем z-index контейнера
                        containerZIndexAll = containerZIndexAll - 1; // уменьшаем его z-index на 1
      
                        container.classList.remove("minigame-container_bg"); // удаляем свечение
                        container.style.zIndex = `${containerZIndexAll}`; // уменьшаем z-index
                      }
                    });
                    
                    containers = newContainers;
                    
                    // console.log(containers);
      
                    railwaysCarriages.forEach((carriageNoActive) => { // пробегаемся по всем перевозкам
                      // if (carriageNoActive !== carriageActive) { // если не активная перевозка
                        //let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index
      
                        carriageNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                        //carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем z-index
                      // } if (carriageNoActive == carriageActive) { // Если перевозка активная
                        //let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index
      
                        //carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем z-index
                      // }
                    });
                    
                    cars.forEach((carNoActive) => { // пробегаемся по всем перевозкам
                      carNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                    });
      
                    // setTimeout(() => {
                      containers.forEach((containerNoActive) => { // перебираем контейнеры
                        let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
        
                        if (containerZIndexNow < 70) {
                          containerNoActive.classList.add("minigame-container_bg"); // добавляем свечение
                          //containerNoActive.style.zIndex = `${containerZIndexNow + 21}`; // повышаем z-index
                        }
                      });
                    // }, 800);
      
                    activeElements = []; // Очищаем массив с выбранными элементами  
                    
                  });
                });
                
                cars.forEach((car) => {
                  //let carZIndex = Number(getComputedStyle(car).zIndex); // получаем z-index перевозки
                  car.classList.add("minigame-container_bg"); // добавляем свечение
                  //car.style.zIndex = `${carZIndex + 101}` // добавляем z-index перевозке 
      
                  car.addEventListener("click", (event) => { // при клике на перевозку
                    let carActive = car; // сохраняем выбранную перевозку
                    let newContainers = [];
                     
                    activeElements.push(carActive); // добавляем её в массив
                      
                    moveContainerForCars(activeElements, styleBlock, usedElements, dataObj, usedElementsObj, freezeGame, containers); // вызываем функцию
                      
                    containers.forEach((container) => { // пробегаемся по контейнерам
                      let oldContainerID = container.getAttribute("id"); // получаем айди контейнера
                        
                      if (oldContainerID !== containerID) { // сверяем контейнеры по ID
                        newContainers.push(container); // добавляем в массив использованный контейнер
                      } else { // если контейнер не использованный
                        let containerZIndexNow = Number(getComputedStyle(container).zIndex); // получаем z-index контейнера
                        containerZIndexAll = containerZIndexAll - 1; // уменьшаем его z-index на 1
        
                        container.classList.remove("minigame-container_bg"); // удаляем свечение
                        container.style.zIndex = `${containerZIndexAll}`; // уменьшаем z-index
                      }
                    });
                      
                    containers = newContainers;
                      
                    // console.log(containers);
        
                    cars.forEach((carNoActive) => { // пробегаемся по всем перевозкам
                      //if (carNoActive !== carActive) { // если не активная перевозка
                        //let carZIndexNow = Number(getComputedStyle(carNoActive).zIndex); // получаем z-index
        
                        carNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                        //carNoActive.style.zIndex = `${carZIndexNow - 101}`; // уменьшаем z-index
                      /* } if (carNoActive == carActive) { // Если перевозка активная
                        let carZIndexNow = Number(getComputedStyle(carNoActive).zIndex); // получаем z-index
        
                        carNoActive.style.zIndex = `${carZIndexNow - 101}`; // уменьшаем z-index
                      } */
                    });
                    
                    railwaysCarriages.forEach((carriageNoActive) => { // пробегаемся по всем перевозкам
                      carriageNoActive.classList.remove("minigame-container_bg");
                    });
        
                    // setTimeout(() => {
                      containers.forEach((containerNoActive) => { // перебираем контейнеры
                        let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
          
                        if (containerZIndexNow < 70) {
                          containerNoActive.classList.add("minigame-container_bg"); // добавляем свечение
                          //containerNoActive.style.zIndex = `${containerZIndexNow + 21}`; // повышаем z-index
                        }
                      });
                    // }, 800);
        
                    activeElements = []; // Очищаем массив с выбранными элементами 
                  });
                });
              };
            });
        });
      //}; FirstAnimateAndClicks();
    }, freezeGame);
  };

  if (document.body.clientWidth < 1921 && document.body.clientWidth >= 1280) {
    let size = 1920 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    calculateProperties(size);

    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let cars = document.querySelector(".minigame-cars");
    let car1 = document.querySelector(".minigame-car_1"); // получаем блок с поездом и перевозками
    let car2 = document.querySelector(".minigame-car_2"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let freezeGame = 8000;
    
    railwayAndTrainBlock.classList.add("trainStart");
    cars.classList.add("minigame-cars_start");
    // car1.classList.add("minigame-car_1-anim");
    // car2.classList.add("minigame-car_2-anim");
    
    let dataObj = {
      "cranePos1": {
        "craneStartPosX": 0,
        "craneStartPosY": 0,
      }, "cranePos2": {
        "craneStartPosX": 145,
        "craneStartPosY": -80,
      }, "cranePos3": {
        "craneStartPosX": 290,
        "craneStartPosY": -160,
      }, "containerAnim" : {
        "cranePos1": {
          "0%": {
            "top": -68,
            "right": 321,
          }, "33%": {
            "top": -167,
            "right": 321,
          }, 
          "containerPos1": -47,
          "containerPos2": -4
        }, "cranePos2": {
          "0%": {
            "top": -68,
            "right": 321,
          }, "25%": {
            "top": -167,
            "right": 321,
          }, "50%": {
            "top": -247,
            "right": 174,
          }, 
          "containerPos1": -126,
          "containerPos2": -83
        }, "cranePos3": {
          "0%": {
            "top": -68,
            "right": 321,
          }, "25%": {
            "top": -167,
            "right": 321,
          }, "50%": {
            "top": -328,
            "right": 30,
          },
          "containerPos1": -191,
          "containerPos2": -148
        },
      }, "carPos1": {
        // "carPosX75%": -168,
        // "carPosY75%": -68
        "carPosX75%": -210,
        "carPosY75%": -68
      }, "carPos2": {
        // "carPosX75%": 36,
        // "carPosY75%": -8
        "carPosX75%": 36,
        "carPosY75%": -8
      }
    };
    
    let railwayAndTrainPosition = {
      "0%": {
        "top": Number(getComputedStyle(railwayAndTrainBlock).top),
        "right": Number(getComputedStyle(railwayAndTrainBlock).right),
      }, "100%": {
        "top": 576,
        "right": 600
      }
    }; // создаем объект с анимацией

    // Прописываю анимацию в тег <style>
    /* styleBlock.innerHTML += `
      @keyframes trainStart {
        0% {
          top: ${Number(getComputedStyle(railwayAndTrainBlock).top)};
          right: ${Number(getComputedStyle(railwayAndTrainBlock).right)};
        } 100% {
          top: 576px;
          right: -600px;
        }
      }
    `; */ // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        // carriage.setAttribute("position-X", "100");
        carriage.setAttribute("position-X", "92");
        carriage.setAttribute("position-Y", "122");
        // carriage.setAttribute("position-X2", "30");
        carriage.setAttribute("position-X2", "22");
        carriage.setAttribute("position-Y2", "82");
      } else if (carriage.classList.contains("railway-carriage-2")) {
        carriage.setAttribute("position-X", "-52");
        carriage.setAttribute("position-Y", "37");
        carriage.setAttribute("position-X2", "-128");
        carriage.setAttribute("position-Y2", "-5");
      } else if (carriage.classList.contains("railway-carriage-3")) {
        carriage.setAttribute("position-X", "-207");
        carriage.setAttribute("position-Y", "-47");
        carriage.setAttribute("position-X2", "-280");
        carriage.setAttribute("position-Y2", "-87");
      }
    });
    
    car1.setAttribute("position-X", "-210");
    car1.setAttribute("position-Y", "-10");
    car2.setAttribute("position-X", "52");
    car2.setAttribute("position-Y", "131");

    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj, freezeGame);
    
    gameTimer(level, gameRecord);
    
    if (level <= 3) {
      level + 1;
    }
    
    console.log(1280);
  } else if (document.body.clientWidth < 1280 && document.body.clientWidth >= 960) {
    let size = 1280 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    
    calculateProperties(size);
    
    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let cars = document.querySelector(".minigame-cars");
    let car1 = document.querySelector(".minigame-car_1"); // получаем блок с поездом и перевозками
    let car2 = document.querySelector(".minigame-car_2"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let freezeGame = 8000;
    
    railwayAndTrainBlock.classList.add("trainStart");
    cars.classList.add("minigame-cars_start");
    
    let dataObj = {
      "cranePos1": {
        "craneStartPosX": -45,
        "craneStartPosY": 7,
      }, "cranePos2": {
        "craneStartPosX": 76,
        "craneStartPosY": -58,
      }, "cranePos3": {
        "craneStartPosX": 240,
        "craneStartPosY": -147,
      }, "containerAnim" : {
        "cranePos1": {
          "0%": {
            "top": 0,
            "right": 285,
            //"right": 312,
          }, "33%": {
            "top": -40,
            "right": 285,
            //"right": 312,
          }, 
          "containerPos1": 21,
          "containerPos2": 20
        }, "cranePos2": {
          "0%": {
            "top": -2,
            "right": 285,
            // "right": 310,
          }, "25%": {
            "top": -42,
            "right": 285,
            // "right": 310,
          }, "50%": {
            "top": -106,
            "right": 163,
            // "right": 190,
          },
          "containerPos1": -46,
          "containerPos2": -33
        }, "cranePos3": {
          "0%": {
            "top": -2,
            "right": 310,
          }, "25%": {
            "top": -42,
            "right": 310,
          }, "50%": {
            "top": -196,
            "right": -1,
            // "right": 25,
          },
          "containerPos1": -135,
          "containerPos2": -93
        },
      }, "carPos1": {
        "carPosX75%": -210,
        "carPosY75%": -25
      }, "carPos2": {
        "carPosX75%": 158,
        "carPosY75%": 40
      }
    };
    
    let railwayAndTrainPosition = {
      "0%": {
        "top": Number(getComputedStyle(railwayAndTrainBlock).top),
        "right": Number(getComputedStyle(railwayAndTrainBlock).right),
      }, "100%": {
        "top": 576,
        "right": 600
      }
    }; // создаем объект с анимацией

    // Прописываю анимацию в тег <style>
    styleBlock.innerHTML += `
      @keyframes trainStart {
        0% {
          top: ${Number(getComputedStyle(railwayAndTrainBlock).top)}px;
          right: ${Number(getComputedStyle(railwayAndTrainBlock).right)}px;
        } 100% {
          top: 465px;
          right: -246px;
        }
      }
    `; // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        // carriage.setAttribute("position-X", "200");
        carriage.setAttribute("position-X", "174");
        carriage.setAttribute("position-Y", "130");
        // carriage.setAttribute("position-X2", "130");
        carriage.setAttribute("position-X2", "104");
        carriage.setAttribute("position-Y2", "92");
      } else if (carriage.classList.contains("railway-carriage-2")) {
        // carriage.setAttribute("position-X", "43");
        carriage.setAttribute("position-X", "16");
        carriage.setAttribute("position-Y", "45");
        // carriage.setAttribute("position-X2", "-32");
        carriage.setAttribute("position-X2", "-58");
        carriage.setAttribute("position-Y2", "4");
      } else if (carriage.classList.contains("railway-carriage-3")) {
        // carriage.setAttribute("position-X", "-107");
        carriage.setAttribute("position-X", "-133");
        carriage.setAttribute("position-Y", "-37");
        // carriage.setAttribute("position-X2", "-178");
        carriage.setAttribute("position-X2", "-202");
        carriage.setAttribute("position-Y2", "-75");
      }
    });
    
    car1.setAttribute("position-X", "34");
    car1.setAttribute("position-Y", "73");
    car2.setAttribute("position-X", "131");
    car2.setAttribute("position-Y", "144");
    
    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj, freezeGame);
    
    gameTimer(level, gameRecord);
    
    if (level <= 3) {
      level + 1;
    }
    
    console.log(960);
  } else if (document.body.clientWidth < 960 && document.body.clientWidth >= 705 && document.body.clientHeight > 500) {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    
    calculateProperties(size);
    
    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let cars = document.querySelector(".minigame-cars");
    let car1 = document.querySelector(".minigame-car_1"); // получаем блок с поездом и перевозками
    let car2 = document.querySelector(".minigame-car_2"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let freezeGame = 8000;
    
    railwayAndTrainBlock.classList.add("trainStart");
    cars.classList.add("minigame-cars_start");
    
    let dataObj = {
      "cranePos1": {
        "craneStartPosX": -20,
        "craneStartPosY": -20,
      }, "cranePos2": {
        "craneStartPosX": 120,
        "craneStartPosY": -96,
      }, "cranePos3": {
        "craneStartPosX": 267,
        "craneStartPosY": -177,
      }, "containerAnim" : {
        "cranePos1": {
          "0%": {
            "top": -24,
            "right": 384,
            // "top": -23,
            // "right": -54,
          }, "33%": {
            "top": -84,
            "right": 384,
            // "top": -83,
            // "right": -54,
          },
          "containerPos1": -17,
          "containerPos2": 6
        }, "cranePos2": {
          "0%": {
            "top": -24,
            "right": 384,
          }, "25%": {
            "top": -84,
            "right": 384,
          }, "50%": {
            "top": -160,
            "right": 244,
            // "top": -155,
            // "right": -194,
          },
          "containerPos1": -93,
          "containerPos2": -71
        }, "cranePos3": {
          "0%": {
            "top": -24,
            "right": 384,
          }, "25%": {
            "top": -84,
            "right": 384,
          }, "50%": {
            "top": -242,
            "right": 96,
            // "top": -239,
            // "right": -339,
          },
          "containerPos1": -174, //-469px
          "containerPos2": -150
        }, 
      }, "carPos1": {
        // "carPosX75%": -210,
        "carPosY75%": -74
      }, "carPos2": {
        // "carPosX75%": 158,
        "carPosY75%": 2
      }
    };
    
    let railwayAndTrainPosition = {
      "0%": {
        "top": Number(getComputedStyle(railwayAndTrainBlock).top),
        "right": Number(getComputedStyle(railwayAndTrainBlock).right),
      }, "100%": {
        "top": 576,
        "right": 600
      }
    }; // создаем объект с анимацией

    // Прописываю анимацию в тег <style>
    styleBlock.innerHTML += `
      @keyframes trainStart {
        0% {
          top: ${Number(getComputedStyle(railwayAndTrainBlock).top)}px;
          right: ${Number(getComputedStyle(railwayAndTrainBlock).right)}px;
        } 100% {
          top: 331px;
          right: -150px;
        }
      }
    `; // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        carriage.setAttribute("position-X", "254");
        carriage.setAttribute("position-Y", "97");
        carriage.setAttribute("position-X2", "202");
        carriage.setAttribute("position-Y2", "70");
      } else if (carriage.classList.contains("railway-carriage-2")) {
        carriage.setAttribute("position-X", "111");
        carriage.setAttribute("position-Y", "20");
        carriage.setAttribute("position-X2", "59");
        carriage.setAttribute("position-Y2", "-10");
      } else if (carriage.classList.contains("railway-carriage-3")) {
        carriage.setAttribute("position-X", "-33");
        carriage.setAttribute("position-Y", "-61");
        carriage.setAttribute("position-X2", "-87");
        carriage.setAttribute("position-Y2", "-91");
      }
    });
    
    car1.setAttribute("position-X", "68");
    car1.setAttribute("position-Y", "31");
    car2.setAttribute("position-X", "223");
    car2.setAttribute("position-Y", "116");
    
    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj, freezeGame);
    
    gameTimer(level, gameRecord);
    
    if (level <= 3) {
      level + 1;
    }
    
    console.log(705);
  }/*  else if (document.body.clientWidth < 651 && window.screen.orientation.type == "landscape-primary") {
    let size = 650 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    let styleBlock = document.querySelector("#minigame-style");
    
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let dataObj = {
      "cranePos1": {
        "craneStartPosX": -100,
        "craneStartPosY": -79,
      }, "cranePos2": {
        "craneStartPosX": 210,
        "craneStartPosY": -143,
      }, "cranePos3": {
        "craneStartPosX": 315,
        "craneStartPosY": -200,
      }, "containerAnim" : {
        "cranePos1": {
          "0%": {
            "top": -23,
            "right": -54,
          }, "33%": {
            "top": -83,
            "right": -54,
          },
          "containerPos1": -15,
          "containerPos2": 6
        }, "cranePos2": {
          "0%": {
            "top": -23,
            "right": -54,
          }, "25%": {
            "top": -83,
            "right": -54,
          }, "50%": {
            "top": -155,
            "right": -194,
          },
          "containerPos1": -91,
          "containerPos2": -71
        }, "cranePos3": {
          "0%": {
            "top": -23,
            "right": -54,
          }, "25%": {
            "top": -83,
            "right": -54,
          }, "50%": {
            "top": -239,
            "right": -339,
          },
          "containerPos1": -173, //-469px
          "containerPos2": -150
        }, 
      }
    };
    
    let railwayAndTrainPosition = {
      "0%": {
        "top": Number(getComputedStyle(railwayAndTrainBlock).top),
        "right": Number(getComputedStyle(railwayAndTrainBlock).right),
      }, "100%": {
        "top": 576,
        "right": 600
      }
    }; // создаем объект с анимацией

    // Прописываю анимацию в тег <style>
    styleBlock.innerHTML += `
      @keyframes trainStart {
        0% {
          top: ${Number(getComputedStyle(railwayAndTrainBlock).top)}px;
          right: ${Number(getComputedStyle(railwayAndTrainBlock).right)}px;
        } 100% {
          top: 265px;
          right: -75px;
        }
      }
    `; // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        carriage.setAttribute("position-X", "-182");
        carriage.setAttribute("position-Y", "95");
        carriage.setAttribute("position-X2", "-233");
        carriage.setAttribute("position-Y2", "67");
      } else if (carriage.classList.contains("railway-carriage-2")) {
        carriage.setAttribute("position-X", "-322");
        carriage.setAttribute("position-Y", "20");
        carriage.setAttribute("position-X2", "-374");
        carriage.setAttribute("position-Y2", "-10");
      } else if (carriage.classList.contains("railway-carriage-3")) {
        carriage.setAttribute("position-X", "-468");
        carriage.setAttribute("position-Y", "-61");
        carriage.setAttribute("position-X2", "-520");
        carriage.setAttribute("position-Y2", "-91");
      }
    });
    
    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj);
    console.log(651);
  }  */
} mainFunc(level, gameRecord);