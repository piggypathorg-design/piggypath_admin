import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Sparkles } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { loginUser } from '../../utils/mockDatabase';

const PLBLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const user = localStorage.getItem('plb_current_user');
    if (user) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginUser(username, password);
    
    if (user) {
      localStorage.setItem('plb_current_user', JSON.stringify(user));
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Animated Ambient Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Glassmorphic Login Card */}
      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-10 text-center relative z-10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-white/20">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 relative">
            <Lock size={32} className="text-white relative z-10" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md"></div>
          </div>
        </div>
        
        <div className="flex justify-center mb-2">
           <Logo className="text-3xl text-white drop-shadow-md" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-zinc-400 font-medium mb-8 text-sm">Sign in to access the PiggyPath Builder</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-400 text-zinc-500">
              <User size={20} />
            </div>
            <input 
              type="text" 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Username"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-400 text-zinc-500">
              <Lock size={20} />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-sm py-2 rounded-xl text-center">
              {error}
            </div>
          )}
          
          <button type="submit" className="w-full mt-2 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex justify-center items-center gap-2">
            Sign In <Sparkles size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-zinc-500 font-medium">
            Test Accounts: <span className="text-zinc-400">dev1 / password</span> or <span className="text-zinc-400">dev2 / password</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PLBLogin;
