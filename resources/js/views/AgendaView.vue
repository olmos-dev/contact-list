<template>
    <!--Vista de la agenda-->
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <h1 class="">Agenda</h1>
          </div>
        </div>
        <!--se define el componente en la vista-->
        <agenda-component></agenda-component>
      </div>
    </div>
</template>

<script>
//se importa el componente agenda
import AgendaComponent from '../components/agenda/AgendaComponent.vue'

export default {
  components: { AgendaComponent },
    name:'AgendaView',
}

</script>