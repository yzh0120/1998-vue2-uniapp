<template>
    <div>
        <!-- <iframe width="100%" height="100%" frameborder=0 scrolling="auto" :src="$store.state.gm.pdfUrl"></iframe> -->

        <web-view :src="$store.state.gm.pdfUrl" v-if="$store.state.gm.pdfUrl"></web-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>