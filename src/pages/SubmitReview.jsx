
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchAllProducts, submitReview } from '../api/productApi';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Loader2, CheckCircle2, Star } from "lucide-react";

const SubmitReview = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    productId: '',
    rating: 0,
    name: '',
    email: '',
    reviewText: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });

    if (formErrors.rating) {
      setFormErrors({
        ...formErrors,
        rating: ''
      });
    }
  };

  const handleProductChange = (value) => {
    setFormData({
      ...formData,
      productId: value
    });
    if (formErrors.productId) {
      setFormErrors({
        ...formErrors,
        productId: ''
      });
    }
  }

  const validateForm = () => {
    const errors = {};

    if (!formData.productId) {
      errors.productId = 'Please select a product';
    }

    if (formData.rating === 0) {
      errors.rating = 'Please select a rating';
    }

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.reviewText.trim()) {
      errors.reviewText = 'Review text is required';
    } else if (formData.reviewText.length < 10) {
      errors.reviewText = 'Review text must be at least 10 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitReview(formData);

      if (response.success) {
        setSubmitSuccess(true);

        setFormData({
          productId: '',
          rating: 0,
          name: '',
          email: '',
          reviewText: ''
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setFormErrors({
        ...formErrors,
        submit: 'Failed to submit review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-4">Share Your Experience</h1>
            <p className="text-zinc-500 font-light">
              Your reviews help others make better choices. Be honest, be detailed.
            </p>
          </div>

          <div className="bg-white">
            {submitSuccess ? (
              <div className="text-center py-16 px-6 bg-zinc-50 rounded-lg border border-zinc-100">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-light text-zinc-900 mb-2">Thank you!</h3>
                <p className="text-zinc-500 mb-6">Your review has been submitted successfully.</p>
                <p className="text-sm text-zinc-400">Redirecting to products...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Select Product</Label>
                    <Select
                      onValueChange={handleProductChange}
                      value={formData.productId}
                      disabled={isLoading}
                    >
                      <SelectTrigger className={formErrors.productId ? "border-red-500" : ""}>
                        <SelectValue placeholder={isLoading ? "Loading products..." : "Select a product"} />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={String(product.id)}>
                            {product.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.productId && <p className="text-sm text-red-500">{formErrors.productId}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`p-2 rounded-md transition-all ${formData.rating >= star ? 'text-yellow-500 bg-yellow-50' : 'text-zinc-300 hover:bg-zinc-50'
                            }`}
                        >
                          <Star className={`h-6 w-6 ${formData.rating >= star ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                    {formErrors.rating && <p className="text-sm text-red-500">{formErrors.rating}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? "border-red-500" : ""}
                        placeholder="John Doe"
                      />
                      {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "border-red-500" : ""}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewText">Your Review</Label>
                    <Textarea
                      id="reviewText"
                      name="reviewText"
                      value={formData.reviewText}
                      onChange={handleInputChange}
                      className={`min-h-[150px] p-4 text-base ${formErrors.reviewText ? "border-red-500" : ""}`}
                      placeholder="Share your experience with this product..."
                    />
                    {formErrors.reviewText && <p className="text-sm text-red-500">{formErrors.reviewText}</p>}
                  </div>
                </div>

                {formErrors.submit && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
                    {formErrors.submit}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitReview;
