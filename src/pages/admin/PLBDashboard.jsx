import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, FileText, LayoutDashboard, Search, Clock, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0c0620] text-white font-sans">
      {/* Top Navigation */}
      <nav className="h-16 bg-[#12123A] border-b-2 border-[#29366F] flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#F4F4F5] rounded flex items-center justify-center p-1">
            <Logo className="text-xl" />
          </div>
          <h1 className="text-xl font-black tracking-wide text-gradient-lime">Lesson Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-bold text-[#A1A1AA]">
            Logged in as: <span className="text-white">{user.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#29366F] hover:bg-[#3a4a8f] text-white font-bold rounded-lg transition-colors border-2 border-[#41539e]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-[#00E599]" /> All Lessons
            </h2>
            <p className="text-[#A1A1AA] font-semibold">Manage your interactive lessons for PiggyPath</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#00E599] text-[#18181B] font-black rounded-xl border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] transition-all"
          >
            <Plus size={20} strokeWidth={3} /> Create New Lesson
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="bg-[#12123A] border-2 border-[#29366F] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f0f23] border-b-2 border-[#29366F]">
                  <th className="p-5 font-black text-[#A1A1AA]">Title</th>
                  <th className="p-5 font-black text-[#A1A1AA]">Course</th>
                  <th className="p-5 font-black text-[#A1A1AA]">Drafted By</th>
                  <th className="p-5 font-black text-[#A1A1AA]">Status</th>
                  <th className="p-5 font-black text-[#A1A1AA]">Pages</th>
                  <th className="p-5 font-black text-[#A1A1AA]">Action</th>
                </tr>
              </thead>
              <tbody>
                {lessons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-[#A1A1AA] font-bold">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <FileText size={48} className="opacity-50" />
                        <p>No lessons created yet. Click "Create New Lesson" to begin.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  lessons.map(lesson => (
                    <tr key={lesson.id} className="border-b border-[#29366F]/50 hover:bg-[#1a1a45] transition-colors">
                      <td className="p-5 font-bold">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                            <FileText size={16} />
                          </div>
                          {lesson.title}
                        </div>
                      </td>
                      <td className="p-5 text-[#E0D7FF] font-semibold">{lesson.course}</td>
                      <td className="p-5 text-[#E0D7FF] font-semibold">{lesson.draftedBy}</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                          lesson.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-[#00E599]/20 text-[#00E599]'
                        }`}>
                          {lesson.status === 'Draft' ? <Clock size={12} /> : <CheckCircle size={12} />}
                          {lesson.status}
                        </span>
                      </td>
                      <td className="p-5 text-[#E0D7FF] font-bold">{lesson.pagesCount || 1}</td>
                      <td className="p-5">
                        <button 
                          onClick={() => openBuilder(lesson.id)}
                          className="px-4 py-2 bg-[#8B5CF6] text-white font-black rounded border-2 border-[#6D28D9] hover:bg-[#7C3AED] transition-colors"
                        >
                          Edit Builder
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

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0c0620]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12123A] border-[4px] border-[#29366F] shadow-[8px_8px_0_#09091A] rounded-2xl max-w-md w-full p-6 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-black mb-2 text-white">Create New Lesson</h3>
            <p className="text-[#A1A1AA] font-semibold mb-6">Set up the initial details for the lesson.</p>
            
            <form onSubmit={handleCreateLesson} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-black mb-2 text-[#E0D7FF]">Lesson Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Introduction to Python"
                  className="w-full px-4 py-3 bg-[#0c0620] border-2 border-[#29366F] rounded-xl text-white font-bold focus:outline-none focus:border-[#00E599]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-black mb-2 text-[#E0D7FF]">Course Name</label>
                <input 
                  type="text" 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. CS101"
                  className="w-full px-4 py-3 bg-[#0c0620] border-2 border-[#29366F] rounded-xl text-white font-bold focus:outline-none focus:border-[#00E599]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="py-3 bg-transparent text-white font-black border-2 border-[#29366F] rounded-xl hover:bg-[#29366F]/50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-3 bg-[#00E599] text-[#18181B] font-black border-2 border-[#00E599] rounded-xl hover:bg-[#00c282] transition-colors"
                >
                  Create
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
