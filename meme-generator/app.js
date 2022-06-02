//prevent js from trying to run on elements that dont exist
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("submit", function (event) {
    //prevent page reload upon clicking a button
    event.preventDefault();
    let memeImage = document.getElementById("meme-image");
    let topText = document.getElementById("top-text");
    let bottomText = document.getElementById("bottom-text");
    let topTextInput = document.getElementById("top-text-input");
    let bottomTextInput = document.getElementById("bottom-text-input");
    let urlInput = document.getElementById("url-input");
    if (isImgLink(urlInput.value) == true) {
      memeImage.src = urlInput.value;
    } else {
      memeImage.src = "placeholder.svg";
    }
    if (topTextInput.value !== "" && bottomTextInput.value !== "") {
      topText.innerText = topTextInput.value;
      bottomText.innerText = bottomTextInput.value;
    }
    console.log(isImgLink(urlInput.value));
    console.log(
      `${topText.innerText}, ${bottomText.innerText}, ${topTextInput.value}, ${bottomTextInput.value}`
    );
  });
});

//from https://thewebdev.info/2021/08/15/how-to-verify-that-an-url-is-an-image-url-with-javascript/
//modified to only allow web safe images
function isImgLink(url) {
  if (typeof url !== "string") {
    return false;
  }
  return url.match(/^http[^\?]*.(jpg|jpeg|gif|png|svg)(\?(.*))?$/gim) !== null;
}
