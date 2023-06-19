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
let craneFooter = {
  "item": document.querySelector(".minigame-crane-footer"),
  "firstSizeWidth": 329,
  "firstSizeHeight": 489,
  "top": 194,
  "right": 840,
  "class": "minigame-crane-footer",
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
}
let objects = { // объект с объектами которые нужно адаптировать
  ship, craneHeader, craneFooter, craneLeg
};

function mainFunc() {
  function randomSpawnContainers() { // отвечает за рандомный цвет контейнеров
    let containers = document.querySelector(".minigame-containers-block"); // Получаем блок с контейнерами 
    let containerColors = ["red", "blue", "yellow"]; // Создаем список доступных цветов
    let containerQuantity = 12 + 1; // Количество созданных контейнеров

    for (let i = 1; i < containerQuantity; i++) { // Цикл до количества контейнеров
      let containerColorNow = Math.floor(Math.random() * 3); // Получаем рандомный индекс массива

      containerColorNow = containerColors[containerColorNow]; // Получаем цвет по индексу

      containers.innerHTML += `<img src="./images/container-${containerColorNow}.png" class="minigame-container minigame-container-${i}" alt="" id="${i}">`; // Создаем контейнер
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

  function moveContainer(railwayAndTrainPosition, activeElements, styleBlock, usedElements, containers, dataObj) { // Анимация передвижения 
    if (activeElements[0].classList.contains("minigame-container") && activeElements[1].classList.contains("minigame-railway-carriage")) { // проверка правильно ли выбраны элементы
      carriageCount = activeElements[1].getAttribute("count"); // получаем уровень заполнения перевозки
      let craneBlock = document.querySelector(".crane-block"); // получаем блок с краном
      let rope = document.querySelector(".rope"); // получаем блок с веревкой
      let carriageID = activeElements[1].getAttribute("id"); // получаем ID перевозки
      let positionX; // итоговая позиция контейнера по X
      let positionY; // итоговая позиция контейнера по Y
      let craneBlockPosition; // позиция блока с краном
      let ropeAnim; // номер для анимации веревки
      
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
      
      /* if (craneBlockPosition == 1) { // если позиция крана равна 1
        containerPos1 = containerPos1; // оставляем позицию контейнера по Y
        containerPos2 = containerPos2; // оставляем позицию контейнера по Y
      } else if (craneBlockPosition == 2) { // если позиция крана равна 2
        containerPos1 = containerPos1 - 79; // изменяем позицию контейнера по Y
        containerPos2 = containerPos2 - 79; // изменяем позицию контейнера по Y
      } else { // если позиция крана равна 3
        containerPos1 = containerPos1 - 144; // изменяем позицию контейнера по Y
        containerPos2 = containerPos2 - 144; // изменяем позицию контейнера по Y
      } */

      if (ropeAnim == 1) {
        rope.classList.add("ropeStart");
        
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
      }  else if (craneBlockPosition == 2) {
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
      }
      
      activeElements[0].classList.add(`animation-${containerID}`); // Добавляем анимацию контейнеру
      activeElements[1].setAttribute("count", Number(carriageCount) + 1);
      usedElements.push(activeElements[0]);
      //console.log(usedElements);

      activeElements = []; // Очищаем массив с выбранными элементами
      
      if (ropeAnim == 1) {
        setTimeout(() => {
          rope.classList.add("ropeEnd");
          rope.classList.remove("ropeStart");
          rope.classList.remove("ropeStart2");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      } else {
        setTimeout(() => {
          rope.classList.add("ropeEnd2");
          rope.classList.remove("ropeStart2");
          rope.classList.remove("ropeStart");
        }, craneBlockPosition == 1 ? 4000 : 5000);
      }
    } else {
      //alert("Выберите сначала контейнер, а потом вагонетку!");
      activeElements = []; // Очищаем массив с выбранными элементами
    }
  }

  function gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj) {
    let containerBlock = document.querySelector(".minigame-containers-block"); // получаем родительский блок с контейнерами
    let containersAll = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением
    let activeElements = []; // создаем массив для выбранных элементов
    let usedElements = [];
    let containers = [];
    let containerZIndexAll = 150;
    
    containersAll.forEach((container) => {
      containers.push(container);
    });

    setTimeout(() => { // ждем первую анимацию
      //lockBg.classList.add("minigame-lock_active"); // Подставляем затемнение

      // function FirstAnimateAndClicks() {
        containers.forEach((container) => { // пробегаемся по контейнерам
          if (usedElements.length >= 1) {
            usedElements.forEach((element) => {
              if (element !== container) {
                let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
                container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
                container.style.zIndex = `${containerZIndex + 21}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров
              }
            });
          } else {
            let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
            container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
            container.style.zIndex = `${containerZIndex + 21}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров
          }

          container.addEventListener("click", (event) => { // при клике на какой-либо контейнер
            let containerActive = container; // сохраняем выбранный контейнер
            let containerID = container.getAttribute("id");
            let result = true;
            
            if (usedElements.length !== 0) {
              usedElements.forEach((element) => {
                if (element == containerActive) {
                  activeElements = [];
                  result = false;
                  
                  alert("Вы уже переложили этот контейнер! Выберите другой");
                  return;
                }
              });
            };
            
            if (result) {
              if (activeElements.length || activeElements == undefined) {
                alert("Вы уже выбрали контейнер, теперь выберите транспорт");
                console.log("alert: " + activeElements);
              } else {
                activeElements.push(containerActive); // добавляем его в массив
  
                containers.forEach((containerNoActive) => { // перебираем контейнеры
                  if (containerNoActive !== containerActive) { // если контейнер не выбранный
                    let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
  
                    containerNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                    containerNoActive.style.zIndex = `${containerZIndexNow - 20}`; // уменьшаем z-index
                  } else { // если контейнер выбранный
                    let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
  
                    containerNoActive.style.zIndex = `${containerZIndexNow + 10}`; // уменьшаем z-index
                  }
                });
              };
  
              railwayAndTrainBlock.style.zIndex = `101`; // увеличиваем z-index блока с поездом
  
              railwaysCarriages.forEach((carriage) => { // пробегаемся по перевозкам
                let carriageZIndex = Number(getComputedStyle(carriage).zIndex); // получаем z-index перевозки
                carriage.classList.add("minigame-container_bg"); // добавляем свечение
                carriage.style.zIndex = `${carriageZIndex + 101}` // добавляем z-index перевозке
  
                
                carriage.addEventListener("click", (event) => { // при клике на перевозку
                  let carriageActive = carriage; // сохраняем выбранную перевозку
                  let newContainers = [];
                  
                  activeElements.push(carriageActive); // добавляем её в массив
                  
                  moveContainer(railwayAndTrainPosition, activeElements, styleBlock, usedElements, containers, dataObj); // вызываем функцию
                  
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
                    if (carriageNoActive !== carriageActive) { // если не активная перевозка
                      let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index
    
                      carriageNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                      carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем z-index
                    } if (carriageNoActive == carriageActive) { // Если перевозка активная
                      let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index
    
                      carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем z-index
                    }
                  });
    
                  // setTimeout(() => {
                    containers.forEach((containerNoActive) => { // перебираем контейнеры
                      let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
      
                      if (containerZIndexNow < 70) {
                        containerNoActive.classList.add("minigame-container_bg"); // добавляем свечение
                        containerNoActive.style.zIndex = `${containerZIndexNow + 21}`; // повышаем z-index
                      }
                    });
                  // }, 800);
    
                  activeElements = []; // Очищаем массив с выбранными элементами  
                });
              });
            };
          });
        });
      // }; FirstAnimateAndClicks();
    }, 1000);
  };

  if (document.body.clientWidth < 1921 && document.body.clientWidth >= 1280) {
    let size = 1920 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    calculateProperties(size);

    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    
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
          top: ${Number(getComputedStyle(railwayAndTrainBlock).top)};
          right: ${Number(getComputedStyle(railwayAndTrainBlock).right)};
        } 100% {
          top: 576px;
          right: -600px;
        }
      }
    `; // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        carriage.setAttribute("position-X", "100");
        carriage.setAttribute("position-Y", "122");
        carriage.setAttribute("position-X2", "30");
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
/* 
    let containerPos1 = -47;
    let containerPos2 = -4; */

    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj);
    console.log(1280);
  } else if (document.body.clientWidth < 1280 && document.body.clientWidth >= 960) {
    let size = 1280 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    
    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
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
            "top": -10,
            "right": 294,
          }, "33%": {
            "top": -41,
            "right": 294,
          },
          "containerPos1": 20,
          "containerPos2": 20
        }, "cranePos2": {
          "0%": {
            "top": -10,
            "right": 294,
          }, "25%": {
            "top": -41,
            "right": 294,
          }, "50%": {
            "top": -105,
            "right": 174,
          },
          "containerPos1": -47,
          "containerPos2": -4
        }, "cranePos3": {
          "0%": {
            "top": -10,
            "right": 294,
          }, "25%": {
            "top": -41,
            "right": 294,
          }, "50%": {
            "top": -193,
            "right": 30,
          },
          "containerPos1": -47,
          "containerPos2": -140
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
          top: 465px;
          right: -246px;
        }
      }
    `; // добавляем анимацию

    railwaysCarriages.forEach(carriage => {
      if (carriage.classList.contains("railway-carriage-1")) {
        carriage.setAttribute("position-X", "200");
        carriage.setAttribute("position-Y", "130");
        carriage.setAttribute("position-X2", "130");
        carriage.setAttribute("position-Y2", "92");
      } else if (carriage.classList.contains("railway-carriage-2")) {
        carriage.setAttribute("position-X", "43");
        carriage.setAttribute("position-Y", "45");
        carriage.setAttribute("position-X2", "-32");
        carriage.setAttribute("position-Y2", "4");
      } else if (carriage.classList.contains("railway-carriage-3")) {
        carriage.setAttribute("position-X", "-107");
        carriage.setAttribute("position-Y", "-37");
        carriage.setAttribute("position-X2", "-178");
        carriage.setAttribute("position-Y2", "-75");
      }
    });
    
    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, dataObj);
    console.log(960);
  } else if (document.body.clientWidth < 960 && document.body.clientWidth >= 705 && document.body.clientHeight > 500) {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);let styleBlock = document.querySelector("#minigame-style");
    
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
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
          top: 331px;
          right: -150px;
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
    console.log(705);
  } else if (document.body.clientWidth < 651 && window.screen.orientation.type == "landscape-primary") {
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
  } else if (document.body.clientWidth < 960 && window.screen.orientation.type == "landscape-primary") {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);let styleBlock = document.querySelector("#minigame-style");
    
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
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
          top: 331px;
          right: -150px;
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
    console.log(960 + " + landscape-primary");
  }
} mainFunc();