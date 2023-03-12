<template>
    <div class="col-12 d-flex justify-content-md-end justify-content-center my-3 my-md-0">
        <!-- formulario para buscar un usuario -->
        <form>
            <div class="form-group">
                <!--se define un método que al precionar las teclas se ejecuta y se le pasa los daos del input a travez del enlace de datos o biding-->
                <input type="text" name="" class="form-control shadow-sm tam" placeholder="Buscar" @keyup="buscarUsuario" v-model="busqueda">
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name:'BuscarUsuario',
    data() {
        return {
            //variable que se utiliza para almacenar las palabras clave de la búsqueda
            busqueda:''
        }
    },
    methods:{
        //se obtienen las actions definidas en el store
         ...mapActions({
            restablecer:'fetchUsuarios',
            buscar:'fetchBuscarUsuario'
        }),
         //se obtienen las mutations definidas en el store
        ...mapMutations({
            estadoBuscar:'SET_BUSCAR',
            keywords:'SET_KEYWORD'
        }),
        //es el metodo que es llamado cuando el usuario pulsa algunas teclas
        buscarUsuario: function(){
            //se ejecuta la peticion ajax cuando el usuario ha pulsado 3 caracteres en el teclado
            if(this.busqueda.length > 2){
                //se define que paginación con parametros de busqueda es activada
                this.estadoBuscar(true)
                //se le pasa las palabras clave que el usuario ha escrito
                this.keywords(this.busqueda)
                //se ejecuta la búsqueda del contacto
                this.buscar()
            }    
    
            //se cargan todos los usuarios cuando el campo de busqueda este vacio
            if(this.busqueda.length < 1){
                this.restablecer()
                 //se define que paginación con parametros de busqueda es desactivada
                this.estadoBuscar(false)
            }
        },
       
    },
}
</script>

<style scoped>

</style>