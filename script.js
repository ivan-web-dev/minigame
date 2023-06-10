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

      containers.innerHTML += `<img src="./images/container-${containerColorNow}.png" class="minigame-container minigame-container-${i}" alt="">`; // Создаем контейнер
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
  
  function moveContainer(pxDifference, railwayAndTrainPosition, containerBlock, activeElements, styleBlock) {
    containerBlock = Number(getComputedStyle(containerBlock).right.replace('px', '').replace('-', ''));  // получаем X отступ блока с контейнерами
    let containerPositionX = Number(getComputedStyle(activeElements[0]).right.replace('px', '')); // Получаем X отступ выбранного контейнера
    let carriagePositionX = Number(getComputedStyle(activeElements[1]).right.replace('px', '').replace('-', '')); // Получаем X отступ выбранной перевозки
    
    let rightNow = `${(containerBlock + containerPositionX) - (carriagePositionX + railwayAndTrainPosition["100%"]["right"] + activeElements[0].clientWidth + activeElements[1].clientWidth- pxDifference)}px`; // высчитываем правый отступ
    
    styleBlock.innerHTML += `
      @keyframes moveContainer {
        0% {
          top: ${getComputedStyle(activeElements[0]).top};
          right: ${getComputedStyle(activeElements[0]).right};
        } 33% {
          top: ${-220}px;
          right: ${getComputedStyle(activeElements[0]).right};
        } 66% {
          top: ${-30}px;
          right: ${rightNow};
        } 100% {
          top: ${35}px;
          right: ${rightNow};
        }
      } .animation-1 {
        animation-name: moveContainer;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    `; // создаем анимацию
    activeElements[0].classList.add("animation-1"); // Добавляем анимацию контейнеру
    
    //console.log("(containerBlock + containerPositionX) - (carriagePositionX + railwaysCarriagesBlock + carriage.clientWidth - scaleDifference) = ", containerBlock, containerPositionX, carriagePositionX, railwayAndTrainPosition["100%"]["right"], activeElements[0].clientWidth, activeElements[1].clientWidth, pxDifference, rightNow);
  }

  function gameLogic(pxDifference, railwayAndTrainPosition, railwayAndTrainBlock, styleBlock) {
    let containerBlock = document.querySelector(".minigame-containers-block"); // получаем родительский блок с контейнерами
    let containers = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением
    let activeElements = []; // создаем массив для выбранных элементов

    setTimeout(() => { // ждем первую анимацию
      lockBg.classList.add("minigame-lock_active"); // Подставляем затемнение
      
      function FirstAnimateAndClicks() {
        containers.forEach((container) => { // пробегаемся по контейнерам
          let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
          container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
          container.style.zIndex = `${containerZIndex + 101}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров

          container.addEventListener("click", (event) => { // при клике на какой-либо контейнер
            let containerActive = container; // сохраняем выбранный контейнер
            activeElements.push(containerActive); // добавляем его в массив
            railwayAndTrainBlock.style.zIndex = `101`; // увеличиваем z-index блока с поездом

            containers.forEach((containerNoActive) => { // перебираем контейнеры
              if (containerNoActive !== containerActive) { // если контейнер не выбранный
                let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex); // получаем z-index контейнера

                containerNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                containerNoActive.style.zIndex = `${containerZIndexNow - 101}`; // уменьшаем z-index
              }
            });

            railwaysCarriages.forEach((carriage) => { // пробегаемся по перевозкам
              let carriageZIndex = Number(getComputedStyle(carriage).zIndex); // получаем z-index перевозки
              carriage.classList.add("minigame-container_bg"); // добавляем свечение
              carriage.style.zIndex = `${carriageZIndex + 101}` // добавляем z-index перевозке

              carriage.addEventListener("click", (event) => { // при клике на перевозку
                let carriageActive = carriage; // сохраняем активную
                activeElements.push(carriageActive); // добавляем её в массив

                moveContainer(pxDifference, railwayAndTrainPosition, containerBlock, activeElements, styleBlock); // вызываем функцию
                
                railwaysCarriages.forEach((carriageNoActive) => { // пробегаемся по всем перевозкам
                  if (carriageNoActive !== carriageActive) { // если не активная перевозка
                    let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index

                    carriageNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                    carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем свечение
                  }
                });
              });
            });
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
    
    gameLogic(14, railwayAndTrainPosition, railwayAndTrainBlock, styleBlock);
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