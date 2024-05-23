<script>
    import {loading} from '../../stores/loading';
</script>

{#if $loading}
    <div class="position-fixed top-0 start-0 w-100 h-100 bg-white opacity-75 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>

{/if}