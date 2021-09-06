<template>
    <div id="wrapper">
        <div class="dashboard d-flex">
            <div class="list">
                <div class="head">
                    <span class="d-block h5 pr-2 pt-2">لیست یادداشت ها</span>
                </div>

            </div>
            <div class="new">

            </div>
        </div>
        <sidebar></sidebar>
    </div>
</template>

<script>
    import Sidebar from '../Partials/Sidebar';

    export default {
        name: "convert-dates",
        components: {
            Sidebar
        },
        data() {
            return {}
        },

    }
</script>

<style scoped>


</style>