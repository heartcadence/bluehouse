import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
  isDarkMode: boolean;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onLogin, isDarkMode }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Clear state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
      onClose();
    } else {
      setError(true);
    }
  };

  const bgClass = isDarkMode ? 'bg-deep-teal-dark border-white/10' : 'bg-white border-deep-teal/10';
  const textClass = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const inputBg = isDarkMode ? 'bg-deep-teal border-off-white/20 text-off-white placeholder-off-white/30' : 'bg-light-bg border-deep-teal/20 text-deep-teal placeholder-deep-teal/30';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm ${isDarkMode ? 'bg-deep-teal/90' : 'bg-light-bg/80'}`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative border w-full max-w-md p-8 rounded shadow-2xl animate-fade-in-up ${bgClass}`}>
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors ${isDarkMode ? 'text-off-white/50 hover:text-white' : 'text-deep-teal/50 hover:text-deep-teal'}`}
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isDarkMode ? 'bg-white/5' : 'bg-deep-teal/5'}`}>
            <Lock size={20} className="text-muted-gold" />
          </div>
          <h2 className={`font-display text-2xl ${textClass}`}>Admin Access</h2>
          <p className={`text-sm mt-2 font-light ${isDarkMode ? 'text-off-white/60' : 'text-dark-text/60'}`}>
            Enter your credentials to access the Sanity Content Lake.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className={`w-full border px-4 py-3 rounded focus:outline-none focus:border-muted-gold transition-colors font-body ${inputBg}`}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 pl-1">Incorrect password. Try 'bluehouse'.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-muted-gold text-deep-teal font-bold tracking-widest uppercase py-3 rounded hover:bg-off-white transition-colors duration-300"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;