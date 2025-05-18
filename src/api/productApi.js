const BASE_URL = 'https://fakestoreapi.com';

const indianNames = [
  'Aarav Patel', 'Zara Khan', 'Arjun Sharma', 'Diya Verma', 'Vihaan Mehta',
  'Ananya Singh', 'Advait Kumar', 'Riya Gupta', 'Ishaan Reddy', 'Aisha Kapoor',
  'Kabir Malhotra', 'Saanvi Joshi', 'Reyansh Choudhury', 'Myra Sinha', 'Vivaan Rao'
];

const generateRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toLocaleDateString('en-IN');
};

const addReviewMetadata = (products) => {
  return products.map(product => ({
    ...product,
    reviews: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      name: indianNames[Math.floor(Math.random() * indianNames.length)],
      date: generateRandomDate(),
      comment: 'Great product! Would definitely recommend.',
      rating: Math.floor(Math.random() * 2) + 4 // Generates ratings between 4-5
    }))
  }));
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return addReviewMetadata(products);
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
    const product = await response.json();
    return addReviewMetadata([product])[0];
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const submitReview = async (reviewData) => {
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
