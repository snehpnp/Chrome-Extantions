document.addEventListener("DOMContentLoaded", () => {
    const urlList = document.getElementById("urlList");
    const clearHistoryButton = document.getElementById("clearHistory");

    // Fetch and display visited URLs
    chrome.storage.local.get(["visitedSites"], (result) => {
        let visitedSites = result.visitedSites || [];


        if (visitedSites.length === 0) {
            urlList.innerHTML = `<tr><td colspan="3" style="text-align: center;">No browsing activity recorded.</td></tr>`;
            return;
        }

        console.log(visitedSites);

        urlList.innerHTML = visitedSites
            .map((entry, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entry.time}</td>
                    <td><a href="${entry.url}" target="_blank">${entry.url}</a></td>
                 
                  <td>${JSON.stringify(entry.data, null, 2)}</td>


                    <td></td><button class="delete" data-index="${index}">Delete</button></td>
                </tr>
            `)
            .join("");
    });

    // Clear history function
    clearHistoryButton.addEventListener("click", () => {
        chrome.storage.local.set({ visitedSites: [] }, () => {
            urlList.innerHTML = `<tr><td colspan="3" style="text-align: center;">History cleared.</td></tr>`;
        });
    });
});
