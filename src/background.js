console.log("test");

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
});

managedLink = (name) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    // console.log(`tab "${currentTab}" triggered`);

    chrome.bookmarks.getTree(function (bookmarks) {
      var bookmark = findBookmarks(bookmarks);
      console.log(
        `bookmark choose "${bookmark.title} ${bookmark.id}" triggered`
      );
      if (!bookmark) {
        console.log(`Folder bookmark not found: "${name}" `);
        chrome.bookmarks.create(
          {
            title: name,
          },
          (newFolder) => {
            console.log(
              `added folder: "${newFolder.title}" triggered, "${currentTab.title}"`
            );
            chrome.bookmarks.create({
              parentId: newFolder.id,
              title: currentTab.title,
              url: currentTab.url,
            });
          }
        );
      }
    });

    function findBookmarks(bookmarks) {
      return bookmarks.forEach(function (bookmark) {
        if (bookmark.title === name) {
          console.log(`bookmarkId "${bookmark.title} ${bookmark.id}" `);

          var createBookmark = chrome.bookmarks.create({
            parentId: bookmark.id,
            title: currentTab.title,
            url: currentTab.url,
          });

          return createBookmark;
        } else if (bookmark.children) {
          findBookmarks(bookmark.children);
        }
      });
    }

    // For more after bookmark created.
    //   createBookmark.then(onCreated);
    // function onCreated(node) {
    //   console.log(`Node "${node}" `);

    //   //chrome.bookmarks.move(node.id, { parentId: "2" });
    // }
  });
};
