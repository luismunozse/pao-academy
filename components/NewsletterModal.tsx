'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, CheckCircle, Gift } from 'lucide-react';

export default function NewsletterModal({
  t, isOpen, onClose
}:{ 
  t:(k:string)=>string; 
  isOpen: boolean;
  onClose: () => void;
}){
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Close modal after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail('');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setIsSuccess(false);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="size-5 text-gray-500" />
        </button>

        {!isSuccess ? (
          <>
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="size-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('newsletterTitle')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('newsletterDesc')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletterPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Suscribiendo...
                  </>
                ) : (
                  <>
                    <Mail className="size-4" />
                    {t('newsletterButton')}
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              No spam. Cancela cuando quieras.
            </p>
          </>
        ) : (
          /* Success state */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              ¡Perfecto!
            </h3>
            <p className="text-gray-600 text-sm">
              {t('newsletterSuccess')}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
