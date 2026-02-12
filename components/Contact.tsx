import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Send } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const inputBorder = isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20';
  const placeholderColor = isDarkMode ? 'placeholder-off-white/40' : 'placeholder-deep-teal/40';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.message) {
      // Simulate successful form submission
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-12 rounded-sm border backdrop-blur-md ${
        isDarkMode ? 'bg-deep-teal/90 border-off-white/10' : 'bg-light-bg/90 border-deep-teal/10 shadow-2xl'
      }`}>
        
        {/* Left Side: Contact Info */}
        <div className="space-y-10">
          <div>
            <h3 className={`font-display text-3xl mb-2 ${textColor}`}>Get in Touch</h3>
            <p className={`text-sm font-light ${mutedColor}`}>
              Based in Ontario, ready to start your journey.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Email Us</h4>
                <p className={mutedColor}>
                  <a href="mailto:sales@bluehouseplanning.ca" className="hover:text-muted-gold transition-colors">
                    sales@bluehouseplanning.ca
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Call Us</h4>
                <p className={mutedColor}>
                  <a href="tel:5197742047" className="hover:text-muted-gold transition-colors">
                    (519) 774-2047
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <MapPin className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Studio</h4>
                <p className={mutedColor}>
                  Chestnut Ave, Brantford<br/>ON N3T, Canada
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Facebook className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Social</h4>
                <p className={mutedColor}>
                  <a href="https://www.facebook.com/profile.php?id=100078611357287" target="_blank" rel="noopener noreferrer" className="hover:text-muted-gold transition-colors">
                    Follow Progress
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input 
                id="firstName"
                name="firstName"
                type="text" 
                value={formData.firstName}
                onChange={handleChange}
                placeholder="FIRST NAME" 
                className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${inputBorder} ${textColor} ${placeholderColor}`} 
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input 
                id="lastName"
                name="lastName"
                type="text" 
                value={formData.lastName}
                onChange={handleChange}
                placeholder="LAST NAME" 
                className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${inputBorder} ${textColor} ${placeholderColor}`} 
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS" 
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${inputBorder} ${textColor} ${placeholderColor}`} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="sr-only">Tell us about your project</label>
            <textarea 
              id="message"
              name="message"
              rows={4} 
              value={formData.message}
              onChange={handleChange}
              placeholder="TELL US ABOUT YOUR PROJECT (ONTARIO LOCATION, ETC.)" 
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${inputBorder} ${textColor} ${placeholderColor}`}
              required
            ></textarea>
          </div>
          
          {status === 'success' && (
            <div role="alert" className="p-3 bg-green-900/20 border border-green-500/50 text-green-400 text-xs uppercase tracking-widest rounded-sm">
              Message sent successfully. We will be in touch shortly.
            </div>
          )}
          
          {status === 'error' && (
            <div role="alert" className="p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-xs uppercase tracking-widest rounded-sm">
              Please fill out all required fields.
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-muted-gold text-deep-teal py-4 font-bold tracking-widest uppercase hover:bg-off-white hover:text-deep-teal transition-all duration-300 shadow-lg mt-4 rounded-sm flex items-center justify-center gap-2"
          >
            <span>Send Message</span>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;