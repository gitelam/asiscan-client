<script context="module" lang="ts">
    import { getToken } from '$lib/modules/token';
    import {environment} from '$lib/environment'

    export async function createEvent(name:string) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/events/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name})
        });
        return response;
    }

    export async function getEvents(){
        const token = getToken();
       
        const response = await fetch(`${environment.API_URL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

</script>