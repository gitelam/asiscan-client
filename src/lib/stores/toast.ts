import { writable } from 'svelte/store';

export const toast = writable(false);
export const toastMessage = writable('');
export const toastType = writable('success');
export const toastTitle = writable('');

export function showSuccessToast(title:string, message:string) {
    toastType.set('success');
    toastTitle.set(title);
    toastMessage.set(message);
    toast.set(true);
    
    setTimeout(() => {
        toast.set(false);
    }, 3000);
}

export function showErrorToast(title:string, message:string) {
    toastType.set('error');
    toastTitle.set(title);
    toastMessage.set(message);
    toast.set(true);

    setTimeout(() => {
        toast.set(false);
    }, 3000);
}


