function elementPosition() {
  if (document.body.clientWidth < 1921 && document.body.clientWidth >= 1280) {
    let size = 1920 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      let right = value.right - size; // получаем правильное значение для отступа справа

      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  } else if (document.body.clientWidth < 1280 && document.body.clientWidth >= 960) {
    let size = 1280 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  } else if (document.body.clientWidth < 960 && document.body.clientWidth >= 705 && document.body.clientHeight > 500) {
    let size = 960 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  } else if (document.body.clientWidth < 651 && window.screen.orientation.type == "landscape-primary") {
    let size = 650 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  } else if (document.body.clientWidth < 900 && window.screen.orientation.type == "landscape-primary") {
    let size = 900 - document.body.clientWidth; // разница начальной ширины экрана от текущей

    for (const [key, value] of Object.entries(objects)) { // получаем "ключ: значение"
      value.sizeWidthNow = document.querySelector(`.${value.class}`).clientWidth; // получаем ширину картинки сейчас
      value.sizeHeightNow = document.querySelector(`.${value.class}`).clientHeight; // получаем высоту картинки сейчас

      value.topNow = Number(getComputedStyle(value.item).top.replace('px', '')); // получаем отступ сверху картинки сейчас
      value.rightNow = Number(getComputedStyle(value.item).right.replace('px', '')); // получаем отступ справа картинки сейчас

      let right = value.rightNow - size; // получаем правильное значение для отступа справа
      value.item.style.right = `${right}px`; // подставляем правильное значение для отступа справа
    }
  }
} elementPosition();



function movingElements() {
  let containerBlock = document.querySelector(".minigame-containers-block"); // получаем блок с контейнерами
  let containers = document.querySelectorAll(".minigame-container"); // Получаем все контейнеры
  let railwaysCarriagesBlock = document.querySelector(".minigame-train-block"); // получаем блок с поездом
  let railwaysCarriages = document.querySelectorAll(".minigame-railway-carriage"); // получаем все перевозки
  let scaleDifference = 14; // количество пикселей от края
  let lockBg = document.querySelector(".minigame-lock"); // получаем блок с затемнением

  function findKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
      for (var j = 0; j < ss[i].cssRules.length; ++j) {

        if (ss[i].cssRules[j].name == rule) {
          return ss[i].cssRules[j].cssText;
        }
      }
    }
    return null;
  }

  let dataAnimatePosition = findKeyframesRule('trainStart');

  containerBlock = getComputedStyle(containerBlock).right.replace('px', ''); // получаем отступ блока с контейнерами с минусом
  containerBlock = Number(containerBlock.replace('-', '')); // получаем отступ блока с контейнерами с плюсом

  dataAnimatePosition = dataAnimatePosition.split('100% { top: ')[1];
  dataAnimatePosition = dataAnimatePosition.split('px; right')[1];
  dataAnimatePosition = dataAnimatePosition.split(': -')[1];
  railwaysCarriagesBlock = Number(dataAnimatePosition.split('px;')[0]);
  console.log(railwaysCarriagesBlock);

  function setPosition(container) {
    let containerPositionX = Number(getComputedStyle(container).right.replace('px', '')); // получаем отступ контейнера

    railwaysCarriages.forEach(carriage => { // пробегаемся по перевозкам
      carriage.classList.add("minigame-container_bg");

      carriage.addEventListener("click", (event) => { // при клике на перевозку
        railwaysCarriages.forEach((carriage) => {
          carriage.classList.remove("minigame-container_bg");
        });

        let carriagePositionX = getComputedStyle(carriage).right.replace('px', ''); // получаем позицию X перевозки с минусом
        carriagePositionX = Number(carriagePositionX.replace('-', '')); // получаем позицию перевозки X с плюсом

        let rightNow = `${(containerBlock + containerPositionX) - (carriagePositionX + railwaysCarriagesBlock + carriage.clientWidth + container.clientWidth - scaleDifference)}px`;

        container.style.right = rightNow;

        console.log(dataAnimatePosition);
        console.log(container, rightNow);
        console.log("(containerBlock + containerPositionX) - (carriagePositionX + railwaysCarriagesBlock + carriage.clientWidth - scaleDifference) = ", containerBlock, containerPositionX, carriagePositionX, railwaysCarriagesBlock, carriage.clientWidth, scaleDifference);
      });
    });
  };

  containers.forEach(container => {
    container.addEventListener("click", (event) => {
      containers.forEach((container) => {
        container.classList.remove('minigame-container_bg');
      });
      setPosition(container);
      // console.log(elementPositionX, elementPositionY);
    });
  });

  setTimeout(() => {
    lockBg.classList.add('minigame-lock_active');
    containers.forEach((element) => {
      element.classList.add('minigame-container_bg');
    });
  }, 6000);
} movingElements();



