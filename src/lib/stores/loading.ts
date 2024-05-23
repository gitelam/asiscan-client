import { writable } from 'svelte/store';

export const loading = writable(false);

export function showLoading() {
    loading.set(true);
}

export function hideLoading() {
    setTimeout(() => {
        loading.set(false);
    }, 1000); 
}
