import axios from 'axios';

export const uploadPdfFile = async (
  file,
  numberOfDistractors,
  onUploadProgress
) => {
  const formData = new FormData();
  formData.append('pdfFile', file);
  formData.append('numberOfDistractors', numberOfDistractors);

  try {
    const response = await axios.post(
      'http://localhost:5000/upload-pdf',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


export const submitText = async (content, numberOfDistractors) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/enter-text',
      {
        content,
        numberOfDistractors,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data; 
  } catch (error) {
    console.error('Error submitting text:', error);
    throw error; 
  }
};
