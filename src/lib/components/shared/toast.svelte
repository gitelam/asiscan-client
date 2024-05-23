<script>
	
    import {toast,toastMessage,toastTitle,toastType} from '../../stores/toast'; 
    import {onMount} from 'svelte';
   
    /**
	 * @type {string | Element | HTMLDivElement}
	 */
    let toastElement;
    
    onMount(async () => {
      if(toastElement){
        const bootstrap = await import("bootstrap");
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      }
    });

    
</script>

{#if $toast}
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" bind:this={toastElement} class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="...">
      <strong class="me-auto">{$toastTitle}</strong>
      
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {$toastMessage}
    </div>
  </div>
</div>
{/if}

