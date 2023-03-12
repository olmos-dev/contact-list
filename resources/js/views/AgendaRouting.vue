<template>
    <!--Se define el router de nuestra aplicación-->
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
// se importa el store
import store from '../store'

export default {
    store,
    name:'AgendaRouting',
}

</script>