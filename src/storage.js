export const storage = typeof window === 'object' && window.localStorage
	? window.localStorage
	: false;

export function setStorage(key, value) {
	if (!key) return;
	if (storage) {
		storage.setItem(key, value);
	}
}

export function delStorage(key) {
	if (storage) {
		storage.removeItem(key);
	}
}

export function getStorage(key) {
	let val = null;
	if (storage) {
		val = storage.getItem(key);
	}
	return val;
}