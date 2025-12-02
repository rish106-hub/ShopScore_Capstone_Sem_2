import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getFormattedINRPrice } from '../utils/currency';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const CheckoutPage = () => {
    const { cart, subtotal, deliveryFee, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        setIsOrderPlaced(true);
        // clearCart(); // Uncomment to clear cart after successful order in real app
    };

    if (cart.length === 0 && !isOrderPlaced) {
        navigate('/cart');
        return null;
    }

    if (isOrderPlaced) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-6 rounded-full text-green-600">
                        <CheckCircle size={64} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase, {formData.firstName}. We have sent a confirmation email to {formData.email}.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
                    <h3 className="font-semibold mb-4">Order Details</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-mono font-medium">#ORD-{Math.floor(Math.random() * 100000)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">{getFormattedINRPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <span className="font-medium">3-5 Business Days</span>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        clearCart();
                        navigate('/');
                    }}
                    className="w-full"
                >
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/cart')}
                className="flex items-center text-gray-500 hover:text-black mb-8 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Cart
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Checkout Form */}
                <div className="lg:col-span-7">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                            <CardDescription>Enter your details to receive your order.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="123 Main St, Apt 4B"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="Mumbai"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            placeholder="Maharashtra"
                                            required
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-1 col-span-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input
                                            id="zip"
                                            name="zip"
                                            placeholder="400001"
                                            required
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Select how you want to pay.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-black transition-colors bg-gray-50">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Truck size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Cash on Delivery</p>
                                        <p className="text-sm text-gray-500">Pay when you receive</p>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="w-4 h-4 rounded-full border-4 border-black"></div>
                                    </div>
                                </div>
                                <div className="border rounded-xl p-4 flex items-center gap-4 cursor-not-allowed opacity-60">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Credit/Debit Card</p>
                                        <p className="text-sm text-gray-500">Coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 py-2">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 p-1 flex-shrink-0">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium line-clamp-2">{item.product.title}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-medium text-sm">
                                            {getFormattedINRPrice(item.product.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{getFormattedINRPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                                        {deliveryFee === 0 ? 'FREE' : getFormattedINRPrice(deliveryFee)}
                                    </span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-xl">{getFormattedINRPrice(total)}</span>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full py-6 text-lg"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Place Order • ${getFormattedINRPrice(total)}`}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
