<script lang="ts">
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
    import { onMount,afterUpdate } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { getEvents,getEventData,editEvent,getEvent,getEventExcel } from '../../../../API/events.svelte';
    import autoAnimate from "@formkit/auto-animate"
    import { createEventDispatcher } from 'svelte';

    export let data: any[]  = [];
    let modalEditRegister:any;
    let modalDeleteRegister:any;
    let modalCreateRegister:any;
    let modalExportExcel:any;
    let name:string = '';
    let quantityAssist:number = 0;
    let handler = new DataHandler(data,{rowsPerPage: 5});
    let rows = handler.getRows();
    let selected = handler.getSelected();
    let isAllSelected = handler.isAllSelected();
    const dispatch = createEventDispatcher();

    afterUpdate(()=>{
        handler.setRows(data);
        rows = handler.getRows();
    })

    function getRegisterIDOrAlert(){
        let eventsIDList:number[] = [];
        selected.subscribe(value => {
            eventsIDList =  value;
        });
        
        if(eventsIDList.length == 1){
            return eventsIDList[0];
        }
        else if(eventsIDList.length == 0){
            toast.error('Seleccione un registro');
        }
        else {
            toast.error('Seleccione un solo registro');
        }
    }

    async function showDeleteRegisterModal(){
        let registerID = getRegisterIDOrAlert();
        if(registerID){
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteRegister);
            DeleteEvent.show();
        }
    }
    async function hideDeleteRegisterModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteRegister);
        DeleteEvent.hide();
    }

    async function showExportExcelModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ExportExcel =  bootstrap.Modal.getOrCreateInstance(modalExportExcel);
        ExportExcel.show();
    }

    async function hideExportExcelModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ExportExcel =  bootstrap.Modal.getOrCreateInstance(modalExportExcel);
        ExportExcel.hide();
    }

    async function generateExcelReport(){
        if(quantityAssist == 0){
            toast.error('La cantidad minima de asistencias es requerida');
            return;
        }
        else if(quantityAssist < 0){
            toast.error('La cantidad minima de asistencias no puede ser menor a 0');
            return;
        }
        dispatch('generateExcel', { quantity: quantityAssist });
        hideExportExcelModal();
        quantityAssist = 0;
        toast.success('Reporte generado');
    }
</script>

<div class="page-header pt-3">
    <h5 class="text-right">Acciones</h5>
    <div class="d-flex flex-row-reverse ">
        <button class="btn btn-primary btn-sm mx-1" >Modificar registro</button>
        <button class="btn btn-success btn-sm mx-1" >Agregar registro</button>
        <button class="btn btn-danger btn-sm mx-1" on:click={showDeleteRegisterModal} >Eliminar registro</button>
        <button class="btn btn-info btn-sm mx-1" on:click={showExportExcelModal}>Exportar lista de asistencias</button>
    </div>
</div>
<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    
                </th>
                <Th {handler} orderBy="student">Nombre</Th>
                <Th {handler} orderBy="control_number">No. control</Th>
                <Th {handler} orderBy="career">No. control</Th>
                <Th {handler} orderBy="quantity_assist">Cantidad de asistencias</Th>
                <Th {handler} orderBy="user">Usuario quien registro</Th>
                <Th {handler} orderBy="createdAt">Fecha de creación</Th>
            </tr>
            
        </thead>
        <tbody use:autoAnimate>
            {#each $rows as row}
                <tr>
                    <td class="selection">
                        <input
                            type="checkbox"
                            on:click={() => handler.select(row.ID)}
                            checked={$selected.includes(row.ID)}
                        />
                    </td>
                    <td>{row.student}</td>
                    <td>{row.control_number}</td>
                    <td>{row.career}</td>
                    <td>{row.quantity_assist}</td>
                    <td>{row.user}</td>
                    <td>{row.createdAt}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<Toaster />

<div class="modal fade" bind:this={modalEditRegister} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modificar registro</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" bind:this={modalDeleteRegister} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar registro</h5>
            </div>
            <div class="modal-body">
                <p>¿Estas seguro de eliminar el registro?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={hideDeleteRegisterModal}>Cancelar</button>
                <button type="button" class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" bind:this={modalExportExcel} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Exportar lista de asitencias</h5>
            </div>
            <form>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="email" class="form-label">Cantidad minima de asistencias</label>
                        <input type="number" class="form-control" id="name" aria-describedby="emailHelp" bind:value={quantityAssist}>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideExportExcelModal}>Cerrar</button>
                <button type="submit" class="btn btn-success" on:click={generateExcelReport}>Exportar lista</button>
                </div>
            </form>
        </div>
    </div>
</div>

<Toaster/>