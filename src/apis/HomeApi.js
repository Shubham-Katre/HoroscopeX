import axios from 'axios';

// Get the API base URL from environment variables, with a fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000';

// Function to call the API and submit the form data
export const submitUserData = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(`${API_BASE_URL}/planets`, userData);
    return response.data;
  } catch (err) {
    console.error('API error:', err);
    throw new Error('Error occurred while submitting the form.');
  }
};
