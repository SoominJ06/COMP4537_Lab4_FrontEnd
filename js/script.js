class UI {
    constructor(currLocation) {
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
    }

    initSearch() {
        document.getElementById("prompt").innerHTML = messages.searchPrompt;
        document.getElementById("searchInput").placeholder = messages.searchInput;
        document.getElementById("searchBtn").innerHTML = messages.searchBtn;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new UI(window.location);
});