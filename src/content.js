// document
//   .getElementsById("create-folders-id")[0]
//   .addEventListener("click", () => {
//     const folderNames = ["awesome", "cool", "ok"];
//     createFolderLinks(folderNames);
//   });

createFolderLinks = (folderNames) => {
  for (folderName of folderNames) {
    chrome.bookmarks.create({
      title: folderName,
    });
  }
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    var checkButton = document.getElementById("create-folders-id");
    checkButton.addEventListener(
      "click",
      () => {
        const folderNames = ["awesome", "cool", "ok"];
        createFolderLinks(folderNames);
      },
      false
    );
  },
  false
);
