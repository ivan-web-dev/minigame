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
let objects = {
  ship, craneHeader, craneFooter
};

function mainFunc() {
  function randomSpawnContainers() {
    let containers = document.querySelector(".minigame-containers-block"); // Получаем блок с контейнерами 
    let containerColors = ["red", "blue", "yellow"]; // Создаем список доступных цветов
    let containerQuantity = 12 + 1; // Количество созданных контейнеров

    for (let i = 1; i < containerQuantity; i++) { // Цикл до количества контейнеров
      let containerColorNow = Math.floor(Math.random() * 3); // Получаем рандомный индекс массива

      containerColorNow = containerColors[containerColorNow]; // Получаем цвет по индексу

      containers.innerHTML += `<img src="./images/container-${containerColorNow}.png" class="minigame-container minigame-container-${i}" alt="" id="${i}">`; // Создаем контейнер
    }
  } randomSpawnContainers();

  function calculateProperties(size) {
    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  }
  
  function moveContainer(railwayAndTrainPosition, activeElements, styleBlock, container33) {
    if (activeElements[0].classList.contains("minigame-container") && activeElements[1].classList.contains("minigame-railway-carriage")) {
      let positionX = activeElements[1].getAttribute("position-x");
      let positionY = activeElements[1].getAttribute("position-y");
      
      containerID = activeElements[0].getAttribute("id");
      
      //console.log(positionX, positionY);
      console.log(activeElements[0], activeElements[1]);

      container66 = container33 - (positionY);
  
      styleBlock.innerHTML += `
        @keyframes moveContainer${containerID} {
          0% {
            top: ${getComputedStyle(activeElements[0]).top};
            right: ${getComputedStyle(activeElements[0]).right};
          } 33% {
            top: -${container33}px;
            right: ${getComputedStyle(activeElements[0]).right};
          } 66% {
            top: -${container66}px;
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
        }
      `; // создаем анимацию
      activeElements[0].classList.add(`animation-${containerID}`); // Добавляем анимацию контейнеру
      
      let OldContainers = document.querySelectorAll(".minigame-container");
      let usedContainer = [];
      let containers = [];
      
      for (let i = 0; i < OldContainers.length; i++) {
        const OldContainer = OldContainers[i];
        
        if (OldContainer !== activeElements[0] && OldContainer !== usedContainer[i]) {
          containers.push(OldContainer);
        } else {
          usedContainer.push(activeElements[0]);
        }
      }
      
      activeElements = []; // Очищаем массив с выбранными элементами
      
      console.log(containers);
      console.log(OldContainers);
      return containers;
    } else {
      alert("Выберите сначала контейнер, а потом вагонетку!");
      activeElements = []; // Очищаем массив с выбранными элементами
    }
  }

  function gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, container33) {
    let containerBlock = document.querySelector(".minigame-containers-block"); // получаем родительский блок с контейнерами
    let containers = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением
    let activeElements = []; // создаем массив для выбранных элементов
    
    setTimeout(() => { // ждем первую анимацию
      //lockBg.classList.add("minigame-lock_active"); // Подставляем затемнение
  
      function FirstAnimateAndClicks() {
        containers.forEach((container) => { // пробегаемся по контейнерам
          //let containerActive = false; // создаем переменную для выбранного контейнера
          let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
          container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
          container.style.zIndex = `${containerZIndex + 101}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров
  
          container.addEventListener("click", (event) => { // при клике на какой-либо контейнер
            //if (containerActive == false) {
              let containerActive = container; // сохраняем выбранный контейнер
              activeElements.push(containerActive); // добавляем его в массив
              railwayAndTrainBlock.style.zIndex = `101`; // увеличиваем z-index блока с поездом
              
              containers.forEach((containerNoActive) => { // перебираем контейнеры
                if (containerNoActive !== containerActive) { // если контейнер не выбранный
                  let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
  
                  containerNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                  containerNoActive.style.zIndex = `${containerZIndexNow - 100}`; // уменьшаем z-index
                } else { // если контейнер выбранный
                  let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера

                  containerNoActive.style.zIndex = `${containerZIndexNow + 10}`; // уменьшаем z-index
                }
              });
              
              railwaysCarriages.forEach((carriage) => { // пробегаемся по перевозкам
                let carriageZIndex = Number(getComputedStyle(carriage).zIndex); // получаем z-index перевозки
                carriage.classList.add("minigame-container_bg"); // добавляем свечение
                carriage.style.zIndex = `${carriageZIndex + 101}` // добавляем z-index перевозке
                
                
                if (carriage.classList.contains("railway-carriage-1")) {
                  carriage.setAttribute("position-X", "100");
                  carriage.setAttribute("position-Y", "122");
                } else if (carriage.classList.contains("railway-carriage-2")) {
                  carriage.setAttribute("position-X", "-52");
                  carriage.setAttribute("position-Y", "37");
                } else if (carriage.classList.contains("railway-carriage-3")) {
                  carriage.setAttribute("position-X", "-207");
                  carriage.setAttribute("position-Y", "-47");
                }
  
                carriage.addEventListener("click", (event) => { // при клике на перевозку
                  let carriageActive = carriage; // сохраняем выбранную перевозку
                  activeElements.push(carriageActive); // добавляем её в массив
  
                  containers = moveContainer(railwayAndTrainPosition, activeElements, styleBlock, container33); // вызываем функцию
  
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
                  
                  containers.forEach((containerNoActive) => { // перебираем контейнеры
                    if (containerNoActive !== containerActive) { // если контейнер не выбранный
                      let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера
      
                      containerNoActive.classList.add("minigame-container_bg"); // удаляем свечение
                      containerNoActive.style.zIndex = `${containerZIndexNow + 100}`; // уменьшаем z-index
                    }
                  });
  
                  activeElements = []; // Очищаем массив с выбранными элементами
                });
              });
            /* } else {
              alert("Вы уже выбрали контейнер, теперь выберите вагонетку!");
            } */
          });
        });
      }; FirstAnimateAndClicks();
    }, 1000);
  };

  if (document.body.clientWidth < 1921 && document.body.clientWidth >= 1280) {
    let size = 1920 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    calculateProperties(size);

    let styleBlock = document.querySelector("#minigame-style");
    let railwayAndTrainBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом и перевозками
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
    
    let container33 = 220;

    gameLogic(railwayAndTrainPosition, railwayAndTrainBlock, styleBlock, container33);
    console.log(1280);
  } else if (document.body.clientWidth < 1280 && document.body.clientWidth >= 960) {
    let size = 1280 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    console.log(960);
  } else if (document.body.clientWidth < 960 && document.body.clientWidth >= 705 && document.body.clientHeight > 500) {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    console.log(705);
  } else if (document.body.clientWidth < 651 && window.screen.orientation.type == "landscape-primary") {
    let size = 650 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    console.log(651);
  } else if (document.body.clientWidth < 960 && window.screen.orientation.type == "landscape-primary") {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей
    calculateProperties(size);
    console.log(960 + " + landscape-primary");
  }
} mainFunc();