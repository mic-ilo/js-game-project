export function blinkImage(imageClass) {
  const image = document.querySelector(imageClass);
  const isVisible = true;

  // Toggle the visibility of the image every 500 milliseconds (0.5 seconds)
  let intervalId = setInterval(function () {
    image.style.visibility = isVisible ? "hidden" : "visible";
    isVisible = !isVisible;
  }, 500);

  // Stop the blinking after a second (1000 milliseconds)
  setTimeout(function () {
    clearInterval(intervalId);
    image.style.visibility = "visible";
  }, 1000);
}
