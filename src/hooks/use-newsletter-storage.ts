import { useState, useEffect } from 'react';
import {
  getNewsletterSubscription,
  setNewsletterSubscription,
  clearNewsletterSubscription,
  isNewsletterSubscribed,
} from '@/lib/localStorage';

export function useNewsletterStorage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');

  useEffect(() => {
    const subscription = getNewsletterSubscription();
    if (subscription) {
      setIsSubscribed(true);
      setSubscribedEmail(subscription.email);
    }
  }, []);

  const markAsSubscribed = (email: string, formType: 'newsletter' | 'waitlist' = 'newsletter') => {
    setNewsletterSubscription(email, formType);
    setIsSubscribed(true);
    setSubscribedEmail(email);
  };

  const clearSubscription = () => {
    clearNewsletterSubscription();
    setIsSubscribed(false);
    setSubscribedEmail('');
  };

  return {
    isSubscribed,
    subscribedEmail,
    markAsSubscribed,
    clearSubscription,
    isNewsletterSubscribed: isNewsletterSubscribed(),
  };
}