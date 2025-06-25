"use client";

import { motion } from "framer-motion";
import type React from "react";

// Custom social media icons to avoid deprecated Lucide icons
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.48.207 4.955.43a5.427 5.427 0 0 0-1.962 1.276A5.392 5.392 0 0 0 1.717 3.67C1.493 4.195 1.368 4.81 1.334 5.757.299 6.706.286 7.112.286 10.733s.013 4.027.048 4.976c.034.947.159 1.562.383 2.087a5.427 5.427 0 0 0 1.276 1.962 5.392 5.392 0 0 0 1.962 1.276c.525.224 1.14.35 2.087.383.949.035 1.356.048 4.977.048s4.027-.013 4.976-.048c.947-.034 1.562-.159 2.087-.383a5.427 5.427 0 0 0 1.962-1.276 5.392 5.392 0 0 0 1.276-1.962c.224-.525.35-1.14.383-2.087.035-.949.048-1.356.048-4.977s-.013-4.027-.048-4.976c-.034-.947-.159-1.562-.383-2.087a5.427 5.427 0 0 0-1.276-1.962A5.392 5.392 0 0 0 19.33 1.717c-.525-.224-1.14-.35-2.087-.383C16.294.013 15.888 0 12.267 0h-.25zm-.266 2.171c3.534 0 3.953.014 5.35.048.838.038 1.293.177 1.595.294.401.156.687.343.988.644.301.301.488.587.644.988.117.302.256.757.294 1.595.034 1.397.048 1.816.048 5.35s-.014 3.953-.048 5.35c-.038.838-.177 1.293-.294 1.595a2.654 2.654 0 0 1-.644.988 2.654 2.654 0 0 1-.988.644c-.302.117-.757.256-1.595.294-1.397.034-1.816.048-5.35.048s-3.953-.014-5.35-.048c-.838-.038-1.293-.177-1.595-.294a2.654 2.654 0 0 1-.988-.644 2.654 2.654 0 0 1-.644-.988c-.117-.302-.256-.757-.294-1.595-.034-1.397-.048-1.816-.048-5.35s.014-3.953.048-5.35c.038-.838.177-1.293.294-1.595.156-.401.343-.687.644-.988.301-.301.587-.488.988-.644.302-.117.757-.256 1.595-.294 1.397-.034 1.816-.048 5.35-.048z" />
    <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
    <circle cx="18.406" cy="5.594" r="1.44" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.944-1.316-2.17-1.316-3.456 0-.085-.003-.17-.009-.254h3.3v3.934zM9.372 18.385c-1.813 0-3.291-1.478-3.291-3.291s1.478-3.291 3.291-3.291 3.291 1.478 3.291 3.291-1.478 3.291-3.291 3.291zm7.943-8.82v2.616c-1.18 0-2.315-.377-3.252-1.08v5.087c0 2.617-2.122 4.74-4.74 4.74s-4.74-2.123-4.74-4.74 2.123-4.74 4.74-4.74c.308 0 .607.03.893.087v2.713a2.042 2.042 0 0 0-.893-.202c-1.188 0-2.154.966-2.154 2.154s.966 2.154 2.154 2.154 2.154-.966 2.154-2.154V.388h2.586c.202 1.725.995 3.278 2.252 4.39z" />
  </svg>
);

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: TwitterIcon,
    href: "https://twitter.com/alwayswetseattle",
    label: "Twitter",
  },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/alwayswetseattle",
    label: "Instagram",
  },
  {
    icon: TikTokIcon,
    href: "https://tiktok.com/@alwayswetseattle",
    label: "TikTok",
  },
];

interface SocialIconsProps {
  className?: string;
}

/**
 * Social media icons component with glass morphism styling
 * Features staggered entrance animations and hover effects
 * Responsive design with mobile-optimized spacing
 */
export function SocialIcons({ className }: SocialIconsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className={`flex gap-2 sm:gap-4 ${className}`}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.7 + index * 0.1,
            type: "spring",
            bounce: 0.4,
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:shadow-lg"
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
}
