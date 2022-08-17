console.log("Manage links start");

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);

  switch (command) {
    case "awesome-link":
      console.log(`Command awesome-link`);
      managedLink("awesome");
      break;
    case "cool-link":
      console.log(`Command cool-link`);
      managedLink("cool");
      break;
    case "ok-link":
      console.log(`Command ok-link`);
      managedLink("ok");
      break;
    default:
      console.log(`${command} not found`);
  }

  //   chrome.scripting.executeScript({
  //     file: "content.js",
  //   });
});

// chrome.action.onClicked.addListener(function (tab) {
//   chrome.scripting.executeScript({
//     files: ["content.js"],
//     target: { tabId: tab.id },
//   });
// });

// document.getElementsById("create-folders-id").addEventListener("click", () => {
//   const folderNames = ["awesome", "cool", "ok"];
//   createFolderLinks(folderNames);
// });

// createFolderLinks = (folderNames) => {
//   for (folderName of folderNames) {
//     chrome.bookmarks.create({
//       title: folderName,
//     });
//   }
// };

managedLink = (name) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    // console.log(`tab "${currentTab}" triggered`);

    chrome.bookmarks.getTree(async (bookmarks) => {
      createBookmarksInGoodFolder(bookmarks);
    });

    function createBookmarksInGoodFolder(bookmarks) {
      for (bookmark of bookmarks) {
        if (bookmark.title === name) {
          chrome.bookmarks.create({
            parentId: bookmark.id,
            title: currentTab.title,
            url: currentTab.url,
          });
        } else if (bookmark.children) {
          createBookmarksInGoodFolder(bookmark.children);
        }
      }
    }

    // For more after bookmark created.
    //   createBookmark.then(onCreated);
    // function onCreated(node) {
    //   console.log(`Node "${node}" `);

    //   //chrome.bookmarks.move(node.id, { parentId: "2" });
    // }
  });
};
