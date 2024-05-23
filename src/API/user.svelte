<script context="module" lang="ts">
    import { getToken } from '$lib/modules/token';
    import {environment} from '$lib/environment'

    export async function getProfileData(){
        const token = getToken();
       
        const response = await fetch(`${environment.API_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

</script>