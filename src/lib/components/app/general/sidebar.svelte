<script>
    import { user } from "../../../../lib/stores/user";
    import { removeToken } from "$lib/modules/token";
    import { goto } from "$app/navigation";

    function logout() {
        removeToken();
        user.set('');
        goto('/auth/signIn');
    }
</script>

<div id="sidebar" class="collapse collapse-horizontal show border-end position-fixed top-0 bottom-0 start-0 min-vh-100 " style="width: 120px;">
    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start " style="margin-top: 100px;">
        <a href="/app/home" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-house"></i> <span>Inicio</span> </a>
        <a href="/app/events" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-list-stars"></i> <span>Eventos</span></a>
        <a href="/app/users" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-people"></i> <span>Usuarios</span></a>
        <div class="dropdown p-1">
          <!-- En este elemento <a> agregamos la clase dropdown-toggle y el atributo data-bs-toggle="dropdown" -->
          <a href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="list-group-item border-end-0 d-inline-block text-truncate border-0">{$user}</span>
          </a>
          <!-- Dentro del elemento <div> colocamos el menú dropdown -->
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <li ><a class="dropdown-item p-2" href="#"><i class="bi bi-person-fill p-2"></i>Perfil</a></li>
              <li>
                  <hr class="dropdown-divider">
              </li>
              <li><button class="dropdown-item p-2" on:click={logout}><i class="bi bi-box-arrow-left p-2"></i>Cerrar sesión</button></li>
          </ul>
      </div>
      </div>
    
  </div>
