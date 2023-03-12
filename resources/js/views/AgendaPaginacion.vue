<template>
    <!--NO SE INCLUYE ESTA PARTE DEL PROYECTO -->
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body table-responsive">
                            <table class="table table-striped">
                                <thead class="thead-inverse">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Teléfono</th>
                                        <th>Correo Electrónico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="contacto in contactos.data" :key="contacto.id">
                                        <td>{{ contacto.id }}</td>
                                        <td>{{ contacto.name }}</td>
                                        <td>{{ contacto.phone }}</td>
                                        <td>{{ contacto.email }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer">
                            <tr>
                                <th>
                                    <Pagination :data="contactos" @pagination-change-page="fetchContactos" />
                                </th>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { randomFill } from 'crypto';
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'
import LaravelVuePagination from 'laravel-vue-pagination';

export default {
    name:'AgendaPaginacion',
    components: {
        'Pagination': LaravelVuePagination
    },
    data() {
        return {
            contactos:{},
            paginacion:{}
        }
    },
    methods:{
        async fetchContactoPrueba(){
            try {
                const response = await axios.get('/api/agenda/paginacion')
                //const response = await axios.get(`/api/agenda/paginacion?page=${this.$route.query.page || 1}`)
                //const response = await axios.get(`/api/agenda/paginacion?page=3`)
                //console.log(this.$route)
                //console.log(response.data)
                this.contactos = response.data
                //this.paginacion = response.data
                //delete this.paginacion.data
                //console.log(Math.random(10))
            } catch (error) {
                console.log(error)
                toastr.error(error, "Error");
            }
        },
        getActive(pagina){
            return [
                ! this.$route.query.page && pagina == 1 ? 'router-link-exact-active' : ''
            ]

        },
        async fetchContactos(page = 1){
            try {
                //const response = await axios.get('/api/agenda/paginacion')
                const response = await axios.get('/api/agenda/paginacion?page='+page)
                //console.log(response.data)
                this.contactos = response.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted(){
        //this.fetchContactos()
        this.fetchContactos();
    }
}
</script>

<style lang="scss">
   
</style>
