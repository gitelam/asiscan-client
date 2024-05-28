<script>
    import Sidebar from "../../lib/components/app/general/sidebar.svelte";
	  import Navbar from "../../lib/components/app/general/navbar.svelte";
    
</script>


<div class="position-absolute w-100 z-3">
  <Navbar/>
</div>

<div class="container-fluid">
  <div class="row flex-nowrap">
    <div class="col-auto px-0">
      <Sidebar />
    </div>
    <main class="col ps-md-2 pt-2" style="margin-left: 270px; margin-top: 100px;">
      <slot></slot>

    </main>
  </div>
</div>