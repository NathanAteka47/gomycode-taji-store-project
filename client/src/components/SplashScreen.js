import { jsx as _jsx } from "react/jsx-runtime";
// src/components/SplashScreen.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000); // 3 sec splash
        return () => clearTimeout(timer);
    }, []);
    return (_jsx(AnimatePresence, { children: isVisible && (_jsx(motion.div, { className: "fixed inset-0 bg-red-900 text-white flex items-center justify-center z-50", initial: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 1 }, children: _jsx(motion.h1, { className: "text-5xl md:text-7xl font-bold tracking-wider", initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 1.2, ease: "easeInOut" }, children: _jsx("img", { src: "/logo.png" // adjust path if needed
                    , alt: "Taji Store Logo", className: "animate-fade-in w-40 h-40 md:w-64 md:h-64 object-contain" }) }) })) }));
}
