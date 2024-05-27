<script>
    import { onMount } from 'svelte';
    import Eventstable from '../../../lib/components/app/events/eventstable.svelte';
    import { showLoading,hideLoading } from '../../../lib/stores/loading';
    import { createEvent, getEvents } from '../../../API/events.svelte';
    import toast, { Toaster } from 'svelte-french-toast';;
    /**
	 * @type {string | Element }
	 */
    let modalManageEvents;
    /**
	 * @type {string | Element }
	 */
    let modalCreateEvents;
    let name = '';
    let events = [];
    async function showCreateEventModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalCreateEvents);
        CreateEvents.show();
    }
    async function hideCreateEventModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalCreateEvents);
        CreateEvents.hide();
    }

    async function showManageEventModal() {
       
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageEvents =  bootstrap.Modal.getOrCreateInstance(modalManageEvents);
        ManageEvents.show();
    }

    async function hideManageEventModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageEvents =  bootstrap.Modal.getOrCreateInstance(modalManageEvents);
        ManageEvents.hide();
    }

    async function saveEvent() {
        showLoading();
        const response = await createEvent(name);
        hideLoading();
        if(response.ok){
            hideCreateEventModal();
            toast.success('Evento creado correctamente');
        }
    }
</script>


<h2>Eventos</h2>
<p class="lead">Modulo para la gestión de eventos</p>
<hr>

<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Administrar eventos</h3>
            </div>
            <div class="card-body">
                <p>En esta sección podras gestionar los eventos de la plataforma</p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#manageEvent" on:click={showManageEventModal}>Administrar eventos</button>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Crear evento</h3>
            </div>
            <div class="card-body">
                <p>
                    En esta sección podras crear un evento
                </p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#createEvent" on:click={showCreateEventModal}>Crear evento</button>
            </div>
        </div>
    </div>
    
</div>

<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalCreateEvents}>
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Crear evento</h5>
          
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Nombre del evento</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" bind:value={name}>
                  </div>
              </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideCreateEventModal}>Cerrar</button>
          <button type="button" class="btn btn-success" on:click={saveEvent}>Guardar</button>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalManageEvents}>
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Administrar eventos</h5>
          
        </div>
        <div class="modal-body">
            <Eventstable />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={hideManageEventModal}>Cerrar</button>
          
        </div>
      </div>
    </div>
</div>



<Toaster />

