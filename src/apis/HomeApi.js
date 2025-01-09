import axios from 'axios';

// Function to call the API and submit the form data
export const submitUserData = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post('http://127.0.0.1:5000/planets', userData);
    return response.data;
  } catch (err) {
    console.error('API error:', err);
    throw new Error('Error occurred while submitting the form.');
  }
};
