

<template>
    <div id="home">
       
            <div class="title-header">
                <h1 class="text-center">MULTIPLE-CHOICE QUESTION CREATOR </h1>  
                <div class="info-using text-center">This application is free for using now! </div>
            </div>
            
            <div class="container pt-5">
                <div class="row justify-content-center">
                        <div class="col-6 title">
                                <OptionFrame to="upload-file" title="Upload PDF" icon="/src/assets/upload_pdf_icon.png" detail="Upload your PDF documents to automatically generate multiple-choice questions."></OptionFrame>
                        </div>
                    
                <div class="col-6 title">
                    <OptionFrame to="typing-text" title="Enter content" icon="/src/assets/typing_input_icon.png" detail="Directly input your text content into the application to create multiple-choice questions."></OptionFrame>
                     
                </div>
                </div>
                
            </div>
            
            
    </div>
</template>

<script>
import OptionFrame from '../components/OptionFrame/index.vue'
export default {
    components: {
        OptionFrame
    }
}
</script>

<style scoped>
.title{
    /* text-wrap: nowrap; */
    text-overflow: ellipsis;
}
</style>
