<template>
    <div class="footer">
        <p class="pointer" @click="open('https://rezaghz.com')">Powered by rezaghz.com</p>
    </div>
</template>

<script>
    export default {
        name: "Copyright",
        methods: {
            open (link) {
                this.$electron.shell.openExternal(link)
            }
        }
    }
</script>

<style scoped>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: white;
        text-align: center;
        font-size: 15px;
    }
    .pointer {
        cursor: pointer;
    }
</style>