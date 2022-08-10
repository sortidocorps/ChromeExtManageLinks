console.log('test');

chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command "${command}" triggered`);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let currentTab = tabs[0];
        console.log(`tab "${currentTab}" triggered`);

        chrome.bookmarks.create(
            {
                'title': 'hot'
            },
            newFolder => {
                console.log(`added folder: "${newFolder.title}" triggered, "${currentTab.title}"`);
                chrome.bookmarks.create(
                    {
                        'parentId': newFolder.id,
                        'url': currentTab.url,
                        'title': currentTab.title
                    }
                );
            },
        );
    });
});