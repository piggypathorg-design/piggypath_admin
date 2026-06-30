import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ─── tiny icon helpers ─── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
  </svg>
);

/* ─── oauth providers ─── */
const OAUTH_PROVIDERS = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: <GoogleIcon />,
    className: 'bg-white text-[#18181B] dark:bg-[#27272A] dark:text-white',
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: <FacebookIcon />,
    className: 'bg-[#1877F2] text-white',
  },
  {
    id: 'apple',
    label: 'Continue with Apple',
    icon: <AppleIcon />,
    className: 'bg-black text-white dark:bg-[#18181B]',
  },
];

/* ─── main component ─── */
export default function SignInPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* redirect if already logged in */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/app', { replace: true });
    });
  }, [navigate]);

  const clearMessages = () => { setError(''); setSuccess(''); };

  /* ─── OAuth ─── */
  const handleOAuth = async (provider) => {
    clearMessages();
    setOauthLoading(provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (error) setError(error.message);
    setOauthLoading(null);
  };

  /* ─── Email / Password ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6 && mode !== 'forgot') {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/app', { replace: true });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/app` },
        });
        if (error) throw error;
        setSuccess('Account created! Check your email to confirm your address.');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccess('Password reset link sent! Check your inbox.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next) => {
    clearMessages();
    setPassword('');
    setConfirmPassword('');
    setMode(next);
  };

  const titles = {
    signin: { heading: 'Welcome back 👋', sub: 'Sign in to continue your PiggyPath journey.' },
    signup: { heading: 'Create account 🐷', sub: 'Start saving smarter with PiggyPath.' },
    forgot: { heading: 'Reset password 🔑', sub: "We'll email you a reset link." },
  };

  return (
    <div className="relative z-10 min-h-screen font-sans selection:bg-[#00E599] selection:text-[#18181B] bg-[#F4F4F5] dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] transition-colors flex items-center justify-center px-4 py-16 overflow-hidden">
      
      {/* ─── decorative brutalist shapes ─── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50 dark:opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-[#00E599] border-[4px] border-[#18181B] shadow-[8px_8px_0_#18181B]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-24 w-48 h-48 rounded-full bg-[#8B5CF6] border-[4px] border-[#18181B] shadow-[8px_8px_0_#18181B]"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/4 w-32 h-32 rotate-45 bg-yellow-400 border-[4px] border-[#18181B] shadow-[8px_8px_0_#18181B]"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* ─── logo ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-[6px]">
              <div className="w-8 h-8 rounded-full bg-[#00E599] border-[3px] border-[#18181B] dark:border-[#18181B] shadow-[3px_3px_0_#18181B] dark:shadow-[3px_3px_0_#000] group-hover:-translate-y-1 transition-transform" />
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] border-[3px] border-[#18181B] dark:border-[#18181B] shadow-[3px_3px_0_#18181B] dark:shadow-[3px_3px_0_#000] group-hover:-translate-y-1 transition-transform [transition-delay:50ms]" />
            </div>
            <span className="font-black text-3xl tracking-tight">PiggyPath</span>
          </Link>
        </motion.div>

        {/* ─── card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-[#27272A] border-[4px] border-[#18181B] dark:border-[#3F3F46] rounded-2xl shadow-[8px_8px_0_#18181B] dark:shadow-[8px_8px_0_#000] p-8"
        >
          {/* heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + '-heading'}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-black mb-1">{titles[mode].heading}</h1>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6">{titles[mode].sub}</p>
            </motion.div>
          </AnimatePresence>

          {/* ─── OAuth buttons (hidden on forgot) ─── */}
          {mode !== 'forgot' && (
            <>
              <div className="flex flex-col gap-3 mb-6">
                {OAUTH_PROVIDERS.map((p) => (
                  <motion.button
                    key={p.id}
                    id={`oauth-${p.id}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2 }}
                    onClick={() => handleOAuth(p.id)}
                    disabled={!!oauthLoading || loading}
                    className={`flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl font-black border-[3px] border-[#18181B] dark:border-[#3F3F46] shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#18181B] dark:hover:shadow-[6px_6px_0_#000] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${p.className}`}
                  >
                    {oauthLoading === p.id
                      ? <Loader2 size={20} className="animate-spin" />
                      : p.icon}
                    {p.label}
                  </motion.button>
                ))}
              </div>

              {/* divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-[3px] bg-[#18181B] dark:bg-[#3F3F46]" />
                <span className="text-xs font-black uppercase tracking-widest">or</span>
                <div className="flex-1 h-[3px] bg-[#18181B] dark:bg-[#3F3F46]" />
              </div>
            </>
          )}

          {/* ─── email/password form ─── */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-black mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-[#3F3F46] focus:border-[#00E599] dark:focus:border-[#00E599] rounded-xl pl-9 pr-4 py-3 placeholder-gray-500 outline-none transition-colors text-sm font-bold shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000]"
                />
              </div>
            </div>

            {/* password (hidden on forgot) */}
            {mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="block text-sm font-black mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-[#3F3F46] focus:border-[#00E599] dark:focus:border-[#00E599] rounded-xl pl-9 pr-10 py-3 placeholder-gray-500 outline-none transition-colors text-sm font-bold shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#18181B] dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* confirm password (signup only) */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-black mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F4F4F5] dark:bg-[#18181B] border-[3px] border-[#18181B] dark:border-[#3F3F46] focus:border-[#00E599] dark:focus:border-[#00E599] rounded-xl pl-9 pr-4 py-3 placeholder-gray-500 outline-none transition-colors text-sm font-bold shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000]"
                  />
                </div>
              </div>
            )}

            {/* forgot link (signin only) */}
            {mode === 'signin' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs font-black hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* error / success */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 bg-red-100 dark:bg-red-900/30 border-[3px] border-[#18181B] dark:border-red-900 rounded-xl p-3 text-red-600 dark:text-red-400 font-bold text-sm shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000]"
                >
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 bg-green-100 dark:bg-green-900/30 border-[3px] border-[#18181B] dark:border-green-900 rounded-xl p-3 text-green-600 dark:text-green-400 font-bold text-sm shadow-[4px_4px_0_#18181B] dark:shadow-[4px_4px_0_#000]"
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* submit */}
            <motion.button
              id="auth-submit-btn"
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              disabled={loading || !!oauthLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[#18181B] bg-[#00E599] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:shadow-[6px_6px_0_#18181B] transition-all disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {loading
                ? <Loader2 size={18} className="animate-spin" />
                : <>
                    {mode === 'signin' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Link'}
                    <ArrowRight size={16} />
                  </>
              }
            </motion.button>
          </form>

          {/* ─── footer links ─── */}
          <div className="mt-6 text-center text-sm font-bold">
            {mode === 'signin' && (
              <>
                <span className="text-gray-500">Don't have an account?</span>{' '}
                <button
                  id="switch-to-signup"
                  onClick={() => switchMode('signup')}
                  className="hover:underline transition-all"
                >
                  Sign up free
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                <span className="text-gray-500">Already have an account?</span>{' '}
                <button
                  id="switch-to-signin"
                  onClick={() => switchMode('signin')}
                  className="hover:underline transition-all"
                >
                  Sign in
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <button
                id="back-to-signin"
                onClick={() => switchMode('signin')}
                className="hover:underline transition-all"
              >
                ← Back to Sign In
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── bottom note ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs font-bold text-gray-500 mt-6"
        >
          By continuing you agree to our{' '}
          <span className="underline cursor-pointer hover:text-[#18181B] dark:hover:text-white transition-colors">Terms</span>{' '}
          and{' '}
          <span className="underline cursor-pointer hover:text-[#18181B] dark:hover:text-white transition-colors">Privacy Policy</span>.
        </motion.p>
      </div>
    </div>
  );
}
