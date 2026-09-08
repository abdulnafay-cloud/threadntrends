"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-white/10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Size Guide</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Size</span>
                <span>Chest (cm)</span>
                <span>Waist (cm)</span>
              </div>
              <div className="flex justify-between">
                <span>S</span>
                <span>86-91</span>
                <span>71-76</span>
              </div>
              <div className="flex justify-between">
                <span>M</span>
                <span>91-96</span>
                <span>76-81</span>
              </div>
              <div className="flex justify-between">
                <span>L</span>
                <span>96-101</span>
                <span>81-86</span>
              </div>
              <div className="flex justify-between">
                <span>XL</span>
                <span>101-106</span>
                <span>86-91</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}