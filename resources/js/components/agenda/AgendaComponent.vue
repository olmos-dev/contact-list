<template>
    <!--Componente padre de la agenda-->
    <div class="container">
        <div class="row">
            <!--Buscar-->
            <buscar-usuario></buscar-usuario>
        </div>
        <div class="row">
           <!--Formulario-->
           <formulario-agenda></formulario-agenda>
           <!--Tabla-->
           <tabla-agenda></tabla-agenda>
        </div>
    </div>
</template>

<script>
//importar las rutas de los componentes
import TablaAgenda from './TablaAgenda.vue'
import FormularioAgenda from './FormularioAgenda.vue'
import BuscarUsuario from './BuscarUsuario.vue'

export default {
  name:'AgendaComponent',
  //definir los componentes a utilizar
  components: {
    TablaAgenda,
    FormularioAgenda,
    BuscarUsuario
}
  
}
</script>

<style>

</style>