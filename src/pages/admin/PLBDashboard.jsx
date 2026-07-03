import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, LogOut, FileText, LayoutDashboard, Search, Clock, 
  CheckCircle, Sparkles, ChevronRight, X, Settings, 
  Users, FolderOpen, Trash2, AlertTriangle, Activity, Loader2, Save
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import { getLessons, createLesson, deleteLesson, getActivities, getUsers, updateUser } from '../../utils/api';

const PLBDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  const [lessons, setLessons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [profileName, setProfileName] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('plb_current_user') || '{}'));

  useEffect(() => {
    if(user && user.name) setProfileName(user.name);
    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    const [fetchedLessons, fetchedActivities, fetchedUsers] = await Promise.all([
      getLessons(),
      getActivities(),
      getUsers()
    ]);
    setLessons(fetchedLessons || []);
    setActivities(fetchedActivities || []);
    setTeamMembers(fetchedUsers || []);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('plb_current_user');
    navigate('/login');
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourse.trim()) return;

    setIsCreating(true);
    const newLesson = await createLesson(newTitle, newCourse, user.name || user.username);
    await refreshData();
    setShowCreateModal(false);
    setNewTitle('');
    setNewCourse('');
    setIsCreating(false);
    if (newLesson) {
      navigate(`/builder/${newLesson.id}`);
    }
  };

  const confirmDelete = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteModal(true);
  };

  const handleDeleteLesson = async () => {
    if (lessonToDelete) {
      setIsDeleting(true);
      await deleteLesson(lessonToDelete.id, user.name || user.username);
      await refreshData();
      setShowDeleteModal(false);
      setLessonToDelete(null);
      setIsDeleting(false);
    }
  };
  
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if(!user.id) return;
    setIsSavingSettings(true);
    const updatedUser = await updateUser(user.id, profileName);
    if(updatedUser) {
      localStorage.setItem('plb_current_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      await refreshData();
    }
    setIsSavingSettings(false);
  };

  const openBuilder = (id) => {
    navigate(`/builder/${id}`);
  };

  // Metrics calculation
  const totalLessons = lessons.length;
  const publishedLessons = lessons.filter(l => l.status === 'Published').length;
  const draftLessons = lessons.filter(l => l.status === 'Draft').length;
  const totalAuthors = new Set(lessons.map(l => l.draftedBy)).size;

  // Filtering lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lesson.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' ? true : lesson.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [lessons, searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-white flex">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[500px] bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-tl from-teal-900/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/5 backdrop-blur-3xl flex flex-col justify-between sticky top-0 h-screen overflow-y-auto z-40">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-white/5 mb-6">
            <Logo className="text-xl text-white drop-shadow-md" />
          </div>
          
          <nav className="px-4 flex flex-col gap-2">
            <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2 px-2">Menu</div>
            
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeView === 'dashboard' ? 'bg-indigo-500/10 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            
            <button 
              onClick={() => setActiveView('lessons')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeView === 'lessons' ? 'bg-indigo-500/10 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
            >
              <FolderOpen size={18} /> All Lessons
            </button>
            
            <button 
              onClick={() => setActiveView('team')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeView === 'team' ? 'bg-indigo-500/10 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
            >
              <Users size={18} /> Team Members
            </button>
            
            <button 
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeView === 'settings' ? 'bg-indigo-500/10 text-indigo-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
            >
              <Settings size={18} /> Settings
            </button>
            
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-zinc-200 truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">Workspace Admin</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/[0.01] border-b border-white/5 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1.5 border border-emerald-500/20 rounded-full">
              <Sparkles size={12} /> Supabase Cloud Connected
            </span>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-white/10 transition-all duration-200"
          >
            <Plus size={16} strokeWidth={2.5} /> Create Lesson
          </button>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 flex gap-8">
          
          {/* DASHBOARD VIEW OR LESSONS VIEW */}
          {(activeView === 'dashboard' || activeView === 'lessons') && (
            <>
              {/* Main Column */}
              <div className="flex-1 flex flex-col gap-8">
                {activeView === 'dashboard' && (
                  <>
                    <div>
                      <h2 className="text-3xl font-bold mb-1 text-white tracking-tight">Overview</h2>
                      <p className="text-zinc-400 text-sm">Welcome back, here is what's happening with your modules today.</p>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><LayoutDashboard size={48} /></div>
                        <p className="text-zinc-400 text-sm font-medium mb-1">Total Lessons</p>
                        <p className="text-3xl font-bold text-white">{isLoading ? '...' : totalLessons}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 group-hover:opacity-20 transition-opacity"><CheckCircle size={48} /></div>
                        <p className="text-zinc-400 text-sm font-medium mb-1">Published</p>
                        <p className="text-3xl font-bold text-emerald-400">{isLoading ? '...' : publishedLessons}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500 group-hover:opacity-20 transition-opacity"><Clock size={48} /></div>
                        <p className="text-zinc-400 text-sm font-medium mb-1">Drafts</p>
                        <p className="text-3xl font-bold text-amber-400">{isLoading ? '...' : draftLessons}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500 group-hover:opacity-20 transition-opacity"><Users size={48} /></div>
                        <p className="text-zinc-400 text-sm font-medium mb-1">Authors</p>
                        <p className="text-3xl font-bold text-indigo-400">{isLoading ? '...' : totalAuthors}</p>
                      </div>
                    </div>
                  </>
                )}

                {activeView === 'lessons' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-1 text-white tracking-tight">All Lessons</h2>
                    <p className="text-zinc-400 text-sm">Manage, search, and edit all lessons in the workspace.</p>
                  </div>
                )}

                {/* Enhanced Dashboard Grid (Lessons Table) */}
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col flex-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                  
                  {/* Table Header Controls */}
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20 relative z-10">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                      {['All', 'Published', 'Draft'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input 
                        type="text" 
                        placeholder="Search lessons..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 placeholder-zinc-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto relative z-10 min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-black/10">
                          <th className="p-5 font-semibold text-zinc-500 text-xs tracking-wide uppercase">Lesson Title</th>
                          <th className="p-5 font-semibold text-zinc-500 text-xs tracking-wide uppercase">Course</th>
                          <th className="p-5 font-semibold text-zinc-500 text-xs tracking-wide uppercase">Author</th>
                          <th className="p-5 font-semibold text-zinc-500 text-xs tracking-wide uppercase">Status</th>
                          <th className="p-5 font-semibold text-zinc-500 text-xs tracking-wide uppercase text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="5" className="p-16 text-center text-zinc-500">
                              <Loader2 className="animate-spin mx-auto text-indigo-500 mb-4" size={32} />
                              <p>Syncing with Supabase...</p>
                            </td>
                          </tr>
                        ) : filteredLessons.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-12 text-center text-zinc-500 font-medium relative">
                              <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-600">
                                  <Search size={24} />
                                </div>
                                <div>
                                  <p className="text-zinc-300 font-semibold mb-1">No lessons found</p>
                                  <p className="text-sm">Try adjusting your filters or search query.</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredLessons.map((lesson, index) => (
                            <tr key={lesson.id} className={`group ${index !== filteredLessons.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors duration-200`}>
                              <td className="p-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <FileText size={16} />
                                  </div>
                                  <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors duration-200">{lesson.title}</span>
                                </div>
                              </td>
                              <td className="p-5 text-sm font-medium text-zinc-400">{lesson.course}</td>
                              <td className="p-5 text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold border border-white/20">
                                  {lesson.draftedBy.charAt(0).toUpperCase()}
                                </div>
                                {lesson.draftedBy}
                              </td>
                              <td className="p-5">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold shadow-sm ${
                                  lesson.status === 'Draft' 
                                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                }`}>
                                  {lesson.status === 'Draft' ? <Clock size={12} strokeWidth={2.5} /> : <CheckCircle size={12} strokeWidth={2.5} />}
                                  {lesson.status}
                                </span>
                              </td>
                              <td className="p-5 text-right flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => openBuilder(lesson.id)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-indigo-500/20 text-zinc-300 hover:text-indigo-300 text-sm font-semibold rounded-lg border border-white/10 hover:border-indigo-500/30 transition-all duration-200"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => confirmDelete(lesson)}
                                  className="p-2 bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg border border-transparent hover:border-red-500/30 transition-all duration-200"
                                  title="Delete Lesson"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column (Activity Feed) - ONLY on Dashboard */}
              {activeView === 'dashboard' && (
                <div className="w-80 flex flex-col gap-6 hidden xl:flex">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex-1 max-h-[800px] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-6 relative z-10">
                      <Activity size={18} className="text-indigo-400" />
                      <h3 className="font-bold text-white tracking-wide">Recent Activity</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 relative z-10 space-y-5 custom-scrollbar">
                      {isLoading ? (
                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-zinc-600" /></div>
                      ) : activities.length === 0 ? (
                        <p className="text-sm text-zinc-500">No recent activity to show.</p>
                      ) : (
                        activities.map((activity, index) => (
                          <div key={activity.id} className="relative pl-6">
                            {/* Timeline line */}
                            {index !== activities.length - 1 && (
                              <div className="absolute left-[11px] top-6 bottom-[-20px] w-px bg-white/10"></div>
                            )}
                            {/* Timeline dot */}
                            <div className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full bg-indigo-500/50 border border-indigo-400"></div>
                            
                            <p className="text-sm text-zinc-300 leading-tight">
                              <span className="font-semibold text-white">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                              {new Date(activity.timestamp).toLocaleString(undefined, {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TEAM MEMBERS VIEW */}
          {activeView === 'team' && (
            <div className="flex-1 flex flex-col gap-8 w-full max-w-5xl">
              <div>
                <h2 className="text-3xl font-bold mb-1 text-white tracking-tight">Team Members</h2>
                <p className="text-zinc-400 text-sm">Manage the developers and authors in your workspace.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col flex-1">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between z-10">
                   <h3 className="text-white font-semibold flex items-center gap-2"><Users size={18} className="text-indigo-400" /> All Registered Users</h3>
                </div>

                <div className="overflow-x-auto relative z-10 p-6 min-h-[300px]">
                  {isLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>
                  ) : teamMembers.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">No users found. Ensure users are registered in Supabase.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamMembers.map(member => (
                        <div key={member.id} className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/[0.05] transition-colors">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-inner shrink-0">
                            {member.name ? member.name.charAt(0).toUpperCase() : member.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-bold">{member.name || 'No Name Provided'}</p>
                            <p className="text-zinc-400 text-sm">@{member.username}</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/10 text-zinc-300 rounded-md border border-white/10">Member</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeView === 'settings' && (
            <div className="flex-1 flex flex-col gap-8 w-full max-w-3xl">
              <div>
                <h2 className="text-3xl font-bold mb-1 text-white tracking-tight">Settings</h2>
                <p className="text-zinc-400 text-sm">Update your workspace and profile preferences.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col flex-1 p-8">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                
                <form onSubmit={handleSaveSettings} className="relative z-10 flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-white mb-2">My Profile</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">Display Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full max-w-md px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder-zinc-600"
                      required
                    />
                    <p className="text-xs text-zinc-500 mt-2">This is the name that will appear on lessons you draft and in the activity feed.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">Username (Read Only)</label>
                    <input 
                      type="text" 
                      value={user.username || ''}
                      disabled
                      className="w-full max-w-md px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-zinc-500 font-medium cursor-not-allowed"
                    />
                  </div>

                  <div className="mt-4 pt-6 border-t border-white/10">
                    <button 
                      type="submit" 
                      disabled={isSavingSettings || profileName === user.name}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSavingSettings ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
        </div>
      </main>

      {/* Glassmorphic Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isCreating && setShowCreateModal(false)}></div>
          
          <div className="bg-[#12121A]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-3xl max-w-md w-full p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => !isCreating && setShowCreateModal(false)}
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
                  disabled={isCreating}
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
                  disabled={isCreating}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  disabled={isCreating}
                  className="py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 rounded-2xl transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCreating ? <Loader2 size={18} className="animate-spin" /> : 'Create Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Glassmorphic Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isDeleting && setShowDeleteModal(false)}></div>
          
          <div className="bg-[#12121A]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-3xl max-w-sm w-full p-8 relative z-10 animate-in zoom-in-95 duration-200 text-center">
            
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto mb-5 shadow-inner">
               <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-bold mb-2 text-white">Delete Lesson?</h3>
            <p className="text-zinc-400 font-medium mb-8 text-sm">
              Are you sure you want to delete <span className="text-white font-semibold">"{lessonToDelete?.title}"</span>? This action cannot be undone.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="py-3 bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteLesson}
                disabled={isDeleting}
                className="py-3 bg-red-500/90 hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Custom Scrollbar Styles for the Activity Feed */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default PLBDashboard;
