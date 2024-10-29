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
    <button v-else class="button-upload btn btn-primary" @click="">
      <h3>
        <b>Starting Create Questions</b>
      </h3>
    </button>
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
              btnColor: 'btn-outline-danger btn-sm px-2',
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
  <Result :results="results"></Result>
</template>
<script>
import axios from 'axios';
import Modal from '../../components/Modal/index.vue';
import Result from '../../components/Result/index.vue';

export default {
  components: {
    Result,
    Modal,
  },
  data() {
    return {
      hasFile: false,
      fileName: '',
      results: [
        {
          question: 'What is the capital city of France?',
          correct_answer: 'Paris',
          distract: ['London', 'Berlin', 'Madrid'],
          context: 'Paris is known for its art, fashion, and culture.',
        },
        {
          question: 'Which planet is known as the Red Planet?',
          correct_answer: 'Mars',
          distract: ['Earth', 'Jupiter', 'Saturn'],
          context:
            'Mars is often called the Red Planet due to its reddish appearance.',
        },
        {
          question: 'Who wrote the play "Romeo and Juliet"?',
          correct_answer: 'William Shakespeare',
          distract: ['Charles Dickens', 'Mark Twain', 'Jane Austen'],
          context:
            'William Shakespeare is a famous playwright known for his tragedies and comedies.',
        },
        {
          question: 'What is the largest mammal in the world?',
          correct_answer: 'Blue whale',
          distract: ['African elephant', 'Giraffe', 'Great white shark'],
          context:
            'The blue whale is the largest animal known to have ever existed on Earth.',
        },
        {
          question: 'What is the chemical symbol for gold?',
          correct_answer: 'Au',
          distract: ['Ag', 'Fe', 'Pb'],
          context: 'Gold is a precious metal with the chemical symbol Au.',
        },
        {
          question: 'Which ocean is the largest?',
          correct_answer: 'Pacific Ocean',
          distract: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
          context:
            'The Pacific Ocean covers more area than all of the Earth’s land combined.',
        },
        {
          question: 'In which year did the Titanic sink?',
          correct_answer: '1912',
          distract: ['1905', '1918', '1920'],
          context:
            'The Titanic sank on its maiden voyage after hitting an iceberg.',
        },
        {
          question: 'What is the primary language spoken in Brazil?',
          correct_answer: 'Portuguese',
          distract: ['Spanish', 'English', 'French'],
          context:
            'Brazil is the largest country in South America, and Portuguese is its official language.',
        },
        {
          question: 'What gas do plants absorb from the atmosphere?',
          correct_answer: 'Carbon dioxide',
          distract: ['Oxygen', 'Nitrogen', 'Hydrogen'],
          context:
            'Plants use carbon dioxide during photosynthesis to produce oxygen and glucose.',
        },
        {
          question:
            'Which famous scientist developed the theory of relativity?',
          correct_answer: 'Albert Einstein',
          distract: ['Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
          context:
            'Albert Einstein is renowned for his contributions to physics, particularly the theory of relativity.',
        },
      ],
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    // Xử lý file khi người dùng chọn file
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.hasFile = true;
        this.fileName = file.name;
      } else {
        alert('Please upload a valid PDF file.');
      }
    },
    handleDeleteFile() {
      this.hasFile = false;
      this.fileName = '';
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
