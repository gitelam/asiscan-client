<script lang="ts">
  
import { browser } from "$app/environment";
import { onMount } from "svelte";
// import "bootstrap/dist/css/bootstrap.css";


onMount(async () => {
  if (!browser) return;

  // this is enough for most components
  // await import("bootstrap");

  // some components require a bootstrap instance, to fulfil their job. In that case, use this:
  // const bootstrap = await import("bootstrap");
  // sample usage: 
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
});


</script>

<body class="">
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 px-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="/auth/signIn">
        <div class="d-flex w-100 justify-content-center align-items-center">
          <img src="/logo_TECNM.svg" alt="Logo" width="75" class="img-fluid" />
          <div class="ms-4">
            <div>
              <p class="font-weight-bold text-primary fs-6">TecNM</p>
              <h2 class="text-start fs-4 fw-bold text-primary">
                ASISCAN
              </h2>
            </div>
            <p class="text-start fs-5 font-weight-medium text-primary">
              Gestor de asistencias
            </p>
          </div>
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto"> <!-- Aquí se agregó la clase ms-auto -->
          <li class="nav-item">
            <a class="nav-link" href="/auth/signIn">Iniciar sesión</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/signUp">Crear nueva cuenta</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <main class="container">
    <slot></slot>
  </main>
</body>