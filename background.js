console.log("test");

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    console.log(`tab "${currentTab}" triggered`);

    chrome.bookmarks.getTree(function (bookmarks) {
      printBookmarks(bookmarks);
    });

    function printBookmarks(bookmarks) {
      bookmarks.forEach(function (bookmark) {
        if (bookmark.title === "hot") {
          console.log(`bookmarkId "${bookmark.title} ${bookmark.id}" `);
          chrome.bookmarks.create((newFolder) => {
            console.log(
              `added folder: "${newFolder.title}" triggered, "${currentTab.title}"`
            );
            chrome.bookmarks.create({
              parentId: bookmark.id,
              url: currentTab.url,
              title: currentTab.title,
            });
          });
          return;
        }
        if (bookmark.children) printBookmarks(bookmark.children);
      });
    }

    // function onFulfilled(bookmarkItems) {
    //   for (item of bookmarkItems) {
    //     console.log(`Item "${item.title}" bookmark`);
    //   }
    // }

    // function onRejected(error) {
    //   console.log(`An error: ${error}`);
    // }

    // var searching = chrome.bookmarks.search({});

    // searching.then(onFulfilled, onRejected);

    // chrome.bookmarks.getTree(function (tree) {
    //   console.log(`An error: "${tree[0].children[1].title}"`);
    //   var searching = chrome.bookmarks.search({ id: tree[0].children[1].id });

    //   searching.then(onFulfilled, onRejected);
    // });

    // chrome.bookmarks.create(
    //   {
    //     title: "hot",
    //   },
    //   (newFolder) => {
    //     console.log(
    //       `added folder: "${newFolder.title}" triggered, "${currentTab.title}"`
    //     );
    //     chrome.bookmarks.create({
    //       parentId: newFolder.id,
    //       url: currentTab.url,
    //       title: currentTab.title,
    //     });
    //   }
    // );
  });
});
