chrome.history.onVisited.addListener((historyItem) => {
    const visitedURL = historyItem.url;
    const timestamp = new Date().toLocaleString();

    chrome.storage.local.get(["visitedSites"], (result) => {
        let visitedSites = result.visitedSites || [];
        if(visitedURL.includes("login")){

            
            visitedSites.push({ url: visitedURL, time: timestamp });
    
            // Store only the last 100 entries to prevent excessive storage
            if (visitedSites.length > 100) {
                visitedSites.shift();
            }
    
        }
    });
});
