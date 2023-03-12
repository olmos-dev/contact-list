<template>
    <!--Formulario para agregar un nuevo contacto-->
    <div class="card shadow">
        <div class="card-header">
            <div class="card-title">
                <!--limpiar formulario-->
                <h1 class="h5 text-capitalize">crear nuevo contacto <span v-if="errores.nombre || errores.telefono || errores.correo" @click="cancelarUsuario" role="button" class="text-danger tam text-normal" title="cancelar" >&times;</span></h1>
            </div>
        </div>
        <form @submit.prevent="agregarUsuario">
            <div class="card-body">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <!--enlace de datos, validación del campo, condicion para verificar si se renderiza en el html el error o no-->
                    <input type="text" v-model.trim="usuario.nombre" @input="setNombre($event.target.value)" name="nombre" class="form-control" :class="[{'is-invalid' : errores.nombre },{'is-invalid' : $v.nombre.$error}]" autocomplete="false">
                    <!--respuesta de validacion del servidor-->
                    <small v-if="errores.nombre" class="text-danger">{{ errores.nombre[0] }}</small>
                    <!--respuesta de validacion del cliente-->
                    <small v-if="$v.nombre.$error && !errores.nombre" class="text-danger">El nombre deben ser letras</small>
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono</label>
                    <input type="telefono" v-model.trim="usuario.telefono" @input="setTelefono($event.target.value)" name="telefono" class="form-control" :class="[{'is-invalid' : errores.telefono },{'is-invalid' : $v.telefono.$error}]"  autocomplete="false">
                    <small v-if="errores.telefono" class="text-danger">{{ errores.telefono[0] }}</small>
                    <small v-if="$v.telefono.$error && !errores.telefono" class="text-danger">El teléfono debe ser numerico</small>
                </div>
                <div class="form-group">
                    <label for="correo">Correo Electrónico</label>
                    <input type="correo" v-model.trim="usuario.correo" @input="setCorreo($event.target.value)" name="correo" class="form-control" :class="[{'is-invalid' : errores.correo},{'is-invalid':$v.correo.$error}]" autocomplete="false">
                    <small v-if="errores.correo" class="text-danger">{{ errores.correo[0] }}</small>
                    <small v-if="$v.correo.$error && !errores.correo" class="text-danger">Debe ser una dirección de correo válida</small>
                </div>
            </div>
            <!--botón para guardar el contacto-->
            <div class="card-footer">
                <button type="submit" class="btn btn-primary btn-block">Guardar <i class="fas fa-save"></i></button>
            </div>
            <!--
            <pre>
                  {{ $v }}
            </pre>
            -->
        </form>
    </div>
</template>

<script>
//se importa para el uso de vuex
import { mapActions, mapGetters, mapMutations} from 'vuex'

//se importa para el uso del package para validar formualarios
import {alpha,numeric,email } from 'vuelidate/lib/validators'

export default {
    name:'AgregarAgenda',
    data() {
        //estos datos solo se utilizan para hacer la validación más no se envian al servidor porque se utiliza el objeto usuario del store
        return {
            nombre:'',
            telefono:'',
            correo:'',
            url:''
        }
    },
    //este método es del package vuelidate, es necesario declararlo
    validations:{
       nombre:{alpha},
       telefono:{numeric},
       correo:{email},
    },
    methods:{
         ...mapMutations({
            limpiar:'SET_LIMPIAR_USUARIO'
        }),
        ...mapActions({
            agregarPeticion:'fetchAgregarUsuario',
        }),
        agregarUsuario:function(){
            //se envia el (payload) objecto usuario con todas sus propiedades
            this.agregarPeticion(this.usuario)
        },
        cancelarUsuario:function(){
            //limpiar formulario
            this.limpiar()
        },
        /*métodos set obtienen el valor del input sin utilizar el biding, 
          solo se utiliza para referenciar la validacion, si rompen la capa 
          de validación front-end, existe una la capa de validacion del back-end
        */
        setNombre(value){
            this.nombre = value
            this.$v.nombre.$touch()
        },
        setTelefono(value){
            this.telefono = value
            this.$v.telefono.$touch()
        },
        setCorreo(value){
            this.correo = value
            this.$v.correo.$touch()
        },
    },
    computed:{
        ...mapGetters({
            //es el nuevo contacto que se desea agregar
            usuario:'getUsuario',
            
            //contiene todos los erroes de validacion que encontro el backend y se usa como respuesta
            errores:'getErrores'
        }),
    }
}
</script>

<style scoped>

</style>