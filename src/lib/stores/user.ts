import { writable } from 'svelte/store';

export const user = writable(''); 

export function setUserName(userName:string) {
    user.set(userName);
}
