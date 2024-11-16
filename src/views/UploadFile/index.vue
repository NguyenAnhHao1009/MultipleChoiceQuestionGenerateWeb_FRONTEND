<template>
  <div class="title-header">
    <h1 class="text-center">SELECT YOUR PDF FILE</h1>
    <div class="info-using text-center">Only PDF file is accepted!</div>
  </div>
  <div class="py-5 text-center">
    <button
      v-if="hasFile == false"
      class="button-upload btn btn-primary"
      @click="triggerFileInput"
    >
      <h3>
        <b>Upload Your File <i class="fa-solid fa-file-import"></i></b>
      </h3>
    </button>
    <button
      :disabled="disabledButton"
      v-else
      class="button-upload btn btn-primary"
      @click="handleSubmitFile"
    >
      <h3>
        <b
          >Starting Create Questions
          <span
            v-if="disabledButton"
            class="spinner-grow spinner-grow"
            aria-hidden="true"
          ></span>
        </b>
      </h3>
    </button>
    <div class="mt-3 row text-center justify-content-center">
      <h4 class="fw-bold text-primary">Number of answers for each question:</h4>
      <div class="row container col-lg-1 col-3 text-center">
        <select class="form-control" v-model="numberOfAnswers">
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
    <div v-if="fileName" class="file-name mt-3">
      <p class="text-black">
        <i class="fa-solid fa-file-pdf"></i> {{ fileName }}
        <span class="mx-1"
          ><Modal
            @accepted="handleDeleteFile"
            :modalAttribute="{
              btnTitle: 'x',
              modalTitle: 'Warning',
              message: 'Do you want to delete the file ' + fileName,
              btnColor: 'btn btn-outline-danger btn-sm px-2',
            }"
          ></Modal
        ></span>
      </p>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept=".pdf"
      style="display: none"
    />
  </div>
  <Result v-if="results.length > 0" :results="results"></Result>
</template>
<script>
import axios from 'axios';
import Modal from '../../components/Modal/index.vue';
import Result from '../../components/Result/index.vue';
import { uploadPdfFile } from '../../service/api_service';

export default {
  components: {
    Result,
    Modal,
  },
  data() {
    return {
      hasFile: false,
      fileName: '',
      file: null,
      results: [],
      context: '',
      disabledButton: false,
      numberOfAnswers: 3,
    };
  },
  methods: {
    async handleSubmitFile() {
      this.disabledButton = true; // Vô hiệu hóa nút trong khi chờ phản hồi
      try {
        this.results = await uploadPdfFile(
          this.file,
          this.numberOfAnswers - 1,
          (progressEvent) => {
            this.percentLoading = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        );
        console.log('Received data:', this.results);
      } catch (error) {
        alert('Đã xảy ra lỗi khi tải lên file PDF');
      } finally {
        this.disabledButton = false;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      this.file = event.target.files[0];
      if (this.file && this.file.type === 'application/pdf') {
        this.hasFile = true;

        this.fileName = this.file.name;
        console.log(this.fileName);
      } else {
        alert('Please upload a valid PDF file.');
      }
    },

    handleDeleteFile() {
      this.hasFile = false;
      this.fileName = '';
      this.file = null;
      this.pdfContent = '';
      this.$refs.fileInput.value = null;
    },
  },
};
</script>

<style scoped>
.button-upload {
  padding: 1.5rem 5rem;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.403);
}
</style>
