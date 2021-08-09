const siteReg = "([^/]+)(?=/[^/]+/?$)";
const linkReg = "[^/]*$";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(
    {
      id: "modernCampus",
      title: "Modern Campus",
      contexts: ["all"],
    },
    function () {
      chrome.contextMenus.create(
        {
          title: "Open Published Page",
          id: "openPubPage",
          parentId: "modernCampus",
          contexts: ["link"],
        },
        function () {}
      );
    }
  );
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "openPubPage":
      openPublishedPage(info.linkUrl);
      break;
  }
});

function openPublishedPage(linkUrl) {
  console.log(linkUrl);
  let site = linkUrl.match(siteReg)[0];
  let link = linkUrl.match(linkReg)[0].replace("dispatch", "");
  fetch(
    `http://a.cms.omniupdate.com/files/published?site=${site}&path=${link}`
  ).then((res) =>
    res
      .json()
      .then((data) =>
        chrome.tabs.create({ url: data.products[0].targets[0].url, active: false })
      )
  );
};