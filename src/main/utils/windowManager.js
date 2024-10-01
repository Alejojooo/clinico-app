/**
 * @type {BrowserWindow}
 */
let mainWindow

/**
 * @param {BrowserWindow} window
 * @returns {void}
 */
export const setMainWindow = (window) => (mainWindow = window)

export const getMainWindow = () => mainWindow
