import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Use FormSubmit's AJAX endpoint
      const response = await fetch("https://formsubmit.co/ajax/sales@bluehouseplanning.ca", {
        method: "POST",
        headers: { 
            'Accept': 'application/json' 
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try contacting us directly via email.");
    } finally {
      setIsSubmitting(false);
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
            <p className={`text-sm font-light ${mutedColor}`}>We are ready to start your journey.</p>
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
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Chestnut+Ave+Brantford+ON+N3T+Canada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-gold transition-colors"
                    aria-label="View our Brantford studio on Google Maps"
                  >
                    Chestnut Ave, Brantford<br/>ON N3T, Canada
                  </a>
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

        {/* Right Side: Form or Success State */}
        <div className="relative">
          {isSuccess ? (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-12">
                <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-muted-gold" />
                </div>
                <div>
                  <h3 className={`font-display text-2xl mb-2 ${textColor}`}>Message Sent</h3>
                  <p className={`text-sm font-light max-w-xs mx-auto ${mutedColor}`}>
                    Thank you for reaching out. We have received your inquiry and will be in touch shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className={`mt-4 text-[10px] uppercase tracking-widest font-bold border-b pb-1 hover:text-muted-gold transition-colors ${textColor} border-current`}
                >
                  Send Another Message
                </button>
             </div>
          ) : (
            <form 
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              {/* Hidden FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Project Inquiry from Bluehouse Website" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              {/* _next is removed because we handle redirect via JS/state now */}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="First Name"
                  placeholder="FIRST NAME" 
                  aria-label="First Name"
                  required
                  disabled={isSubmitting}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors disabled:opacity-50 ${
                    isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
                  }`} 
                />
                <input 
                  type="text" 
                  name="Last Name"
                  placeholder="LAST NAME" 
                  aria-label="Last Name"
                  required
                  disabled={isSubmitting}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors disabled:opacity-50 ${
                    isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
                  }`} 
                />
              </div>
              <input 
                type="email" 
                name="Email"
                placeholder="EMAIL ADDRESS" 
                aria-label="Email Address"
                required
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors disabled:opacity-50 ${
                  isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
                }`} 
              />
              <textarea 
                rows={4} 
                name="Project Details"
                placeholder="TELL US ABOUT YOUR PROJECT" 
                aria-label="Tell us about your project"
                required
                disabled={isSubmitting}
                className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors disabled:opacity-50 ${
                  isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
                }`}
              ></textarea>
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-deep-teal text-off-white py-4 font-bold tracking-widest uppercase hover:bg-muted-gold transition-colors shadow-lg mt-4 rounded-sm flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;