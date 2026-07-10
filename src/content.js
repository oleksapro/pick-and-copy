import browser from 'webextension-polyfill'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
turndownService.use(gfm)

let inspecting = false
let currentTarget = null
let overlayHost = null
let overlayBox = null
let overlayLabel = null

function describeElement(el) {
  let desc = el.tagName.toLowerCase()
  if (el.id) desc += `#${el.id}`
  else if (el.classList.length) desc += `.${[...el.classList].slice(0, 2).join('.')}`
  return desc
}

function createOverlay() {
  overlayHost = document.createElement('div')
  overlayHost.style.cssText =
    'all: initial; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;'
  const shadow = overlayHost.attachShadow({ mode: 'open' })

  overlayBox = document.createElement('div')
  overlayBox.style.cssText = `
    position: fixed;
    pointer-events: none;
    background: rgba(124, 58, 237, 0.25);
    outline: 2px solid #7c3aed;
    border-radius: 2px;
    display: none;
  `

  overlayLabel = document.createElement('div')
  overlayLabel.style.cssText = `
    position: fixed;
    pointer-events: none;
    background: #7c3aed;
    color: #fff;
    font: 600 11px/1.4 -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 2px 6px;
    border-radius: 3px;
    white-space: nowrap;
    display: none;
  `

  shadow.appendChild(overlayBox)
  shadow.appendChild(overlayLabel)
  document.documentElement.appendChild(overlayHost)
}

function removeOverlay() {
  overlayHost?.remove()
  overlayHost = null
  overlayBox = null
  overlayLabel = null
}

function updateOverlay(el) {
  const rect = el.getBoundingClientRect()
  overlayBox.style.display = 'block'
  overlayBox.style.left = `${rect.left}px`
  overlayBox.style.top = `${rect.top}px`
  overlayBox.style.width = `${rect.width}px`
  overlayBox.style.height = `${rect.height}px`

  overlayLabel.textContent = describeElement(el)
  overlayLabel.style.display = 'block'
  const labelTop = rect.top > 20 ? rect.top - 20 : rect.bottom + 2
  overlayLabel.style.left = `${Math.max(rect.left, 0)}px`
  overlayLabel.style.top = `${labelTop}px`
}

function onMouseMove(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (!el || el === currentTarget) return
  currentTarget = el
  updateOverlay(el)
}

function onClick(e) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  const target = currentTarget
  stopInspecting()
  if (target) copyElementAsMarkdown(target)
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    stopInspecting()
  }
}

function startInspecting() {
  if (inspecting) return
  inspecting = true
  createOverlay()
  document.documentElement.style.cursor = 'crosshair'
  document.addEventListener('mousemove', onMouseMove, true)
  document.addEventListener('click', onClick, true)
  document.addEventListener('keydown', onKeyDown, true)
}

function stopInspecting() {
  if (!inspecting) return
  inspecting = false
  currentTarget = null
  document.documentElement.style.cursor = ''
  document.removeEventListener('mousemove', onMouseMove, true)
  document.removeEventListener('click', onClick, true)
  document.removeEventListener('keydown', onKeyDown, true)
  removeOverlay()
}

async function copyElementAsMarkdown(el) {
  const markdown = turndownService.turndown(el.outerHTML).trim()
  try {
    await navigator.clipboard.writeText(markdown)
    showToast('Copied as Markdown')
  } catch (err) {
    if (window.top === window) {
      console.error('Pick & Copy: failed to copy markdown', err)
      showToast('Copy failed — see console', true)
      return
    }
    // Cross-origin iframes often don't have clipboard-write delegated via
    // Permissions Policy. Ask the top frame (which usually does) to write instead.
    try {
      const response = await browser.runtime.sendMessage({
        type: 'relay-clipboard-write',
        text: markdown,
      })
      if (!response?.success) throw new Error(response?.error || 'unknown error')
      showToast('Copied as Markdown')
    } catch (relayErr) {
      console.error('Pick & Copy: failed to copy markdown', relayErr)
      showToast('Copy failed — see console', true)
    }
  }
}

function showToast(message, isError = false) {
  const host = document.createElement('div')
  host.style.cssText =
    'all: initial; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;'
  const shadow = host.attachShadow({ mode: 'open' })
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    background: ${isError ? '#dc2626' : '#111827'};
    color: #fff;
    font: 500 13px/1.4 -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 8px 14px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    opacity: 0;
    transition: opacity 0.15s ease-out;
  `
  shadow.appendChild(toast)
  document.documentElement.appendChild(host)
  requestAnimationFrame(() => {
    toast.style.opacity = '1'
  })
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => host.remove(), 200)
  }, 1800)
}

browser.runtime.onMessage.addListener((message) => {
  if (message?.type === 'toggle-inspect') {
    if (inspecting) stopInspecting()
    else startInspecting()
    return Promise.resolve({ inspecting })
  }
  if (message?.type === 'write-clipboard') {
    return navigator.clipboard.writeText(message.text).then(
      () => ({ success: true }),
      (err) => ({ success: false, error: String(err) }),
    )
  }
})
