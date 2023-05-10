const refs = {
    startBtnEl: document.querySelector("button[data-start]"),
    stopBtnEl: document.querySelector("button[data-stop]"),
}

let intervalId = null;

refs.stopBtnEl.setAttribute("disabled", "");

refs.startBtnEl.addEventListener("click", () => {
    getAttrDisabled(refs.startBtnEl, refs.stopBtnEl);
    intervalId = setInterval(renderBodyColor, 1000)
})

refs.stopBtnEl.addEventListener("click", () =>{
    getAttrDisabled(refs.stopBtnEl, refs.startBtnEl);
    clearInterval(intervalId);
})

function getAttrDisabled(setDisabled, removeDisabled){
    setDisabled.setAttribute("disabled", "");
    removeDisabled.removeAttribute("disabled");
}
function renderBodyColor(){
    document.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }