const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return products;
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
    return product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

// Local user reviews storage helpers
const storageKey = (productId) => `reviews:${productId}`;

export const getUserReviews = (productId) => {
  try {
    const raw = localStorage.getItem(storageKey(productId));
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read user reviews', e);
    return [];
  }
};

const saveUserReviews = (productId, reviews) => {
  try {
    localStorage.setItem(storageKey(productId), JSON.stringify(reviews));
  } catch (e) {
    console.error('Failed to save user reviews', e);
  }
};

export const submitReview = async (reviewData) => {
  // reviewData: { productId, rating, name, email, reviewText }
  const { productId, rating, name, email, reviewText } = reviewData;
  const newReview = {
    name: name || 'Anonymous',
    date: new Date().toLocaleDateString('en-IN'),
    comment: reviewText,
    rating: Number(rating) || 0,
    email: email || ''
  };

  const existing = getUserReviews(productId);
  const updated = [newReview, ...existing];
  saveUserReviews(productId, updated);

  return { success: true, message: 'Review submitted successfully' };
};

// Combine API rating with user reviews to compute average and count
export const getCombinedRating = (product) => {
  const apiRate = product?.rating?.rate || 0;
  const apiCount = product?.rating?.count || 0;
  const userReviews = getUserReviews(product.id);
  const userCount = userReviews.length;
  const userSum = userReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);

  const totalCount = apiCount + userCount;
  if (totalCount === 0) return { rate: 0, count: 0 };

  const totalScore = apiRate * apiCount + userSum;
  return { rate: Number((totalScore / totalCount).toFixed(1)), count: totalCount };
};
