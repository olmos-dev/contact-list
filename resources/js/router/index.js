import Vue from 'vue';
import VueRouter from 'vue-router';
/**Se importar los componentes a usar*/
import AgendaView from '../views/AgendaView'
import AgendaPaginacion from '../views/AgendaPaginacion'

/**Se definen las rutas*/
const routes = [
    //ruta de la agenda
    {
        path:'/',
        component:AgendaView,
        name:"AgendaView"
    },
    //ruta de la paginación de la agenda
    {
        path:'/paginacion',
        component:AgendaPaginacion,
        name:"AgendaPaginacion",
    },

]

//se llaman las rutas en el router de vue
const router = new VueRouter({
    mode:'history',
    routes,
});

Vue.use(VueRouter);

export default router;

