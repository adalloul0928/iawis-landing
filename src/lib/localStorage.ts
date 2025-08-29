interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  formType: 'newsletter' | 'waitlist';
}

const NEWSLETTER_STORAGE_KEY = 'newsletter_subscription';

export function getNewsletterSubscription(): NewsletterSubscription | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored) as NewsletterSubscription;
    return data;
  } catch {
    return null;
  }
}

export function setNewsletterSubscription(
  email: string,
  formType: 'newsletter' | 'waitlist' = 'newsletter'
): void {
  if (typeof window === 'undefined') return;
  
  const subscription: NewsletterSubscription = {
    email,
    subscribedAt: new Date().toISOString(),
    formType,
  };
  
  try {
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscription));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function clearNewsletterSubscription(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(NEWSLETTER_STORAGE_KEY);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function isNewsletterSubscribed(): boolean {
  return getNewsletterSubscription() !== null;
}