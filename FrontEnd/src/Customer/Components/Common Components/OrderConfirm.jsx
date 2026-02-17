import React, { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function OrderConfirm() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setShowConfetti(true);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
        isVisible ? 'bg-[rgba(0,0,0,0.75)]' : 'bg-transparent'
      }`}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (           // ← reduced from 500 to 80 for performance
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'][i % 3],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div
        className={`
          bg-white rounded-2xl shadow-2xl p-6 sm:p-8 
          w-[90%] max-w-md mx-4
          transform transition-all duration-500 ease-out
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          relative overflow-hidden
        `}
      >
        {/* Pulsing backgrounds */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-900 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-900 rounded-full opacity-20 animate-pulse-slow-delayed"></div>

        {/* Content */}
        <div className="text-center pt-2 pb-6 relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-700 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-4 bg-green-100 rounded-full flex items-center justify-center animate-bounce-once">
              <CheckCircleOutlineIcon className="text-green-600" sx={{ fontSize: 75 }} />
            </div>
            <div className="absolute -inset-2 border-4 border-green-400 rounded-full animate-spin-slow"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 animate-text-slide-up">
            Order Confirmed!
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed animate-text-slide-up-delayed">
            Thank you for your order!<br />
            We are preparing your items with care.
          </p>
        </div>
      </div>

      {/* ← Changed from jsx to normal style tag – removes warning */}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(720deg); }
        }

        @keyframes modalAppear {
          0% { opacity: 0; transform: scale(0.9) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes textSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50%      { transform: scale(1.05); opacity: 0.3; }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s infinite ease-in-out;
        }

        .animate-pulse-slow-delayed {
          animation: pulseSlow 8s infinite ease-in-out 3s;
        }

        .animate-bounce-once {
          animation: bounceOnce 0.9s ease-in-out;
        }

        .animate-text-slide-up {
          animation: textSlideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-text-slide-up-delayed {
          animation: textSlideUp 0.6s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}