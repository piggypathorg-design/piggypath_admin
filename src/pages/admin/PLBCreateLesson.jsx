import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { createLesson } from '../../utils/api';

const PLBCreateLesson = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newLevel, setNewLevel] = useState('Beginner');
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('plb_current_user') || '{}'));
  
  const navigate = useNavigate();

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourse.trim()) return;

    setIsCreating(true);
    setErrorMsg(null);
    const newLesson = await createLesson(newTitle, newDescription, newCourse, newLevel, user.name || user.username);
    
    setIsCreating(false);
    if (newLesson) {
      navigate(`/builder/${newLesson.id}`);
    } else {
      setErrorMsg("Failed to create lesson. Please try again or check console.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E4E7] flex flex-col font-sans relative overflow-hidden selection:bg-[#00E599] selection:text-black">
      
      {/* Header */}
      <header className="h-20 bg-white border-b-[3px] border-black px-6 flex items-center shrink-0 z-30 shadow-[0_4px_0_0_#000] relative">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-black rounded-full font-black hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} /> Cancel
          </button>
          <div className="h-8 w-[3px] bg-black"></div>
          <Logo className="text-2xl text-black" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white border-[4px] border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] rounded-3xl max-w-lg w-full p-10 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-4xl font-black mb-2 text-black tracking-tight">Create new lesson</h3>
          <p className="text-gray-500 font-bold mb-8 text-sm">Give it a name and pick a course/level.</p>
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-100 border-[3px] border-red-500 text-red-700 font-black rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleCreateLesson} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-black mb-2 text-black uppercase tracking-widest">Lesson name *</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Compound interest 101"
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:-translate-y-1 transition-all duration-200 placeholder-gray-400"
                required
                disabled={isCreating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-black mb-2 text-black uppercase tracking-widest">Description</label>
              <textarea 
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Optional"
                rows={3}
                className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:-translate-y-1 transition-all duration-200 placeholder-gray-400 resize-none"
                disabled={isCreating}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-black mb-2 text-black uppercase tracking-widest">Course</label>
                <input 
                  type="text" 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Personal Finance"
                  className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:-translate-y-1 transition-all duration-200 placeholder-gray-400"
                  required
                  disabled={isCreating}
                />
              </div>
              <div>
                <label className="block text-sm font-black mb-2 text-black uppercase tracking-widest">Level</label>
                <select 
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  className="w-full px-5 py-4 bg-white border-[3px] border-black rounded-xl text-black font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:-translate-y-1 transition-all duration-200 appearance-none cursor-pointer"
                  required
                  disabled={isCreating}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit" 
                disabled={isCreating}
                className="w-full py-4 bg-[#8B5CF6] hover:bg-purple-500 text-white font-black text-lg border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isCreating ? <Loader2 size={24} className="animate-spin text-white" /> : 'Create Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PLBCreateLesson;
