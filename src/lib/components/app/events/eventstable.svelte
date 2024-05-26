<script lang="ts">
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
    import { onMount,afterUpdate } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { goto } from '$app/navigation';
    export let events: any[]  = [];
    let handler = new DataHandler(events,{rowsPerPage: 5});
    let rows = handler.getRows();
    let selected = handler.getSelected();
    let isAllSelected = handler.isAllSelected();
   
    afterUpdate(()=>{
        handler.setRows(events);
        rows = handler.getRows();
    })
   
    function goToEventDetail(){
        goToOrAlert(`/app/events/`)
    }

    function goToRegisterAssistances(){
        goToOrAlert('/app/events/assistances/');
    }

    function goToOrAlert(URL:string){
        let eventsIDList:number[] = [];
        selected.subscribe(value => {
            eventsIDList =  value;
        });
        
        if(eventsIDList.length == 1){
            goto(`${URL}${eventsIDList[0]}`);
        }
        else if(eventsIDList.length == 0){
            toast.error('Seleccione un evento');
        }
        else {
            toast.error('Seleccione un solo evento');
        }
    }
</script>
<div class="page-header pt-3">
    <h5 class="text-right">Acciones</h5>
    <div class="d-flex flex-row-reverse ">
        <button class="btn btn-primary btn-sm mx-1">Editar evento</button>
        <button class="btn btn-primary btn-sm mx-1" on:click={goToRegisterAssistances}>Registrar asistencias</button>
        <button class="btn btn-danger btn-sm mx-1" >Eliminar evento</button>
        <button class="btn btn-primary btn-sm mx-1" on:click={goToEventDetail}>Ver evento</button>
    </div>

</div>
<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    
                </th>
                <Th {handler} orderBy="name">Nombre del evento</Th>
                <Th {handler} orderBy="user">Nombre del organizador</Th>
                <Th {handler} orderBy="createdAt">Fecha de creación</Th>
            </tr>
            
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td class="selection">
                        <input
                            type="checkbox"
                            on:click={() => handler.select(row.ID)}
                            checked={$selected.includes(row.ID)}
                        />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.user}</td>
                    <td>{row.createdAt}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>


<style>
    thead {
        background: #fff;
    }
    thead th.selection {
        width: 48px;
        padding-left: 8px;
        border-bottom: 1px solid #e0e0e0;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    tbody tr.active {
        background: var(--primary-lighten-1);
    }
    tbody tr.active:hover {
        background: var(--primary-lighten-2);
    }
    td :global(b) {
        font-weight: normal;
        color: #bdbdbd;
        font-family: JetBrains;
        font-size: 11px;
    }
    td.selection {
        padding-left: 24px;
    }
</style>