<template>
<div class="question"><b>{{ index + 1 }}. </b>{{ result.question }}</div>
  <div class="mt-auto d-flex flex-column each-result" @mouseenter="showRemoveBtn(index)" @mouseleave="hideRemoveBtn">
    <div class="mt-auto">
      <p class="answers">
        <div v-for="(answer, answerIndex) in shuffledResult" :key="answerIndex">
        <span :class="{'correct-answer': isShowAnswerLocal && answer.toLowerCase() === result.correct_answer.toLowerCase()}">
          <b>{{ labelAnswer[answerIndex] }}. </b>{{ answer }}
        </span>
        </div>
      </p>
      <p class="d-flex justify-content-between">
        <button 
          @click="changeStatusShowAnswer"
          class="btn btn-sm btn-outline-success"
          v-html="isShowAnswerLocal ? '<i class=&quot;fa-regular fa-eye-slash&quot;></i> Hide' : '<i class=&quot;fa-regular fa-eye&quot;></i> Show'">
        </button>
        <button 
          @click="removeQuestion"
          v-if="indexShowRemoveBtn === index"
          class="btn btn-sm btn-outline-danger">x
        </button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['removeQuestion', 'changeStatusShowAnswer'],
  props: ['result', 'index', 'isShowAnswer'],
  data() {
    return {
      labelAnswer: ['A', 'B', 'C', 'D', 'E', 'F'],
      shuffledResult: [],
      indexShowRemoveBtn: -1,
      isShowAnswerLocal: this.isShowAnswer,
    };
  },
  watch: {
    isShowAnswer(newVal) {
      this.isShowAnswerLocal = newVal;
    },
  },
  created() {
    this.shuffledResult = this.shuffleResult([...this.result.distract, this.result.correct_answer]);
  },
  methods: {
    changeStatusShowAnswer() {
      this.isShowAnswerLocal = !this.isShowAnswerLocal;
      this.$emit('changeStatusShowAnswer', this.index);
    },
    
    shuffleResult(array) {
      // Shuffle mảng
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        [array[i], array[j]] = [array[j], array[i]];
      }

      const capitalizedArray = array.map(item => {
    
        if (typeof item === 'string') {
          return item
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu tiên của mỗi từ
            .join(' '); 
        }
        return item;
      });
  return capitalizedArray;
},
    showRemoveBtn(index) {
      this.indexShowRemoveBtn = index;
    },
    hideRemoveBtn() {
      this.indexShowRemoveBtn = -1;
    },
    removeQuestion() {
      this.$emit('removeQuestion', this.index);
    },
  },
};
</script>

<style scoped>
.correct-answer {
  color: green;
  text-decoration: underline;
}
.each-result {
  cursor: pointer;
}
</style>
