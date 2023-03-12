import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'

export default new Vuex.Store({
    state:{
        //un arreglo que almacena todos los contactos
        usuarios:[],
        //un objecto que contiene datos de un contacto para crearlo o editarlo
        usuario:{
            nombre:'',
            telefono:'',
            correo:''
        },
        //son lo errores de validación del contacto en los formularios
        errores:{},
        //permite saber si debe ser una paginación con parámetros de búsqueda o no
        buscar:false,
        //almacena las palabras claves escritas por el usuario para la búsqueda
        keywords:''
    },
    getters:{
        //retorna un todos los contacto de la agenda
        getUsuarios:state => {
            return state.usuarios
        },
        //retorna un contacto en específico
        getUsuario:state => {
            return state.usuario
        },
        //retorna los errores de validación
        getErrores: state => {
            return state.errores
        },
        //retorna el estado true o false para determinar si se debe realizar una búsqueda o no
        getBuscar: state => {
            return state.buscar
        },
        //ordena los contactos alfabeticamente A - Z
        getOrdenarAlfabeticamente: state => {
            state.usuarios.data.sort((a,b) =>{
                if(a.name < b.name ){
                    return -1
                }
                if(a.name > b.name ){
                    return 1
                }
                return 0
            })
        },
        //ordena los contactos alfabeticamente Z - A
        getOrdenarReversa: state => {
            state.usuarios.data.reverse((a,b) =>{
                if(a.name < b.name ){
                    return -1
                }
                if(a.name > b.name ){
                    return 1
                }
                return 0
            })
        }
    },
    mutations:{
        //la respuesta que se recibe de la api, se le pasa a la variable de state. Ahora esta variable contiene todos los contactos
        SET_USUARIOS(state,payload){
            state.usuarios = payload
        },
        //el nuevo contacto agregado, se le pasa al arreglo que tenemos definido en el store, y ahora este nuevo contacto se muestra en el cliente
        SET_AGREGAR_USUARIO(state,payload){
            state.usuarios.data.push(payload)
        },
        SET_MOSTRAR_USUARIO(state,payload){
            state.usuario = payload
        },
        //en el arreglo del store, se busca el contacto por el id y se redenriza la vista con el contacto actualizado
        SET_ACTUALIZAR_USUARIO(state,payload){
            state.usuarios.data.find(u => {
                if(u.id == payload[0].id){
                    u.name = payload[0].name
                    u.phone = payload[0].phone
                    u.email = payload[0].email
                }
            });
            
        },
        //elimina el usuario en el arreglo de todos los contactos
        SET_ELIMINAR_USUARIO(state,payload){
            state.usuarios.data.splice(payload,1);
        },
        //se define que la paginación con parametros de busqueda es activada o no
        SET_BUSCAR(state,payload){
            state.buscar = payload
        },
        //se le pasa las palabras claves del usuario que ha escrito para buscar el contacto
        SET_KEYWORD(state,payload){
            state.keywords = payload
        },
        //contiene los errores de validaciones
        SET_ERRORES(state,payload){
            state.errores = payload
        },
        //limpia el fomulario
        SET_LIMPIAR_ERRORES(state){
            state.errores = {}
        },
        //método para limpiar los formularios
        SET_LIMPIAR_USUARIO(state){
            state.usuario = {}
            state.errores = {}
        }
    },
    actions:{
        //método que realiza una peticion axios de tipo get, y devuelve la respuesta con todos los contactos
        async fetchUsuarios({commit},page=1){
            try {
                //http://127.0.0.1:8000/api/agenda?page=3
                //se hace la petición 
                const respuesta = await axios.get('/api/agenda?page='+page)
                //la respuesta es procesada a travéz de este método
                commit('SET_USUARIOS',respuesta.data)
            } catch (error) {
                //en caso de un error
                toastr.error("error al cargar los usuarios", "Error");
            }
        },
        //método que realiza una petion axios de tipo post para agregar un nuevo contacto a la BD
        async fetchAgregarUsuario({commit},payload){
            try {
                //se hace la peticion api
                const respuesta = await axios.post('/api/agenda',payload)
                //la respuesta es procesada a travéz de éste método
                commit('SET_AGREGAR_USUARIO',respuesta.data)
                //limpia el formulario
                commit('SET_LIMPIAR_USUARIO')
                //limpia los errores de validacion
                commit('SET_LIMPIAR_ERRORES')
                //una alerta de confirmación
                toastr.success("contacto agregado correctamente", "Correcto");
            } catch (error) {
                toastr.error("error al agregar un nuevo usuario", "Error");
                //se almacenan todos los errores de validacion en el objecto : error.response.da
                commit('SET_ERRORES',error.response.data.errors)
            }
        },
        //método que permite obtener los datos de un contacto
        async fetchMostrarUsuario({commit},payload){
            try {
                //se realiza la peticón axios de tipo get
                const respuesta = await axios.get(`api/agenda/${payload}`)
                //la respuesta es procesada en en la mutation
                commit('SET_MOSTRAR_USUARIO',respuesta.data)
                //limpia los errores de validación (si existen)
                commit('SET_LIMPIAR_ERRORES')
            } catch (error) {
                toastr.error('error al mostrar un usuario', 'Error')
            }
        },
        //método que realiza una peticion axios de tipo put para editar un contacto a la BD
        async fetchActualizarUsuario({commit},payload){
            try {
                //se hace la peticion axios de tipo put
                const respuesta = await axios.put(`api/agenda/${payload.id}`,payload)
                //la respuesta es el contacto actualizado con todos sus datos y se le pasa a la mutation
                commit('SET_ACTUALIZAR_USUARIO',respuesta.data)
                //limpia el formulario
                commit('SET_LIMPIAR_USUARIO')
                //limpia las validaciones
                commit('SET_LIMPIAR_ERRORES')
                //un mensaje de exito
                toastr.success("contacto editado correctamente", "Correcto");
            } catch (error) {
                //mensaje de errores
                toastr.error('error al actualizar el contacto', 'Error')
                commit('SET_ERRORES',error.response.data.errors)
            }
        },
        //método que permite eliminar un usuario en la BD
        async fetchEliminarUsuario({commit},payload){
            try {
                //se realiza una petición axios de tipo delete
                const respuesta = await axios.delete(`/api/agenda/${payload.id}`)
                //si el código de estado es correcto
                if(respuesta.status == 200){
                    //ejecuta el commit para eliminar el usuario del state del store
                    commit('SET_ELIMINAR_USUARIO',payload.index)
                    //limpia el formulario
                    commit('SET_LIMPIAR_USUARIO')
                    //limpia las validaciones
                    commit('SET_LIMPIAR_ERRORES')
                    //mensaje de confimación
                    toastr.success("contacto eliminado correctamente", "Correcto");
                }
            } catch (error) {
                //mensaje de errores
                toastr.error('error al eliminar el contacto', 'Error')
            }
        },
        //método que permite realizar la búsqueda de un contacto 
        async fetchBuscarUsuario({commit},page = 1){
            try {
                //en el state la variable keywords, contiene las palabras clave del contacto que se busca
                //se realiza una peticion axios de tipo get para traer los resultados
                const respuesta = await axios.get(`/api/agenda/buscar/${this.state.keywords}?page=`+page)
                //la respuesta es procesada y almacenada en el siguiente método
                commit('SET_USUARIOS',respuesta.data)
            } catch (error) {
                toastr.error('error al buscar', 'Error')
            }
        }
    },
    modules:{

    }
});