function moveContainer(pxDifference, railwayAndTrainPosition, containerBlock, activeElements, styleBlock, container33) {
  if (activeElements[0].classList.contains("minigame-container") && activeElements[1].classList.contains("minigame-railway-carriage")) {
    containerBlock = Number(getComputedStyle(containerBlock).right.replace('px', '').replace('-', ''));  // получаем X отступ блока с контейнерами
    let containerPositionX = Number(getComputedStyle(activeElements[0]).right.replace('px', '')); // Получаем X отступ выбранного контейнера
    let carriagePositionX = Number(getComputedStyle(activeElements[1]).right.replace('px', '').replace('-', '')); // Получаем X отступ выбранной перевозки

    container33 = 220;
    container66 = -30;
    container66 = -35;
    //let container66 = ;

    let rightNow = `${(containerBlock + containerPositionX) - (carriagePositionX + railwayAndTrainPosition["100%"]["right"] + activeElements[0].clientWidth + activeElements[1].clientWidth - pxDifference)}px`; // высчитываем правый отступ
    let topNow;

    styleBlock.innerHTML += `
      @keyframes moveContainer {
        0% {
          top: ${getComputedStyle(activeElements[0]).top};
          right: ${getComputedStyle(activeElements[0]).right};
        } 33% {
          top: -${container33}px;
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
  } else {
    alert("Выберите сначала контейнер, а потом вагонетку!");
    activeElements = []; // Очищаем массив с выбранными элементами
  }
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
        let containerActive = false; // создаем переменную для выбранного контейнера
        let containerZIndex = Number(getComputedStyle(container).zIndex); // получаем z-index каждого контейнера
        container.classList.add("minigame-container_bg"); // Даем контейнерам свечение
        container.style.zIndex = `${containerZIndex + 101}`; // Подставляем z-index выше затемнения и относительно z-index'a контейнеров

        container.addEventListener("click", (event) => { // при клике на какой-либо контейнер
          if (containerActive == false) {
            containerActive = container; // сохраняем выбранный контейнер
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
                let carriageActive = carriage; // сохраняем выбранную перевозку
                activeElements.push(carriageActive); // добавляем её в массив

                console.log(activeElements);
                moveContainer(pxDifference, railwayAndTrainPosition, containerBlock, activeElements, styleBlock); // вызываем функцию

                railwaysCarriages.forEach((carriageNoActive) => { // пробегаемся по всем перевозкам
                  if (carriageNoActive !== carriageActive) { // если не активная перевозка
                    let carriageZIndexNow = Number(getComputedStyle(carriageNoActive).zIndex); // получаем z-index

                    carriageNoActive.classList.remove("minigame-container_bg"); // удаляем свечение
                    carriageNoActive.style.zIndex = `${carriageZIndexNow - 101}`; // уменьшаем свечение
                  }
                });

                activeElements = []; // Очищаем массив с выбранными элементами
              });
            });
          } else {
            alert("Вы уже выбрали контейнер, теперь выберите вагонетку!");
          }
        });
      });
    }; FirstAnimateAndClicks();
  }, 1000);
};