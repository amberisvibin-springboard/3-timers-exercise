function selectIDContainerWithoutQuerySelector() {
    return document.getElementById("container");
}

function selectIDContainerWithQuerySelector() {
    return document.querySelector("#container");
}

function selectAllWithClassSecond() {
    return document.querySelectorAll(".second");
}

function selectWithClassThirdInsideOl() {
    return document.querySelector("ol .third");
}

function addHelloToIDContainer() {
    const container = document.querySelector("#container");
    const hello = document.createElement("p");
    hello.innerText = "Hello!";
    container.append(hello);
}

function addClassMainToDivWithClassFooter() {
    const footer = document.querySelector("div.footer");
    footer.classList.add("main");
}

function removeClassMainToDivWithClassFooter() {
    const footer = document.querySelector("div.footer");
    footer.classList.remove("main");
}

function liThings() {
    const li = createLi();
    giveElementTextFour(li);
    appendElementToUl(li);
    makeAllLisInOlGreen();
}

function createLi() {
    return document.createElement("li");
}

function giveElementTextFour(element) {
    element.innerText = "four";
}

function appendElementToUl(element) {
    const ul = document.querySelector("ol");
    ul.append(element);
}

function makeAllLisInOlGreen() {
    const lis = document.querySelectorAll("ol li");
    for(let li of lis){
        li.style.backgroundColor = "green";
      }
}

function removeDivWithClassFooter() {
    const footer = document.querySelector("div.footer");
    footer.remove();
}