<script context="module" lang="ts">
    import {environment} from '$lib/environment'

    export async function signIn(email: string, password: string) {
        const response = await fetch(`${environment.API_URL}/users/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        return response;
    }
    
    export async function signUp(
    email: string, password: string,firstName: string,
    middleName:string,lastName: string,careerID:number) {
        const response = await fetch(`${environment.API_URL}/users/sign_up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName,middleName,lastName,careerID,email, password})
        });

        return response;
    }

</script>