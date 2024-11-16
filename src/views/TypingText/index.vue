<template>
  <div id="typing-text">
    <div class="title-header">
      <h1 class="text-center">TYPING YOUR CONTENT</h1>
      <div class="info-using text-center">
        Enter anything you want to create questions from them!
      </div>
    </div>
    <div class="col text-center pt-5">
      <button
        :disabled="content ? false : true"
        @click="handleSubmit"
        class="btn btn-primary button-generate"
      >
        <h3>
          <b>
            {{
              status == 'loading' ? 'Creating Questions' : 'Create Questions'
            }}
          </b>
        </h3>
      </button>
      <div class="mt-3 row text-center justify-content-center">
        <h4 class="fw-bold text-primary">
          Number of answers for each question:
        </h4>
        <div class="row container col-3 col-lg-1 text-center">
          <select class="form-control" v-model="numberOfAnswers">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <div
        v-if="status === 'loading'"
        class="progress mt-4"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          :style="{ width: percentLoading + '%' }"
        ></div>
      </div>
    </div>
    <h3 v-if="status === 'loading'" class="text-center">
      {{ percentLoading }} %
    </h3>
    <h3
      v-if="status === 'success' && results.length > 0"
      class="text-center text-bolder pt-4 text-success"
    >
      Generate Question Successfully!
    </h3>
    <h3
      v-if="status === 'success' && results.length == 0"
      class="text-center text-bolder pt-4 text-info"
    >
      No question generated. Enter some thing!
    </h3>

    <h3
      v-if="status === 'error'"
      class="text-center text-bolder pt-4 text-danger"
    >
      There is some unexpected errors occur:
    </h3>

    <div class="py-5 text-center row justify-content-center">
      <div class="col-11 col-md-9 col-lg-6">
        <textarea
          autofocus
          v-model="content"
          ref="textarea"
          class="form-control"
          rows="1"
          placeholder="Entering text here . . ."
        ></textarea>
      </div>
    </div>
  </div>
  <Result v-if="results.length > 0" :results="results"></Result>
</template>

<script>
import Result from '../../components/Result/index.vue';
import { submitText } from '../../service/api_service';

export default {
  components: {
    Result,
  },
  data() {
    return {
      content: '',
      //   numberOfQuestion: 5,
      percentLoading: 0,
      status: '', // loading // success
      results: [],
      error: {},
      numberOfAnswers: 3,
    };
  },
  mounted() {
    const textarea = this.$refs.textarea;
    textarea.addEventListener('input', function () {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  },
  methods: {
    async handleSubmit() {
      this.results = [];
      this.status = 'loading';
      this.percentLoading = 0;
      this.startLoading();

      try {
        // Gọi API qua service
        this.results = await submitText(this.content, this.numberOfAnswers - 1);

        console.log('Received data:', this.results);

        this.percentLoading = 100; // Đặt thanh progress lên 100%
        this.status = 'success'; // Cập nhật trạng thái thành công
      } catch (error) {
        this.status = 'error';
        this.error = error;
        console.error('Error occurred:', error);
      }
    },
    startLoading() {
      this.percentLoading = 0;
      const interval = setInterval(() => {
        if (this.percentLoading < 100) {
          if (this.percentLoading < 99) this.percentLoading += 1;
        } else {
          clearInterval(interval);
          this.status = 'success';
        }
      }, 105);
    },
  },
};
</script>

<style scoped>
textarea {
  max-height: 200px;
  overflow-y: auto;
}

.button-generate {
  padding: 1.5rem 5rem;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.403);
}
</style>
