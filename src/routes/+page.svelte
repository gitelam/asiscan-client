<script>
    import { onMount } from "svelte";
    import {getProfileData} from '../API/user.svelte';
    import { setUserName } from "../lib/stores/user";
    import { getToken } from "$lib/modules/token";
    import { goto } from "$app/navigation";

  

    onMount(async () => {
        await import("../main.scss");
        if (getToken()) {
            const response = await getProfileData();
            if(response.ok){
                const data = await response.json();
                setUserName(`${data.firstName} ${data.middleName} ${data.lastName}`);
            }
            goto('/app/home');
        }
        else{
            goto('/auth/signIn');
        }
        
    });
</script>