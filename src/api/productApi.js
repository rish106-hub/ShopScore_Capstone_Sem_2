
// Fake Store API Service

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

// Normally we would POST the review to the server,
// but since we're just simulating, we'll return a mock success response
export const submitReview = async (reviewData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Review submitted:', reviewData);
      resolve({
        success: true,
        message: 'Review submitted successfully'
      });
    }, 1000);
  });
};
