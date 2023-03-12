/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue';
/**Se debe importar el router para hacer uso de el */
import router from './router'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('agenda-routing', require('./views/AgendaRouting.vue').default);
Vue.component('agenda-view', require('./views/AgendaView.vue').default);
Vue.component('agenda-component', require('./components/agenda/AgendaComponent.vue').default);
Vue.component('tabla-agenda', require('./components/agenda/TablaAgenda.vue').default);
Vue.component('formulario-agenda', require('./components/agenda/FormularioAgenda.vue').default);
Vue.component('navegacion', require('./components/agenda/navegacion.vue').default);

//Vue.component('pagination',require('laravel-vue-pagination'))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    /**Aqui de debe declarar el router */
    router,
});
