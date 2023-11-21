const createImageSlider = function (newImages, options = {}) {
  let images = newImages; // of { src, alt } objects
  let pos = options.startPos ? Number.parseInt(options.startPos) : 0;

  const nextPos = function () {
    if (pos === images.length - 1) return 0;
    return pos + 1;
  };

  const prevPos = function () {
    if (pos === 0) return images.length - 1;
    return pos - 1;
  };

  const slideXPosDiffPercent = function (newPos) {
    return `${newPos * -100}%`;
  };

  const setSlide = function (newPos) {
    if (newPos === pos) return;
    if (newPos < 0 || newPos >= images.length) return;
    pos = newPos;
    const translateXVal = slideXPosDiffPercent(newPos);
    const slides = document.querySelectorAll("[data-slide]");
    const navButtons = document.querySelectorAll(
      "[data-button='slide-nav-shortcut']"
    );
    if (slides.length === 0 || navButtons.length === 0) return;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${translateXVal})`;
    });
    navButtons.forEach((button) => {
      const targetSlidePos = Number.parseInt(button.dataset.targetSlide);
      if (pos === targetSlidePos) {
        if (button.classList.contains("bg-gray-800")) return;
        button.classList.add("bg-gray-800");
      } else {
        if (!button.classList.contains("bg-gray-800")) return;
        button.classList.remove("bg-gray-800");
      }
    });
  };

  const setNextSlide = function () {
    setSlide(nextPos());
  };

  const setPrevSlide = function () {
    setSlide(prevPos());
  };

  const handlePrevButton = function (event) {
    if (event.target.dataset.button !== "prev") return;
    setPrevSlide();
  };

  const handleNextButton = function (event) {
    if (event.target.dataset.button !== "next") return;
    setNextSlide();
  };

  const handleSlideNavButton = function (event) {
    const element = event.target;
    if (element.dataset.button !== "slide-nav-shortcut") return;
    const newSlidePos = Number.parseInt(element.dataset.targetSlide);
    setSlide(newSlidePos);
  };

  const createRoot = function () {
    const element = document.createElement("div");
    element.id = "image-slider-root";
    element.classList.add("relative");
    element.insertAdjacentHTML(
      "beforeend",
      `
      <div
        id="slides-container"
        class="bg-red-800 flex flex-row items-center w-[500px] h-[300px] overflow-hidden"
      >
      </div>
      <button
        type="button"
        class="absolute top-0 bottom-0 left-0 backdrop-blur-sm"
        data-button="prev"
      >
        <span
          class="text-8xl font-light text-gray-800 drop-shadow-lg"
          data-button="prev"
        >
          &lt;
        </span>
        <span class="absolute w-[1px] h-[1px] p-0 -m-px overflow-hidden"
          >Previous</span
        >
      </button>
      <button
        type="button"
        class="absolute top-0 bottom-0 right-0"
        data-button="next"
      >
        <span
          class="text-8xl font-light text-gray-800 drop-shadow-lg"
          data-button="next"
        >
          &gt;
        </span>
        <span class="absolute w-[1px] h-[1px] p-0 -m-px overflow-hidden"
          >Next</span
        >
      </button>
      <div
        id="slide-nav-button-container"
        class="absolute py-3 bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-x-2"
      >
      </div>
      `
    );
    return element;
  };

  const createSlide = function (pos, src, alt) {
    const element = document.createElement("div");
    const classes =
      "slide-item bg-gray-200 grow-0 shrink-0 transition-transform duration-500".split(
        " "
      );
    element.classList.add(...classes);
    element.setAttribute("data-slide", pos);
    element.insertAdjacentHTML(
      "beforeend",
      `
      <img
        src="${src}"
        alt="${alt}"
        class="w-[500px] h-[300px] object-contain"
      />
      `
    );
    return element;
  };

  const createSlideNavButton = function (currPos) {
    const element = document.createElement("button");
    const classes =
      "w-4 h-4 border-gray-800 border-[3px] rounded-full transition-transform box-shadow-lg".split(
        " "
      );
    element.classList.add(...classes);
    if (currPos === pos) element.classList.add("bg-gray-800");
    element.setAttribute("type", "button");
    element.setAttribute("data-button", "slide-nav-shortcut");
    element.setAttribute("data-target-slide", currPos);
    element.insertAdjacentHTML(
      "beforeend",
      `
      <span class="absolute w-[1px] h-[1px] p-0 -m-px overflow-hidden"
        >Go to Slide ${currPos + 1}</span
      >
      `
    );
    return element;
  };

  const initialize = function () {
    const root = createRoot();
    const slideContainer = root.querySelector("#slides-container");
    const slideNavButtonContainer = root.querySelector(
      "#slide-nav-button-container"
    );
    const slides = [];
    const slideNavButtons = [];
    for (let i = 0; i < images.length; i++) {
      const { src, alt } = images[i];
      slides.push(createSlide(i, src, alt));
      slideNavButtons.push(createSlideNavButton(i));
    }
    slideContainer.replaceChildren(...slides);
    slideNavButtonContainer.replaceChildren(...slideNavButtons);
    slideNavButtonContainer.addEventListener("click", handleSlideNavButton);
    root.addEventListener("click", (event) => {
      handlePrevButton(event);
      handleNextButton(event);
    });
    return root;
  };

  return {
    slider: initialize(),
    setNextSlide,
  };
};

const srcImages = [
  {
    src: "https://i.kym-cdn.com/photos/images/original/001/923/879/6e0",
    alt: "poggers",
  },
  {
    src: "https://i.kym-cdn.com/photos/images/original/001/857/750/4ab.png",
    alt: "sadge",
  },
  {
    src: "https://i.kym-cdn.com/photos/images/original/001/923/989/441",
    alt: "pepega",
  },
];

window.addEventListener("load", function (event) {
  const appRoot = document.querySelector("#root");
  const { slider, setNextSlide } = createImageSlider(srcImages);
  appRoot.appendChild(slider);

  setInterval(setNextSlide, 5000);
});
