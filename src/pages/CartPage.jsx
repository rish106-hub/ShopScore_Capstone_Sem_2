import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getFormattedINRPrice } from '../utils/currency';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        subtotal,
        deliveryFee,
        total,
        FREE_DELIVERY_THRESHOLD
    } = useCart();

    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-6 rounded-full">
                        <ShoppingBag size={64} className="text-gray-400" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                    Start Shopping <ArrowRight size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cart.map((item) => (
                                <div key={item.product.id} className="p-4 md:p-6 transition-colors hover:bg-gray-50/50">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        {/* Product Info */}
                                        <div className="col-span-1 md:col-span-6 flex gap-4">
                                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg border border-gray-200 p-2 flex-shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-between py-1">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                                                        {item.product.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1 w-fit mt-2 md:mt-0"
                                                >
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-1 md:col-span-2 md:text-center flex md:block justify-between items-center">
                                            <span className="md:hidden text-gray-500">Price:</span>
                                            <span className="font-medium">{getFormattedINRPrice(item.product.price)}</span>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-1 md:col-span-2 flex md:justify-center justify-between items-center">
                                            <span className="md:hidden text-gray-500">Quantity:</span>
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="col-span-1 md:col-span-2 md:text-right flex md:block justify-between items-center">
                                            <span className="md:hidden text-gray-500">Total:</span>
                                            <span className="font-bold text-gray-900">
                                                {getFormattedINRPrice(item.product.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{getFormattedINRPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                                    {deliveryFee === 0 ? 'FREE' : getFormattedINRPrice(deliveryFee)}
                                </span>
                            </div>

                            {subtotal < FREE_DELIVERY_THRESHOLD && (
                                <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg">
                                    Add <strong>{getFormattedINRPrice(FREE_DELIVERY_THRESHOLD - subtotal)}</strong> more for free delivery
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl">{getFormattedINRPrice(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                        >
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                Secure Checkout • Free Returns • 100% Authentic
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
