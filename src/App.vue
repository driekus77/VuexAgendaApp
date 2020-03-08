<template>
  <div id="app">
    <header>
      <Logos/>
    </header>

    <div class="content">
      <div class="inner">
        <div class="scrollable">
          <AgendaApp/>
        </div>
      </div>
    </div>

    <footer>
      <InfoLinks/>
    </footer>
  </div>
</template>

<script>
import Logos from "./components/Workshop/Logos";
import AgendaApp from "./components/AgendaApp";
import InfoLinks from "./components/Workshop/InfoLinks";

export default {
  name: "App",
  components: {
    Logos,
    AgendaApp,
    InfoLinks
  }
};
</script>


<style>
#app {
  height: 100%;
  width: 100%;
  display: table;
}

.main-content {
  height: calc(100% - 250px);
  margin-top: 25px;
}
</style>
