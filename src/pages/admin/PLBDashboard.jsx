import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, FileText, LayoutDashboard, Search, Clock, CheckCircle, Sparkles, ChevronRight, X } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLessons, createLesson } from '../../utils/mockDatabase';

const PLBDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('');
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('plb_current_user') || '{}');

  useEffect(() => {
    setLessons(getLessons());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('plb_current_user');
    navigate('/login');
  };

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourse.trim()) return;

    const newLesson = createLesson(newTitle, newCourse, user.name || user.username);
    setLessons(getLessons());
    setShowModal(false);
    navigate(`/builder/${newLesson.id}`);
  };

  const openBuilder = (id) => {
    navigate(`/builder/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-tl from-teal-900/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Glass Top Navigation */}
      <nav className="h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
        <div className="flex items-center gap-5">
          <Logo className="text-2xl text-white drop-shadow-md" />
          <div className="h-6 w-px bg-white/10"></div>
          <span className="flex items-center gap-2 text-xs font-semibold bg-indigo-500/10 text-indigo-300 px-3 py-1.5 border border-indigo-500/20 rounded-full">
            <Sparkles size={12} /> Workspace Admin
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium text-zinc-400">
            <span className="text-zinc-500 mr-2">Developer:</span>
            <span className="text-zinc-200">{user.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl border border-white/10 transition-all duration-200"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-10 pt-12 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-3 flex items-center gap-4 text-white tracking-tight">
              <div className="p-3 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 rounded-2xl text-indigo-400 shadow-lg shadow-indigo-500/10">
                <LayoutDashboard size={28} />
              </div>
              All Lessons
            </h2>
            <p className="text-zinc-400 font-medium text-lg ml-[68px]">Manage and edit interactive learning modules</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-white/10 transition-all duration-200"
          >
            <Plus size={20} strokeWidth={2.5} /> Create Lesson
          </button>
        </div>

        {/* Dashboard Grid - Modern SaaS Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/20">
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase">Title</th>
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase">Course</th>
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase">Author</th>
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase">Status</th>
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase">Pages</th>
                  <th className="p-6 font-semibold text-zinc-400 text-sm tracking-wide uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {lessons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-16 text-center text-zinc-500 font-medium relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                      <div className="flex flex-col items-center justify-center gap-5 relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600">
                          <FileText size={40} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xl text-zinc-300 mb-2 font-semibold">No lessons found</p>
                          <p className="text-sm">Get started by creating your first interactive module.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  lessons.map((lesson, index) => (
                    <tr key={lesson.id} className={`group ${index !== lessons.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.03] transition-colors duration-200`}>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                            <FileText size={18} />
                          </div>
                          <span className="font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors duration-200">{lesson.title}</span>
                        </div>
                      </td>
                      <td className="p-6 font-medium text-zinc-400">{lesson.course}</td>
                      <td className="p-6 font-medium text-zinc-400 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold border border-white/20 shadow-sm">
                          {lesson.draftedBy.charAt(0).toUpperCase()}
                        </div>
                        {lesson.draftedBy}
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm ${
                          lesson.status === 'Draft' 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                          {lesson.status === 'Draft' ? <Clock size={12} strokeWidth={2.5} /> : <CheckCircle size={12} strokeWidth={2.5} />}
                          {lesson.status}
                        </span>
                      </td>
                      <td className="p-6 font-semibold text-zinc-300">
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg inline-block shadow-inner">
                          {lesson.pagesCount || 1}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => openBuilder(lesson.id)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 shadow-sm hover:shadow-md transition-all duration-200 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 group-hover:text-indigo-300"
                        >
                          Edit <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Glassmorphic Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-[#12121A]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-3xl max-w-md w-full p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 shadow-inner">
               <Plus size={24} />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">Create New Lesson</h3>
            <p className="text-zinc-400 font-medium mb-8 text-sm">Configure the basic details for your new module.</p>
            
            <form onSubmit={handleCreateLesson} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-300">Lesson Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Introduction to Physics"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/5 transition-all duration-300 placeholder-zinc-600 shadow-inner"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-300">Course Name</label>
                <input 
                  type="text" 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. PHY101"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/5 transition-all duration-300 placeholder-zinc-600 shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 rounded-2xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PLBDashboard;
