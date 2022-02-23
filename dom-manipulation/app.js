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
    
}