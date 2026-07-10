import browser from 'webextension-polyfill'

function updateBadge(tabId, inspecting) {
  browser.action.setBadgeText({ tabId, text: inspecting ? 'ON' : '' })
  browser.action.setBadgeBackgroundColor({ tabId, color: '#7c3aed' })
}

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return
  try {
    await browser.tabs.sendMessage(tab.id, { type: 'start-inspect' })
    updateBadge(tab.id, true)
  } catch {
    console.warn('Pick & Copy: no content script on this page (e.g. a browser internal page).')
  }
})

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    browser.action.setBadgeText({ tabId, text: '' })
  }
})

browser.runtime.onMessage.addListener((message, sender) => {
  if (message?.type === 'relay-clipboard-write' && sender.tab?.id != null) {
    return browser.tabs.sendMessage(
      sender.tab.id,
      { type: 'write-clipboard', text: message.text },
      { frameId: 0 },
    )
  }
  if (message?.type === 'inspecting-stopped' && sender.tab?.id != null) {
    updateBadge(sender.tab.id, false)
  }
})
