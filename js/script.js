class APIController {
    constructor() {
        this.xhttp = new XMLHttpRequest();
    }

    storeWord(word, desc) {
        this.xhttp.open("POST", "placeholderLink", true);
        this.xhttp.send("word=" + word + "?desc=" + desc);
        this.xhttp.onload = function() {
            document.getElementById("storeOutputWrap").style.visibility = "visible";
            document.getElementById("storeOutputWrap").style.opacity = "1";

            // Insert response onto document.getElementById("storeOutputMsg")
            document.getElementById("storeOutputMsg").innerHTML = "Example Output Message"
        }
    }
    
    searchWord(word) {
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
        this.initStoreBtn();
        this.initStorePopupCloseBtn();
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
            this.xhr.storeWord(word, desc);
        });
    }

    initStorePopupCloseBtn() {
        document.getElementById("closeStoreOutput").innerHTML = messages.storePopupCloseBtn;
        document.getElementById("closeStoreOutput").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("storeOutputWrap").style.opacity = "0";
            document.getElementById("storeOutputWrap").style.visibility = "hidden";
        })
    }

    initSearchBtn() {
        document.getElementById("searchBtn").innerHTML = messages.searchBtn;
        document.getElementById("searchBtn").addEventListener("click", (e) => {            
            e.preventDefault();
            const word = document.getElementById("searchInput").value;
            this.xhr.searchWord(word);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new UI(window.location);
});