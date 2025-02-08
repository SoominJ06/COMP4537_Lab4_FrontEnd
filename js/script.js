class APIController {
    constructor() {
        this.xhttp = new XMLHttpRequest();
        this.outputController = new OutputController();
        this.baseUrl = "http://localhost:3001/api/definitions";
    }

    storeWord(word, desc) {
        this.xhttp.open("POST", this.baseUrl, true);
        this.xhttp.send("?word=" + word + "?desc=" + desc);
        this.xhttp.onload = () => {  // Use arrow function
            if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                this.outputController.displayStorePopup(100, "Feb 7", word, desc);
            }
        };
    }
    
    searchWord(word) {
        this.xhttp.open("GET", this.baseUrl + "/?word=" + word, true);
        this.xhttp.send();
        this.xhttp.onreadystatechange = () => {
            if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                // this.outputController.displaySearchedWord(100, fetchedWord, fetchedDesc);
            }
        };
    }
}

class InputValidator {

    static isEmpty(value) {
        return !value || value.trim() === "";
    }

    static containsNumbers(value) {
        return !/^[A-Za-z-]+$/.test(value);
    }

    static validateInput(value) {
        if (this.isEmpty(value)) return messages.inputIsEmpty;
        if (this.containsNumbers(value)) return messages.inputHasNumbers;
        return true;
    }

}

class OutputController {
    hideErrorPopup() {
        document.getElementById("errorPopupWrap").style.opacity = "0";
        document.getElementById("errorPopupWrap").style.visibility = "hidden";
    }

    displayErrorPopup(errorMsg, errorCode, reqNum) {
        document.getElementById("closeErrorPopupBtn").innerHTML = messages.ok;
        document.getElementById("numOfReqs").innerHTML = reqNum ? messages.numOfReqs.replace("%1", reqNum) : "";
        document.getElementById("errorMsg").textContent = errorCode || messages.error;
        document.getElementById("errorDesc").innerHTML = errorMsg
        document.getElementById("errorPopupWrap").style.opacity = "1";
        document.getElementById("errorPopupWrap").style.visibility = "visible";
        document.getElementById("closeErrorPopupBtn").addEventListener("click", () => {
            this.hideErrorPopup();
        })
    }

    hideStorePopup() {
        document.getElementById("storeOutputWrap").style.opacity = "0";
        document.getElementById("storeOutputWrap").style.visibility = "hidden";
    }

    displayStorePopup(reqNum, updatedTime, storedWord, storedDesc) {
        document.getElementById("closeStoreOutput").innerHTML = messages.ok;
        document.getElementById("numOfReqs").innerHTML = messages.numOfReqs.replace("%1", reqNum);
        document.getElementById("lastUpdated").innerHTML = messages.lastUpdated.replace("%1", updatedTime);
        document.getElementById("storeSuccessful").innerHTML = messages.newEntry;
        document.getElementById("storedWord").innerHTML = messages.storedWord.replace("%1", storedWord).replace("%2", storedDesc);
        document.getElementById("storeOutputWrap").style.opacity = "1";
        document.getElementById("storeOutputWrap").style.visibility = "visible";
        document.getElementById("closeStoreOutput").addEventListener("click", () => {
            this.hideStorePopup();
        });
    }

    displaySearchedWord(reqNum, word, desc) {
        document.getElementById("searchOutputWrap").style.display = "block";
        document.getElementById("numOfReqs").innerHTML = messages.numOfReqs.replace("%1", reqNum);
        document.getElementById("fetchedWord").innerText = word;
        document.getElementById("fetchedDesc").innerText = desc;
    }
}

class UI {
    constructor(currLocation) {
        this.xhr = new APIController();
        this.inputValidator = new InputValidator();
        this.outputController = new OutputController();
        this.init(currLocation);
    }

    // Initializes UI with corresponding page
    init(currLocation) {
        const currPage = currLocation.pathname;
        if (currPage.includes("store")) {
            this.initStore();
        } else if (currPage.includes("search")) {
            this.initSearch();
        }
    }

    // Page initializations
    initStore() {
        document.getElementById("prompt").innerHTML = messages.storePrompt;
        document.getElementById("wordInputLabel").innerHTML = messages.storeWordInput;
        document.getElementById("descriptionInputLabel").innerHTML = messages.storeDescInput;
        this.initStoreBtn();
    }

    initSearch() {
        document.getElementById("prompt").innerHTML = messages.searchPrompt;
        document.getElementById("searchInput").placeholder = messages.searchInput;
        this.initSearchBtn();
    }

    // Button initializations
    initStoreBtn() {
        document.getElementById("submitBtn").innerHTML = messages.submitBtn;
        document.getElementById("submitBtn").addEventListener("click", (e) => {
            e.preventDefault();
            const word = document.getElementById("wordInput").value;
            const desc = document.getElementById("descriptionInput").value;
            const validatedWord = this.inputValidator.validateInput(word);
            const validatedDesc = this.inputValidator.validateInput(desc);
            if (validatedWord != true) {
                this.outputController.displayErrorPopup(validatedWord);
                return;
            } else if (validatedDesc != true) {
                this.outputController.displayErrorPopup(validatedDesc);
                return;
            }
            this.xhr.storeWord(word, desc);
        });
    }

    initSearchBtn() {
        document.getElementById("searchBtn").innerHTML = messages.searchBtn;
        document.getElementById("searchBtn").addEventListener("click", (e) => {            
            e.preventDefault();
            const word = document.getElementById("searchInput").value;
            const validatedWord = this.inputValidator.validateInput(word)
            if (validatedWord != true) {
                this.outputController.displayErrorPopup(validatedWord);
                return;
            }
            this.xhr.searchWord(word);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new UI(window.location);
});