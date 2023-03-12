<template>
    <div>
        <div class="row">
            <div class="col-6 pl-5">
                 <!--ruta para mostrar la agenda -->
                 <router-link :to="{name:'AgendaView'}">
                    <li class="nav-item">
                        <a class="nav-link">Agenda</a>
                    </li>
                </router-link>
            </div>
            <div class="col-6 pl-1">
                <!--ruta para mostrar la paginación-->
                <router-link :to="{name:'AgendaPaginacion'}">
                    <li class="nav-item">
                        <a class="nav-link">Mis contactos</a>
                    </li>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'navegacion'
}
</script>

<style>

</style>