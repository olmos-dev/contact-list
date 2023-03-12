<template>
    <!--Componente hijo de la lista de usuarios-->
    <div class="col-12 col-md-8 mt-0 mb-3">
        <!--verifica que exiten contactos-->
        <h1 v-if="usuarios.length === 0" class="h3 text-muted">No hay datos en la agenda aún</h1>
        <!--se muestra la tabla que contiene los contactos-->
        <div v-else class="table-responsive">
            <table class="table table-bordered table-striped table-hover bg-white shadow-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre
                            <!--ordenar alfabeticamente A-Z -->
                            <button @click="ordenarAlfabeticamente" class="btn btn-sm"><i class="fas fa-arrow-down"></i></button>
                            <!--ordenar alfabeticamente Z-A -->
                            <button @click="ordenarReversa" class="btn btn-sm"><i class="fas fa-arrow-up"></i></button>
                        </th>
                        <th>Teléfono</th>
                        <th>Correo electrónico</th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <!--recorrido para mostrar a cada uno de los contactos -->
                    <tr v-for="(usuario,index) of usuarios.data" :key="usuario.id">
                        <td>{{usuario.id}}</td>
                        <td>{{usuario.name}}</td>
                        <td>{{usuario.phone}}</td>
                        <td>{{usuario.email}}</td>
                        <!--editar un contacto-->
                        <td @click="editarUsuario(usuario.id)" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i> </td>
                        <!--eliminar un contacto-->
                        <td @click="eliminarUsuario(usuario.id,index)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <!-- paginación normal -->
                        <th v-if="estadoBuscar == false" colspan="5">
                            <Pagination :data="usuarios" @pagination-change-page="listarUsuarios">
                                <template #prev-nav>
                                    <span><i class="fas fa-angle-left"></i></span>
                                </template>
                                <template #next-nav>
                                    <span><i class="fas fa-angle-right"></i></span>
                                </template>
                            </Pagination>
                        </th>   
                        <!-- paginación con parámetros de búsqueda sin perdida de datos por paginación -->  
                        <th v-else colspan="5">
                            <Pagination :data="usuarios" @pagination-change-page="buscarUsuario">
                                <template #prev-nav>
                                    <span>&lt; Anterior</span>
                                </template>
                                <template #next-nav>
                                    <span>Siguiente &gt;</span>
                                </template>
                            </Pagination>
                        </th>        
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
//es necesario importar para hacer uso correcto de los maps como de las bibliotecas
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
//se importa el package de validacion de paginacion
import LaravelVuePagination from 'laravel-vue-pagination';

export default {
    name:'TablaAgenda',
    //se importa el componenete de Paginacion
    components: {
        'Pagination': LaravelVuePagination
    },
    methods:{
        ...mapMutations({
            mostrar:'SET_MOSTRAR_USUARIO',
        }),       
        ...mapActions({
            listarUsuarios:'fetchUsuarios',
            buscarUsuario:'fetchBuscarUsuario',
            mostrarPeticion:'fetchMostrarUsuario',
            eliminarPeticion:'fetchEliminarUsuario'
        }),
        //método para mostrar el formulario de editar un contacto
        editarUsuario:function(id){
            this.mostrarPeticion(id)
        },
        //método que elimina un contacto - se muestra una alerta de confirnmación
        eliminarUsuario:function(id,index){
              Swal.fire({
                    title:'¿Quieres eliminarlo de la agenda?',
                    text: 'No se pueden deshacer los cambios',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#006699',
                    cancelButtonColor: '#f44336',
                    cancelButtonText:'Cancelar',
                    confirmButtonText: 'Aceptar',
                }).then((result)=>{
                    if(result.value){
                        //se crea un objecto (payload), se pasa el id del usuario y el indice de la position donde esta el usuario en el arreglo
                        var params = {
                            'id':id, 
                            'index':index   
                        }
                        //se llama la accion definida en el store, para eliminar el usuario en la BD como en el renderizado del DOM
                        this.eliminarPeticion(params)
                    }
                })
            
        },
        //método para odernar alfabeticamente A-Z
        ordenarAlfabeticamente:function(){
            this.ordenarAz
        },
        //método para odernar alfabeticamente Z-A
        ordenarReversa:function(){
            this.ordernarZa
        }

    },
    computed:{
        ...mapGetters({
            //obtiene todos los usuarios
            usuarios:'getUsuarios',
            //boleano para saber el estado de buscar
            estadoBuscar:'getBuscar',
            //métodos para ordenar alfabeticamente los contactos
            ordenarAz:'getOrdenarAlfabeticamente',
            ordernarZa:'getOrdenarReversa'
        })
    },
    //al iniciar la aplicación se hace una petición para mostrar todos los contactos
    mounted(){
        this.listarUsuarios()
    },

}
</script>

<style scope>

</style>