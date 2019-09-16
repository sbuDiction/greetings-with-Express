var inputName = document.querySelector(".input");
var greetBtn = document.querySelector(".greetButton");
var ouput = document.querySelector(".box");
var radioType = document.querySelector(".languageType");
var counting = document.querySelector(".greetCounts");
var resetElem = document.querySelector(".resetBtn");

if (localStorage["Names"]) {
    var nameStorage = JSON.parse(localStorage["Names"]);
}
var instance = Greetings(nameStorage);
counting.innerHTML = instance.count();

function greetMe() {
    var radioBtn = document.querySelector("input[name='radioType']:checked");
    if (radioBtn) {
        var LangType = radioBtn.value;
    }
    //if (inputName.value !== "") {
        var getName = instance.greet(inputName.value, LangType)
        ouput.innerHTML = getName;
        localStorage["Names"] = JSON.stringify(instance.objectName())
        counting.innerHTML = instance.count();
        inputName.value = "";

    }
//}

function clear() {
    localStorage.clear();
    counting.innerHTML = 0;
    instance.remove();
}

resetElem.addEventListener("click", clear)
greetBtn.addEventListener("click", greetMe);