<template>
    <div id="option-frame" class="p-4">
        <router-link class="link" :to="to">
            <div class="icon"><img width="110rem" :src="icon" alt="Icon is being updating"></div>
            <div class="title"><h3><b>{{ title }}</b></h3></div>
            <div class="detail d-none d-lg-block" >{{ detail }}</div>   
        </router-link>
        
    </div>
</template>

<script>
import router from '../../router';

export default{
    props: ['to', 'icon', 'title', 'detail']
}

</script>

<style scoped>
#option-frame{
    text-decoration: none;
    border: 1px solid rgb(190, 189, 189);
    border-radius: 5px;
    color: gray;
    max-height: 16rem;
   
    transition: all 0.3s ease-in-out;
}

#option-frame:hover{
    cursor: pointer;
    box-shadow: 1px 4px 10px rgb(217, 216, 216);
}

.link{
    text-decoration: none;
}

  
.title{
    color: rgba(21, 35, 27, 0.608);
    font-weight: bolder;

}


.detail{
    color: rgba(21, 35, 27, 0.608);
    overflow: hidden; /* Ẩn nội dung tràn */
    white-space: nowrap; /* Không cho phép xuống dòng */
    text-overflow: ellipsis; /* Hiển thị dấu ba chấm (...) */
}
</style>