
<template>
    <div id="about">
            <div class="title-header">
                <h1 class="text-center">ABOUT OUR APPLICATION </h1>  
                <div class="info-using text-center">This application is free for using now! </div>
            </div>
        <div class="pt-5 text-center"><Modal :modalAttribute="modalAttribute">{{  modalAttribute}}</Modal></div>

    </div>
    
</template>

<script>

import Modal from '../components/Modal/index.vue'

export default{
    components:{
        Modal
    },
    data(){
        return{
            modalAttribute :{
                modalTitle: 'Infomation', 
                message: 'Hope you can find something interesting!' ,
                btnTitle: 'Click now!' ,
                btnColor: 'btn-success' ,
                // acceptBtnColor ,
                // acceptBtnTitle ,
                // rejectCtnColor ,
                // rejectBtnTitle
            }
        }
    }
}
</script>


<style scoped>

</style>
