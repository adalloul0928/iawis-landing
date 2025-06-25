"use client";

import { motion } from "framer-motion";
import type React from "react";

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

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/itsalwayswetinseattle",
    label: "Instagram",
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
          aria-label={social.label}
        >
          <social.icon className="w-6 h-6" />
        </motion.a>
      ))}
    </motion.div>
  );
}
