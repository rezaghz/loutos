<template>
    <div id="wrapper">
        <div class="dashboard d-flex">
            <div class="list">
                <div class="head">
                    <span class="d-block h5 pr-2 pt-2">لیست یادداشت ها</span>
                </div>
                <div class="body pt-2">
                    <grid-layout
                            :layout.sync="layout"
                            :col-num="6"
                            :row-height="50"
                            :is-draggable="false"
                            :is-resizable="false"
                            :is-mirrored="false"
                            :vertical-compact="true"
                            :responsive="true"
                            :margin="[15, 15]"
                            :use-css-transforms="true"
                    >
                        <grid-item v-for="item in layout" class="grid_item"
                                   :x="item.x"
                                   :y="item.y"
                                   :w="item.w"
                                   :h="item.h"
                                   :i="item.i"
                                   :key="item.i" :style="{backgroundColor : item.background_color}">
                            {{item.i}}
                        </grid-item>
                    </grid-layout>
                </div>
            </div>
        </div>
        <sidebar></sidebar>
    </div>
</template>

<script>
    import Sidebar from '../Partials/Sidebar';
    import VueGridLayout from 'vue-grid-layout';

    export default {
        name: "notes",
        components: {
            Sidebar,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        data() {
            return {
                layout: [
                    {"x": 0, "y": 0, "w": 2, "h": 3, "i": "0","background_color":"#f3a683"},
                    {"x": 6, "y": 0, "w": 2, "h": 3, "i": "1","background_color":"#f3a683"},
                    {"x": 0, "y": 3, "w": 2, "h": 4, "i": "2","background_color":"#f3a683"},
                    {"x": 6, "y": 3, "w": 2, "h": 1, "i": "3","background_color":"#f3a683"},
                    {"x": 0, "y": 7, "w": 2, "h": 1, "i": "4","background_color":"#f3a683"},
                    {"x": 6, "y": 7, "w": 2, "h": 1, "i": "4","background_color":"#f3a683"},
                ],
            };
        }
    }
</script>

<style scoped>
    .list {
        width: 45%;
        padding: 10px;
        position: relative;
        cursor: default;
        border-left: 1px solid #f0f0f0;
    }

    .head {
        width: 100%;
        height: 40px;
        background-color: #f0f0f0;
        border-radius: 7px;
    }

    .body .item {
        width: 100%;
        border-radius: 7px;
        height: 80px;
        background-color: #778beb;
    }

    .body .grid_item {
        background-color: green;
        border-radius: 12px;
    }

    .body {
        height: 600px;
        overflow-y: scroll;
    }


    @media only screen and (max-width: 1600px) {
        .body {
            height: 500px !important;
        }
    }

    @media only screen and (max-width: 1400px) {
        .body {
            height: 500px !important;
        }
    }

    @media only screen and (max-width: 1200px) {
        .body {
            height: 400px !important;
        }
    }

</style>