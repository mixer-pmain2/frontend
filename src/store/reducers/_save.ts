export const saveToStore = (payload, storeName) =>
    localStorage.setItem(storeName, JSON.stringify(payload))

export const saveAndEncodeToStore = (payload, storeName) =>
    localStorage.setItem(storeName, btoa(JSON.stringify(payload)))

export const loadAndDecodeFromStore = (storeName) =>
    JSON.parse(atob(localStorage.getItem(storeName)))
