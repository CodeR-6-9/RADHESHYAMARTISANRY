import { useEffect, useRef } from 'react';
import "./footer.css";

function Footer() {
  // 1. Create refs to attach to the elements you want to observe
  const contactRef = useRef(null);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);

  // 2. Use useEffect to run code after the component renders
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 3. Fix: It's 'classList', not 'classNameList'
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // 4. Observe the elements that have refs attached
    const elementsToObserve = [contactRef.current, socialRef.current, copyrightRef.current];
    elementsToObserve.forEach(el => {
      if (el) {
        observer.observe(el);
      }
    });

    // Cleanup function to stop observing when the component unmounts
    return () => {
      elementsToObserve.forEach(el => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []); // The empty array [] means this effect runs only once

  return (
    // No need for an extra div wrapper here
    <footer>
      {/* 5. Attach the refs to your JSX elements */}
      <div className="contact-info" ref={contactRef}>
        <p>For Orders & Inquiries, Contact Us:</p>
        <p>📞 +91 7985642474 | +91 9555503641</p>
      </div>
      <div className="social-links" ref={socialRef}>
        <a href="https://www.instagram.com/vaibhavitwari/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
          {/* 6. Fix: SVG attributes in JSX must be camelCase */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
      <div className="copyright" ref={copyrightRef}>
        <p>&copy; {new Date().getFullYear()} RADHESHYAM ARTISANRY. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;