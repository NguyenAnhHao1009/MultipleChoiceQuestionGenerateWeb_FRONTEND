<template>
  <div id="results " class="container">
    <div class="text-end mb-2">
      <button @click="exportPDF" class="btn btn-warning">
        <i class="fa-solid fa-file-import"></i> Export to PDF
      </button>
    </div>
    <div class="row">
      <div class="col-6 text-start">
        <span
          >Number of Questions: <b>{{ localResults.length }}</b></span
        >
      </div>
      <div class="col-6 text-end pb-3">
        <Modal
          v-if="toggleBtnShowAllAnswer"
          @accepted="showAllAnswers()"
          :modalAttribute="{
            modalTitle: 'Message',
            message: 'Do you want to show all answers?',
            btnTitle: 'Show all Answers',
            btnColor: 'btn-success',
          }"
        >
        </Modal>

        <button
          v-if="!toggleBtnShowAllAnswer"
          class="btn btn-danger"
          @click="hideAllAnswers()"
        >
          Hide All Answers
        </button>
      </div>
      <hr />
      <div class="col-12 row pb-4 align-items-stretch">
        <div
          class="col-12 col-lg-6 d-flex flex-column"
          v-for="(result, index) in localResults"
          :key="result.id"
        >
          <EachResult
            @removeQuestion="handleRemoveQuestion"
            :result="result"
            :index="index"
            :isShowAnswer="isShowAnswer(index)"
            @changeStatusShowAnswer="handleChangeStatusShowAnswer"
          ></EachResult>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../Modal/index.vue';
import EachResult from './EachResult.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  components: { EachResult, Modal },
  props: ['results'],
  data() {
    return {
      localResults: [],
      toggleBtnShowAllAnswer: true,
    };
  },
  created() {
    this.localResults = this.results.map((result, index) => ({
      ...result,
      isShowAnswer: false,
      id: result.id || index,
    }));
    console.log(this.results);
  },
  methods: {
    isShowAnswer(index) {
      return this.localResults[index].isShowAnswer;
    },
    handleRemoveQuestion(index) {
      let accept_remove = confirm('Xóa câu hỏi ' + (index + 1));
      accept_remove ? this.localResults.splice(index, 1) : '';
    },
    handleChangeStatusShowAnswer(index) {
      this.localResults[index].isShowAnswer =
        !this.localResults[index].isShowAnswer;
      // console.log(this.localResults[index]);
    },
    showAllAnswers() {
      this.localResults.forEach((each) => (each.isShowAnswer = true));
      this.toggleBtnShowAllAnswer = false;
      // console.log(this.localResults);
    },
    hideAllAnswers() {
      this.localResults.forEach((each) => (each.isShowAnswer = false));
      this.toggleBtnShowAllAnswer = true;
      // console.log(this.localResults);
    },
    shuffleResult(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    exportPDF() {
      const doc = new jsPDF();
      doc.addFont('Times-Roman.ttf', 'Times', 'normal');
      doc.addFont('Times-Bold.ttf', 'Times', 'bold');
      doc.setFont('Times', 'bold');
      const pageWidth = doc.internal.pageSize.getWidth();
      const title = 'Multiple Choice Question';
      const titleWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 20);

      let y = 30;
      this.localResults.forEach((result, index) => {
        if (y + 20 > doc.internal.pageSize.height) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('Times', 'bold');
        doc.setFontSize(12);
        doc.text(`Question ${index + 1}: ${result.question}`, 14, y);
        y += 10;
        doc.setFont('Times', 'normal');
        let answers = [...result.distract, result.correct_answer];
        answers = this.shuffleResult(answers);
        const label = ['A', 'B', 'C', 'D', 'E', 'F'];
        answers.forEach((answer, answerIndex) => {
          doc.text(`${label[answerIndex]}. ${answer}`, 14, y);
          y += 7;
        });
        y += 8;
      });

      doc.save('result.pdf');
    },
  },
};
</script>
