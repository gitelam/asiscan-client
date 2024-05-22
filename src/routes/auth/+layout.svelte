<script lang="ts">
import { browser } from "$app/environment";
import { onMount } from "svelte";
import "bootstrap/dist/css/bootstrap.css";

onMount(async () => {
  if (!browser) return;

  // this is enough for most components
  await import("bootstrap");

  // some components require a bootstrap instance, to fulfil their job. In that case, use this:
  // const bootstrap = await import("bootstrap");
  // sample usage: 
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
});</script>

<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/auth/signIn">Asiscan</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav
        ">
          <li class="nav-item">
            <a class="nav-link" href="/auth/signIn">Sign In</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/signUp">Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="container">
    <slot></slot>
  </main>
</body>