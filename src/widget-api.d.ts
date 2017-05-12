export interface SmartMirror {
    /**
     * Load the settings.
     * @param callback will be called when the settings are loaded
     */
    onInitialized(callback: (settings: any) => void)

    getButton() : Button;
}

export interface Button {
    onClick(callback: () => void)
}

declare global {
    interface Window {
        mirror : SmartMirror;
    }
}
