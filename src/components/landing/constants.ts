/**
 * Animation configurations for landing page components
 */
export const ANIMATION_CONFIGS = {
  logo: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, type: "spring", bounce: 0.3 },
  },
  socialIcons: {
    container: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
    },
    icon: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: (index: number) => ({
        duration: 0.4,
        delay: 0.7 + index * 0.1,
        type: "spring",
        bounce: 0.4,
      }),
      whileHover: {
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      whileTap: { scale: 0.95 },
    },
  },
  waitlistForm: {
    container: {
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
      },
    },
    button: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.2 },
    },
    form: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.3, duration: 0.3 },
    },
    input: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.4, duration: 0.3 },
    },
    submit: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.5, duration: 0.3, type: "spring", bounce: 0.4 },
    },
  },
  success: {
    container: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, type: "spring", bounce: 0.3 },
    },
    icon: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { delay: 0.2, type: "spring", bounce: 0.6 },
    },
    text: {
      title: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
      },
      subtitle: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4 },
      },
    },
  },
  error: {
    container: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, type: "spring", bounce: 0.3 },
    },
    icon: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { delay: 0.2, type: "spring", bounce: 0.6 },
    },
    text: {
      title: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
      },
      subtitle: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4 },
      },
    },
  },
} as const;

/**
 * Social media links configuration
 */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/alwayswetseattle",
  instagram: "https://instagram.com/alwayswetseattle",
  tiktok: "https://tiktok.com/@alwayswetseattle",
} as const;

/**
 * Logo configuration
 */
export const LOGO_CONFIG = {
  src: "/alwayswet.png",
  alt: "It's Always Wet In Seattle",
  defaultSize: 400,
} as const;

/**
 * Glass morphism CSS classes
 */
export const GLASS_CLASSES = {
  base: "bg-white/10 backdrop-blur-md border border-white/20",
  socialIcon:
    "w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:shadow-lg",
  button:
    "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300",
  input:
    "bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent",
} as const;
