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