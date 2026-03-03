import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ThankYou: React.FC = () => {
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Manually push state to trigger the App.tsx listener
                    window.history.pushState({}, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleReturn = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl w-full bg-deep-teal-dark/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl animate-slide-up">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Animated Icon Container */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-muted-gold/20 blur-2xl rounded-full"></div>
                        <CheckCircle className="w-20 h-20 text-muted-gold relative z-10" />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <h1 className="font-display text-3xl md:text-4xl text-off-white tracking-wider uppercase">
                            Thank you for your purchase!
                        </h1>
                        <p className="text-off-white/70 text-lg leading-relaxed max-w-lg mx-auto">
                            Your architectural blueprints are being prepared. You will receive an email from <span className="text-muted-gold font-bold">plans@bluehouseplanning.ca</span> with your download link in the next few minutes.
                        </p>
                    </div>

                    {/* Interactive Section */}
                    <div className="w-full pt-8 space-y-6">
                        <button
                            onClick={handleReturn}
                            className="w-full group flex items-center justify-center gap-3 bg-muted-gold hover:bg-muted-gold/90 text-deep-teal font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-muted-gold/20"
                        >
                            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            <span>RETURN TO WEBSITE</span>
                        </button>

                        <p className="text-off-white/40 text-xs tracking-[0.2em] font-bold uppercase">
                            Redirecting you back to the home page in <span className="text-muted-gold">{countdown}</span> seconds...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;