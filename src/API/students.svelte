<script context="module" lang="ts">
    import {environment} from '$lib/environment'
    import { getToken } from '$lib/modules/token';

    export async function getStudents() {
        const response = await fetch(`${environment.API_URL}/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    export async function saveStudentByUrl(URL:string, event_id:string) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/save_assistance/${event_id}?url=${URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
        });

        return response;
    }
    
  

</script>