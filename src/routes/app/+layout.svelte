<script>
    import Sidebar from "../../lib/components/app/general/sidebar.svelte";
	  import Navbar from "../../lib/components/app/general/navbar.svelte";
    
</script>



<div class="container-fluid">
<Navbar/>
  <div class="row flex-nowrap">
      <div class="col-auto px-0">
        <Sidebar />
      </div>
      <main class="col ps-md-2 pt-2">
        <button data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</button>
        <slot></slot>
          
      </main>
  </div>
</div>