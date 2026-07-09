import browser from 'webextension-polyfill'

function updateBadge(tabId, inspecting) {
  browser.action.setBadgeText({ tabId, text: inspecting ? 'ON' : '' })
  browser.action.setBadgeBackgroundColor({ tabId, color: '#7c3aed' })
}

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return
  try {
    const response = await browser.tabs.sendMessage(tab.id, { type: 'toggle-inspect' })
    updateBadge(tab.id, Boolean(response?.inspecting))
  } catch {
    console.warn('Pick & Copy: no content script on this page (e.g. a browser internal page).')
  }
})

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    browser.action.setBadgeText({ tabId, text: '' })
  }
})
