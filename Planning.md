# Planning

## MVP Requirements

- a web component
  - that takes in a string array of 1+ image URLs
  - displays 1 image at a time
  - has a next button that
    - switches the displayed image to the following image in line if the currently displayed image is not the last image of the collection
    - switches the displayed image to the first image if the currently displayed image is the last image of the collection
  - has a previous button that
    - switches the displayed image to the image before the currently displayed image if the currently displayed image is not the first image of the collection
    - switches the displayed image to the last image if the currently displayed image is the first image of the collection
  - has a shortcut navigation dot button for each image of the collection
    - switches the displayed image to whichever specific image the navigation button refers to
  - has a timeout or timer that automatically switches to the next image every 5 seconds
    - clicking any of the following buttons resets the timer for auto-switching the currently displayed image:
      - previous button
      - next button
      - any navigation dot button that references an image of the collection

## Pseudocode

- state
  - `images`: string array of image URLs
  - `position`: int index in `images` in range [0, `images.length`] that represents the currently displayed image
- function `nextPos(startPos)`
  - if `startPos` == size of `images` - 1, return 0
  - return `startPos` + 1
- function `prevPos(startPos)`
  - if `startPos` == 0, return size of `images` - 1
  - return `startPos` - 1
- function `slideXPositionDiffPercentage(newPos)`
  - return (`newPos` * -100) appended with `%` as a string
- function `setImage(newPosition)`
  - `position` = `newPosition`
  - `xMoveDistPercentage` = `translateXPositionDiff()`
  - add CSS style property `transform: translateX(${slideXPositionDiffPerecentage(position)})` to all slide (root) element containers
- function `setNextImage()`
  - TODO
- function `setPrevImage()`
  - TODO
- function `createSlideNavButton(imageURL)`
  - TODO
- function `handlePreviousButtonClick(event)`
  - TODO
- function `handleNextButtonClick(event)`
  - TODO
- function `handleSlideNavButtonClick(event)`
  - TODO
- function `handleButtonClick(event)`
  - TODO
- function `createImageSlider(imageURLs, options)`
  - TODO
