<script context="module" lang="ts">
    import {environment} from '$lib/environment'

    export async function getCareers() {
        const response = await fetch(`${environment.API_URL}/careers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

</script>