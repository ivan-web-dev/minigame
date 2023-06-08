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
    containerBlock = Number(getComputedStyle(containerBlock).right.replace('px', '').replace('-', ''));
    let containerPositionX = Number(getComputedStyle(activeElements[0]).right.replace('px', ''));
    let carriagePositionX = Number(getComputedStyle(activeElements[1]).right.replace('px', '').replace('-', ''));
    
    let rightNow = `${(containerBlock + containerPositionX) - (carriagePositionX + railwayAndTrainPosition["100%"]["right"] + activeElements[0].clientWidth + activeElements[1].clientWidth- pxDifference)}px`;
    //activeElements[0].style.right = rightNow;
    
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
      } .animation1 {
        animation-name: moveContainer;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    `;
    activeElements[0].classList.add("animation1");
    
    //console.log("(containerBlock + containerPositionX) - (carriagePositionX + railwaysCarriagesBlock + carriage.clientWidth - scaleDifference) = ", containerBlock, containerPositionX, carriagePositionX, railwayAndTrainPosition["100%"]["right"], activeElements[0].clientWidth, activeElements[1].clientWidth, pxDifference, rightNow);
  }

  function gameLogic(pxDifference, railwayAndTrainPosition, railwayAndTrainBlock, styleBlock) {
    let containerBlock = document.querySelector(".minigame-containers-block"); // получаем родительский блок с контейнерами
    let containers = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
    let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
    let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением
    let activeElements = [];

    setTimeout(() => {
      lockBg.classList.add("minigame-lock_active");
      
      function FirstAnimateAndClicks() {
        containers.forEach((container) => {
          let containerZIndex = Number(getComputedStyle(container).zIndex);
          container.classList.add("minigame-container_bg");
          container.style.zIndex = `${containerZIndex + 101}`;

          container.addEventListener("click", (event) => {
            let containerActive = container;
            activeElements.push(containerActive);
            railwayAndTrainBlock.style.zIndex = `101`;

            containers.forEach((containerNoActive) => {
              if (containerNoActive !== containerActive) {
                let containerZIndexNow = Number(getComputedStyle(containerNoActive).zIndex);

                containerNoActive.classList.remove("minigame-container_bg");
                containerNoActive.style.zIndex = `${containerZIndexNow - 101}`;
              }
            });

            railwaysCarriages.forEach((carriage) => {
              let carriageZIndex = Number(getComputedStyle(carriage).zIndex);
              carriage.classList.add("minigame-container_bg");
              carriage.style.zIndex = `${carriageZIndex + 101}`

              carriage.addEventListener("click", (event) => {
                let carriageActive = carriage;
                activeElements.push(carriageActive);

                moveContainer(pxDifference, railwayAndTrainPosition, containerBlock, activeElements, styleBlock);
                
                railwaysCarriages.forEach((carriageNoActive) => {
                  if (carriageNoActive !== carriageActive) {
                    let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex);

                    carriageNoActive.classList.remove("minigame-container_bg");
                    carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`;
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
    };
    
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
    `;
    
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