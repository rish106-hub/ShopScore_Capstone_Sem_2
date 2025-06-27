import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export const addReview = async (productId, reviewData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const reviewsRef = collection(db, 'reviews');
    const review = {
      ...reviewData,
      productId,
      userId: user.uid,
      userName: user.displayName || user.email.split('@')[0],
      timestamp: new Date().toISOString(),
      helpfulCount: 0
    };

    const docRef = await addDoc(reviewsRef, review);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getReviewsForProduct = async (productId) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('productId', '==', productId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const updateReviewHelpfulness = async (reviewId, increment) => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDocs(reviewRef);
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }

    const currentHelpfulCount = reviewDoc.data().helpfulCount;
    await updateDoc(reviewRef, {
      helpfulCount: currentHelpfulCount + increment
    });
  } catch (error) {
    console.error('Error updating review helpfulness:', error);
    throw error;
  }
};
