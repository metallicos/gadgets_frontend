import Link from 'next/link';
import { useState } from 'react';
import { useNewsletter } from '@/hooks/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { subscribe } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribe.mutateAsync(email);
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              GadgetsHub
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Your ultimate destination for discovering the latest and greatest home gadgets. 
              We help you make informed decisions with detailed reviews and comparisons.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.281C3.85 14.977 3.014 13.116 3.014 11.987c0-1.129.836-2.99 2.112-3.72.875-.791 2.026-1.281 3.323-1.281 1.297 0 2.448.49 3.323 1.281 1.276.73 2.112 2.591 2.112 3.72 0 1.129-.836 2.99-2.112 3.72-.875.791-2.026 1.281-3.323 1.281z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/products" className="text-base text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-base text-gray-400 hover:text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-base text-gray-400 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-base text-gray-400">
                Get the latest gadget reviews and deals delivered to your inbox.
              </p>
            </div>
            <div className="flex-shrink-0">
              {subscribed ? (
                <div className="text-green-400 text-sm">
                  ✓ Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribe.isPending}
                    className="flex-shrink-0 px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2025 GadgetsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
