class APIController {
    constructor() {
        this.xhttp = new XMLHttpRequest();
    }

    reqStoreWord(word, desc) {
        this.xhttp.open("POST", "placeholderLink", true);
        this.xhttp.send("word=" + word + "?desc=" + desc);
        this.xhttp.onload = function() {
            // Insert response onto store.html
        }
    }

    storeWord() {
        const word = document.getElementById("wordInput").value;
        const desc = document.getElementById("descriptionInput").value;
        this.reqStoreWord(word, desc);
    }

    reqSearchWord(word) {
        this.xhttp.open("GET", "placeholderLink" + word, true);
        this.xhttp.send();
        
        this.xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("searchOutputWrap").style.display = "block";
                // Grab word, insert into document.getElementById("fetchedWord")
                // Grab description, insert into document.getElementById("fetchedDesc")
            }
        };
    }
    
    searchWord() {
        const word = document.getElementById("searchInput").value;
        this.reqSearchWord(word);
    }
}

class UI {
    constructor(currLocation) {
        this.xhr = new APIController();
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
        document.getElementById("submitBtn").innerHTML = messages.submitBtn;
        document.getElementById("submitBtn").addEventListener("click", (e) => {
            e.preventDefault();
            this.xhr.storeWord();
        });
    }

    initSearch() {
        document.getElementById("prompt").innerHTML = messages.searchPrompt;
        document.getElementById("searchInput").placeholder = messages.searchInput;
        document.getElementById("searchBtn").innerHTML = messages.searchBtn;
        document.getElementById("searchBtn").addEventListener("click", (e) => {
            e.preventDefault();
            this.xhr.searchWord();
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new UI(window.location);
});