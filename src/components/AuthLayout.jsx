import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import happyCustomer from '../assets/happy_customer.png';
import authBackground from '../assets/auth-background.png';
import logoSmall from '../assets/logo-small.png';

const AuthLayout = () => {
    const location = useLocation();
    const isSignup = location.pathname === '/signup';

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    // 1 for sliding right (Login -> Signup), -1 for sliding left (Signup -> Login)
    const direction = isSignup ? 1 : -1;

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
            {/* Left Side - Decorative (Static) */}
            <div className="relative hidden lg:flex flex-col justify-between p-10 text-white dark:border-r">
                <div className="flex items-center gap-3 font-medium text-lg z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 shadow-lg">
                        <img src={logoSmall} alt="ShopScore Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-xl tracking-tight font-semibold">ShopScore</span>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium leading-relaxed">
                            &ldquo;ShopScore has completely transformed how I shop online. The deals are amazing and the delivery is super fast.&rdquo;
                        </p>
                        <footer className="flex items-center gap-4 pt-4">
                            <img
                                src={happyCustomer}
                                alt="Uttam Mahato"
                                className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
                            />
                            <div className="text-sm">
                                <div className="font-semibold">Uttam Mahato</div>
                                <div className="text-zinc-400">Verified Customer</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0 bg-zinc-900/40 z-0" />
                <img
                    src={authBackground}
                    alt="Background"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
            </div>

            {/* Right Side - Form (Animated) */}
            <div className="grid place-items-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10 overflow-y-auto overflow-x-hidden">
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={location.pathname}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full max-w-[400px] col-start-1 row-start-1"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AuthLayout;
