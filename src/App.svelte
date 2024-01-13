<script lang="ts">
  import Morse from "./components/Morse.svelte";
  import Header from "./components/Header.svelte";
  import Sidemenu from "./components/Sidemenu.svelte";
  import Privacy from "./components/Privacy.svelte";
  import AddMob from "./components/AddMob.svelte";
  import { isApp } from "./services/capacitor";
  import { onMount } from "svelte";
  import { intializeAddMob, showAddMobBanner } from "./services/addMob";
  function showPhone() {
    if (window.innerWidth > 600) return "mockup-phone h-screen";
    else return "";
  }

  onMount(() => {
    if (isApp()) {
      intializeAddMob().then(() =>
        showAddMobBanner("ca-app-pub-6530204715466484/7630804318", [
          ".drawer-side ul",
          ".morse",
        ])
      );
    }
  });
</script>

{#if isApp()}
  <Sidemenu>
    <Header />
    <Morse />
    <Privacy />
  </Sidemenu>
{:else if !showPhone()}
  <Sidemenu>
    <Header />
    <Morse />
    <Privacy />
    <AddMob side="bottom" />
  </Sidemenu>
{:else}
  <AddMob side="side" />
  <div class="h-full w-full max-w-md shrink-0 mr-0 {showPhone()}">
    <div class="camera"></div>
    <div class="display h-full">
      <Sidemenu>
        <Header />
        <Morse />
        <Privacy />
      </Sidemenu>
    </div>
  </div>
  <div class="w-[320px] shrink-0 h-full"></div>
{/if}
