<template>
  <div id="results" class="container">
    <div class="text-end mb-2">
      <button @click="exportPDF" class="btn btn-warning">
        <i class="fa-solid fa-file-import"></i> Export to PDF
      </button>
    </div>
    <div class="row">
      <div class="col-6 text-start">
        <span
          >Number of Questions: <b>{{ results.length }}</b></span
        >
      </div>
      <div class="col-6 text-end pb-3">
        <Modal
          v-if="showAllAnswer == false"
          @accepted="showAllAnswer = !showAllAnswer"
          :modalAttribute="{
            modalTitle: 'Message',
            message: 'Do you want to show all answers?',
            btnTitle: 'Show all Answers',
            btnColor: 'btn-success',
          }"
        >
        </Modal>

        <button
          v-if="showAllAnswer == true"
          class="btn btn-danger"
          @click="showAllAnswer = !showAllAnswer"
        >
          Hide All Answers
        </button>
      </div>
      <hr />
      <div
        v-for="(result, index) in results"
        :key="index"
        class="col-12 col-lg-6 pb-4 align-items-stretch d-flex flex-column"
      >
        <EachResult
          @removeQuestion="handleRemoveQuestion(index)"
          :result="result"
          :showAllAnswer="showAllAnswer"
          :index="index"
        ></EachResult>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../Modal/index.vue';
import EachResult from './EachResult.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Nếu bạn muốn sử dụng tính năng bảng

export default {
  components: { EachResult, Modal },
  props: ['results'],
  data() {
    return {
      showAllAnswer: false,
    };
  },
  methods: {
    handleRemoveQuestion(index) {
      this.results.splice(index, 1);
    },
    shuffleResult(result) {
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },
    exportPDF() {
      const doc = new jsPDF();

      // Thêm font Times New Roman
      doc.addFont('Times-Roman.ttf', 'Times', 'normal');
      doc.addFont('Times-Bold.ttf', 'Times', 'bold');

      // Thêm tiêu đề canh giữa
      doc.setFont('Times', 'bold');
      const pageWidth = doc.internal.pageSize.getWidth();
      const title = 'Multiple Choice Question';
      const titleWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const x = (pageWidth - titleWidth) / 2;
      doc.text(title, x, 20);

      let y = 30; // Vị trí y bắt đầu

      this.results.forEach((result, index) => {
        // Kiểm tra xem có cần thêm trang mới không
        if (y + 20 > doc.internal.pageSize.height) {
          // Nếu gần hết trang
          doc.addPage(); // Thêm trang mới
          y = 20; // Reset y về vị trí đầu trang
        }
        doc.setFont('Times', 'bold');
        doc.setFontSize(12);
        doc.text(`Question ${index + 1}: ${result.question}`, 14, y);
        y += 10;
        doc.setFont('Times', 'normal');
        let answers = [...result.distract, result.correct_answer];
        answers = this.shuffleResult(answers); // Giả sử bạn có phương thức shuffleResult

        const label = ['A', 'B', 'C', 'D', 'E', 'F'];

        answers.forEach((answer, answerIndex) => {
          doc.text(`${label[answerIndex]}. ${answer}`, 14, y);
          y += 7;
        });

        y += 8; // Tăng thêm khoảng cách giữa các câu hỏi
      });

      // Lưu file PDF
      doc.save('result.pdf');
    },
  },
};
</script>
