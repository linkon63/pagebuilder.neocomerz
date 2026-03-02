import React from 'react';
import { FooterProps } from '../../../ui-package/types';

export default function Footer({
  sections,
  socialLinks = [],
  copyright,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks.length > 0 && (
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label={link.title}
                >
                  <span style={{ color: colors.primary }}>{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
