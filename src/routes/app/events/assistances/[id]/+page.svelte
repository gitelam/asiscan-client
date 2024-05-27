<script lang="ts">
    import { onMount,onDestroy } from 'svelte';
    import QrScanner from 'qr-scanner';
    import { goto } from '$app/navigation';
    import {saveStudentByUrl} from '../../../../../API/students.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
    import Loading from '$lib/components/shared/loading.svelte';
    import { showLoading,hideLoading } from '$lib/stores/loading';
    export let data;

    let qrScanner:any;
    let videoElem:any;
    let debounceTimeout:any;
     /**
	 * @type {string | Element }
	 */
    let modalRegisterStudent:any;
    let firstName = '';
    let middleName = '';
    let lastName = '';
    let maternalName = '';
    let controlNumber = '';
    let email = '';
    let tmpStudents:any[] = [];
    onMount(async () => {
        removeBackgroundBug();
        qrScanner = new QrScanner(
            videoElem,
            result => showQrResult(result),
            { 
                highlightScanRegion: true,
            },
        );
        qrScanner.start();
    });

    onDestroy(() => {
        if(qrScanner){
            qrScanner.stop();
        }
    }); 

    async function showQrResult(result:any) {
        showLoading();
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(async () => {
            try {
                const response = await saveStudentByUrl(result.data, data.id);
                if (response.status === 200) {
                    toast.success('Estudiante registrado correctamente');
                    let data = await response.json();
                    tmpStudents = [...tmpStudents, data];
                    console.log(data)
                } else {
                    toast.error('Error al registrar estudiante');
                }
            } catch (error) {
                toast.error('Error al registrar estudiante');
            }
            hideLoading();
        }, 400);
       
    }

    function removeBackgroundBug(){
        const div = document.querySelector('.modal-backdrop');
        if(div){
            div.remove();
        }
    }

    function goBack(){
        goto('/app/events');
    }

    async function showRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalRegisterStudent);
        CreateEvents.show();
    }
    async function hideRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalRegisterStudent);
        CreateEvents.hide();
    }
</script>
<div class="page-header pt-3">
    <h2>Registo de asistencias</h2>
</div> 
<p class="lead">Registre las asistencias de los participantes</p>
<hr>
<div class="row">
    <div class="col-12 col-md-8">
        <div class="bg-white rounded-lg shadow-lg p-4 d-flex flex-column align-items-center">
            <div class="video-container rounded-lg d-flex justify-content-center">
                <!-- svelte-ignore a11y-media-has-caption -->
                <video bind:this={videoElem} class="w-75"></video>
            </div>
            <p class="mt-2 text-secondary">
                Escanee el código QR del participante para registrar su asistencia
            </p>
        </div>
    </div>
    <div class="col-12 col-md-4 p-4 bg-white flex-column-scroll">
        <div class="flex-grow-1 ">
            <h2 class="text-lg font-weight-s-emibold mb-4">Historial de asistencias</h2>
            <div class="d-grid gap-4 overflow-auto">
                {#each tmpStudents as student}
                
                    <div class="bg-light rounded-lg p-2  d-flex justify-content-center align-items-center">
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img src={student.image} class="rounded float-left img-thumbnail w-25 mr-auto p-2" alt="student-image"> 
                        
                        <p class="font-weight-medium mx-2">{student.first_name} {student.middle_name} {student.last_name}</p>
                        <p class="text-muted small">{student.career}</p>
                        
                    </div>
                    
               
                {/each}
                <!-- Add more items as needed -->
            </div>
        </div>
        <div class="mt-4 d-flex justify-content-between" >
            <button class="btn btn-outline-secondary" on:click={goBack}>Volver</button>
            
            <button class="btn btn-primary" on:click={showRegisterStudentModal}>Registro manual</button>
        </div>
    </div>
</div>


<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalRegisterStudent}>
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Registrar estudiante</h5>
          
        </div>
        
        <form>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="email" class="form-label">Buscar estudiante</label>
                    <input type="text" class="form-control" list="students" name="student" id="student">
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="first-name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="first-name" bind:value={firstName}>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="last-name" class="form-label">Apellido paterno</label>
                        <input type="text" class="form-control" id="last-name" bind:value={middleName}>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="maternal-name" class="form-label">Apellido materno</label>
                        <input type="text" class="form-control" id="maternal-name" bind:value={lastName}>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="control-number" class="form-label">Numero de control</label>
                        <input type="text" class="form-control" id="control-number" bind:value={controlNumber}>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" id="email" bind:value={email}>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideRegisterStudentModal}>Cerrar</button>
                <button type="submit" class="btn btn-success" >Guardar</button>
            </div>
        </form>
      </div>
    </div>
</div>

<datalist id="students">
    <option value="Diego Beltran Lopez">
    <option value="Luis Beltran Lopez">
    <option value="Antonio Beltran Lopez">
    <option value="Juan Beltran Lopez">

  </datalist>
  <Loading/>
  <Toaster/>