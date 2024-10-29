<template>
    <div class="each-result" ref="" @mouseenter="showRemoveBtn(index)" @mouseleave="hideRemoveBtn(index)">
   
   <div class="question"><b>{{ index + 1 }}. </b>{{ result.question }}</div>
    
   
    <div class="mt-auto">

        <p class="answers">
            <div v-for="(answer, index_asw) in shuffledResult" :key="index_asw">
                <span v-if="answer===result.correct_answer"  :class="showAnswer?'correct-answer':''"><b >{{ labelAnswer[index_asw] }}. </b>{{ answer }}</span>
                <span v-else><b >{{ labelAnswer[index_asw] }}. </b>{{ answer }}</span>
            </div> 
        </p>
        <p class="d-flex justify-content-between">
            <button 
            @click="showAnswer = !showAnswer" 
        class="btn btn-sm btn-outline-success" 
        v-html="showAnswer ? '<i class=&quot;fa-regular fa-eye-slash&quot;></i> Hide' : '<i class=&quot;fa-regular fa-eye&quot;></i> Show'">
        </button> 
        <button 
            @click="removeQuestion(index)"
            v-if="indexShowRemoveBtn === index"
            class="btn btn-sm btn-outline-danger" >x
        </button> 

        </p>
       
    <hr>
    </div>
    </div>
</template>

<script>
export default{
    props: ['result', 'index', 'showAllAnswer'],
    data(){
        return {
            showAnswer: false,
            labelAnswer: ['A', 'B', 'C', 'D', 'E', 'F'],
            shuffledResult :[],
            indexShowRemoveBtn: -1
        }
    },
    created(){
        this.shuffledResult = this.shuffleResult([
            ...this.result.distract,
            this.result.correct_answer
        ])
    },
    methods:{
        shuffleResult(result){
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }
            return result;
        },
        showRemoveBtn(index){
            this.indexShowRemoveBtn=index
         
            
        },
        hideRemoveBtn(index){
            this.indexShowRemoveBtn=-1
        },
        removeQuestion(index){
            this.$emit('removeQuestion', index);
        }

    },
    watch: {
        showAllAnswer(newValue) {
            this.showAnswer = newValue
    }
  }
}
    
</script>

<style scoped>
.correct-answer{
    color: green;
    text-decoration: underline;
}
.each-result{
    cursor: pointer;
}

</style>