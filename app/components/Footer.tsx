'use client'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: <Github size={24} />, link: 'https://github.com/aliahmad-qari' },
    { icon: <Linkedin size={24} />, link: 'https://linkedin.com/in/muhammad-ali-ahmad-mern' },
    { icon: <Mail size={24} />, link: 'mailto:ali.islamic.meh1@gmail.com' },
    
  ]

  return (
    <footer className="py-8 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors hover:scale-110 transform">
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-center">
            © 2026 Muhammad Ali Ahmad. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
