/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Users,
  BarChart3,
  Shield,
  ChevronRight,
  Zap,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  LogIn,
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const FEATURES = [
  {
    icon: Users,
    title: 'Team Management',
    description: 'Organize teams, assign roles, and track productivity with intuitive dashboards.',
  },
  {
    icon: Briefcase,
    title: 'Project Tracking',
    description: 'Monitor project progress, budgets, and deadlines all in one place.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'AI-powered insights and KPI tracking to boost team performance.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with role-based access control.',
  },
  {
    icon: Clock,
    title: 'Attendance & Payroll',
    description: 'Automated attendance tracking, leave management, and payroll processing.',
  },
  {
    icon: Globe,
    title: 'Communication Hub',
    description: 'Team chat, announcements, and document sharing in a unified workspace.',
  },
];

const STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: '50+', label: 'Features' },
  { value: '10x', label: 'Faster' },
  { value: '24/7', label: 'Support' },
];

function FloatingOrb({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        scale: [1, 1.1, 1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <motion.p
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </motion.div>
  );
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const container = document.getElementById('landing-scroll-container');
    if (!container) return;
    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Background orbs */}
      <FloatingOrb delay={0} size={400} x="10%" y="20%" />
      <FloatingOrb delay={2} size={300} x="70%" y="10%" />
      <FloatingOrb delay={4} size={350} x="50%" y="60%" />
      <FloatingOrb delay={1} size={250} x="80%" y="70%" />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scrollable content */}
      <div id="landing-scroll-container" className="relative z-10 h-screen overflow-y-auto">
        {/* Navbar */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5'
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                RANBIDGE <span className="text-indigo-400">Work Hub</span>
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <motion.a href="#features" className="hover:text-white transition-colors" whileHover={{ y: -1 }}>Features</motion.a>
              <motion.a href="#stats" className="hover:text-white transition-colors" whileHover={{ y: -1 }}>Stats</motion.a>
              <motion.a href="#cta" className="hover:text-white transition-colors" whileHover={{ y: -1 }}>Get Started</motion.a>
            </div>

            <motion.button
              onClick={onLogin}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="w-4 h-4" />
              Login
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Workspace Management
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block">Your Workspace,</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reimagined.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Manage teams, track projects, and boost productivity with RANBIDGE Work Hub — the all-in-one platform designed for modern workplaces.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                onClick={onLogin}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-lg font-semibold transition-all shadow-2xl shadow-indigo-500/25 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.a
                href="#features"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Hero visual element */}
            <motion.div
              className="mt-20 relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10 pointer-events-none" />
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-1 shadow-2xl shadow-indigo-500/10 overflow-hidden"
                  whileHover={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}
                >
                  <div className="rounded-xl bg-gradient-to-br from-[#111128] to-[#0d0d20] p-8">
                    {/* Mock dashboard preview */}
                    <div className="flex gap-4 mb-6">
                      {[
                        { label: 'Employees', val: '156', color: 'from-indigo-500 to-blue-500' },
                        { label: 'Projects', val: '24', color: 'from-purple-500 to-pink-500' },
                        { label: 'Tasks', val: '89', color: 'from-emerald-500 to-teal-500' },
                        { label: 'Teams', val: '12', color: 'from-amber-500 to-orange-500' },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                        >
                          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                          <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.val}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    {/* Mock chart bars */}
                    <div className="flex items-end gap-2 h-32">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600/60 to-purple-500/60"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 1.5 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {STATS.map((stat, i) => (
                <AnimatedCounter key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                A comprehensive suite of tools to manage your entire workforce efficiently.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* CTA background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />

              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your Workspace?
                </motion.h2>
                <motion.p
                  className="text-gray-400 text-lg mb-8 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Join RANBIDGE Work Hub and experience the future of workspace management.
                </motion.p>
                <motion.button
                  onClick={onLogin}
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-lg font-semibold transition-all shadow-2xl shadow-indigo-500/25 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <LogIn className="w-5 h-5" />
                  Login to Your Workspace
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>&copy; 2026 RANBIDGE Work Hub. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
