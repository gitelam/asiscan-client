<script>
    import { onMount } from 'svelte';
    export let data;

    onMount(async () => {
        removeBackgroundBug();
    });

    function removeBackgroundBug(){
        const div = document.querySelector('.modal-backdrop');
        if(div){
            div.remove();
        }
    }
</script>

<h1>{data.id}</h1>