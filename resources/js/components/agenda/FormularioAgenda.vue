<template>
  <div class="col-12 col-md-4 mt-0 mb-3">
    <!--formulario para editar-->
    <EditarAgrenda v-if="usuario.hasOwnProperty('id')"></EditarAgrenda>
    
    <!--formulario para crear-->
    <AgregarAgenda v-else></AgregarAgenda>

  </div>
</template>

<script>
//importar las rutas de los componentes
import {mapGetters} from 'vuex'
import AgregarAgenda from './AgregarAgenda.vue'
import EditarAgrenda from './EditarAgrenda.vue'

export default {
    name:'FormularioAgenda',
    //definir los componentes a utilizar
    components:{
        AgregarAgenda,
        EditarAgrenda
    },
    computed:{
        ...mapGetters({
            usuario:'getUsuario'
        })
    },
}
</script>

<style>

</style>