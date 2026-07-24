import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, CheckCircle, XCircle } from 'lucide-react';
import VisualBlockRenderer from './VisualBlockRenderer';

const INTERACTIVE_TYPES = [
  'Chart Quiz',
  'MCQ',
  'Fill in the Blank',
  'Match Pairs', 
  'Arrange', 
  'Drag & Drop', 
  'Hotspot'
];

const LessonPlayerPreview = ({ pages = [], initialPageIndex = 0, version, previewDevice, progressValues = {}, onClose }) => {
  const [currentIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [interactionState, setInteractionState] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const containerRef = useRef(null);

  const currentPage = pages[currentIndex] || {};
  const blocks = (currentPage.blocks || []).filter(b => !['Continue Button', 'Back Button', 'Skip Button', 'Next Lesson Button', 'Back to Courses Button'].includes(b.type));

  if (pages.length === 0) return null;

  // Reset state when page changes
  useEffect(() => {
    setInteractionState({});
    setIsChecking(false);
    
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentIndex]);

  // Determine if the current page has an interactive block
  const interactiveBlock = blocks.find(b => INTERACTIVE_TYPES.includes(b.type));
  
  // Determine if the user has made a selection (very basic check for Chart Quiz for now)
  // We can expand this to check other interactive block states
  const hasSelection = interactiveBlock 
    ? (interactionState.chartQuizSelectedKey !== undefined || 
       Object.values(interactionState).some(state => state && typeof state === 'object' && Object.keys(state).length > 0))
    : true; // If no interactive block, always allow continue

  const handleActionClick = () => {
    if (!interactiveBlock) {
      // Just a static page, move to next
      advancePage();
    } else {
      if (!isChecking) {
        // Evaluate the answer
        setIsChecking(true);
      } else {
        // Already checked, move to next
        advancePage();
      }
    }
  };

  const advancePage = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Compute if the checked answer is correct (for Chart Quiz specifically, or fallback to default correct)
  // To make this fully robust, we'd need interactionState to store a standard `isCorrect` flag.
  let isAnswerCorrect = true;
  if (isChecking && interactiveBlock) {
    if (interactiveBlock.type === 'Chart Quiz') {
      const data = interactiveBlock[version] || {};
      const correctOptKey = data.quiz_correct_option || 'A';
      isAnswerCorrect = interactionState.chartQuizSelectedKey === correctOptKey;
    }
  }

  if (isCompleted) {
    return (
      <div className={`mx-auto flex flex-col h-full bg-white shadow-sm sm:shadow-none transition-all duration-300 ${previewDevice === 'mobile' ? 'w-full max-w-[375px]' : 'w-full max-w-[600px]'}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
          <div className="w-32 h-32 mb-6">
             <img src="/piggypath_admin/assets/mascots/Happy.png?v=clean4" alt="Happy Mascot" className="w-full h-full object-contain animate-mascot-bounce" />
          </div>
          <h2 className="text-3xl font-black text-[#18181B] mb-4">Lesson Complete!</h2>
          <p className="text-gray-500 font-bold mb-8">You've successfully finished this lesson.</p>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#00E599] text-[#18181B] border-[3px] border-[#18181B] shadow-[4px_4px_0_#18181B] rounded-2xl font-black text-xl hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] active:scale-95 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = pages.length > 0 ? ((currentIndex) / pages.length) * 100 : 0;

  return (
    <div className={`mx-auto flex flex-col h-[100dvh] overflow-hidden bg-white shadow-sm sm:shadow-none transition-all duration-300 ${previewDevice === 'mobile' ? 'w-full max-w-[375px]' : 'w-full max-w-[600px]'}`}>
      
      {/* Top Header */}
      <div className="w-full px-4 py-4 flex items-center gap-4 bg-white z-20 shrink-0">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
          <X size={24} className="text-gray-400" />
        </button>
        
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden border-[2px] border-gray-300">
          <div 
            className="h-full bg-[#00E599] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div className="flex items-center gap-1 text-[#FF4B4B] font-black">
          <Heart size={24} fill="currentColor" />
          <span>5</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-32"
      >
        <div className="flex flex-col w-full animate-in slide-in-from-right-8 duration-300">
          {blocks.map((block) => (
            <div key={`${block.id}-${version}`} className="w-full relative z-0">
              <VisualBlockRenderer 
                block={block} 
                version={version} 
                isPreviewMode={true} 
                progressValue={progressValues[block.id]}
                externalInteractionState={interactionState}
                setExternalInteractionState={setInteractionState}
                isChecking={isChecking}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full bg-white border-t-[2px] border-gray-100 p-4 shrink-0 relative z-30">
        
        {/* Feedback Banner Overlay */}
        {isChecking && interactiveBlock && (
          <div className={`absolute bottom-full left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-300 border-t-[3px] border-[#18181B] ${isAnswerCorrect ? 'bg-[#00E599]' : 'bg-[#FF6B6B]'}`}>
             <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center border-[2px] border-[#18181B]`}>
                   {isAnswerCorrect ? <CheckCircle size={24} className="text-[#00E599]" /> : <XCircle size={24} className="text-[#FF6B6B]" />}
                </div>
                <h3 className={`font-black text-xl ${isAnswerCorrect ? 'text-[#18181B]' : 'text-white'}`}>
                  {isAnswerCorrect ? 'Excellent!' : 'Not quite right.'}
                </h3>
             </div>
          </div>
        )}

        <button 
          onClick={handleActionClick}
          disabled={!hasSelection}
          className={`w-full py-4 rounded-2xl font-black text-xl transition-all border-[3px] 
            ${!hasSelection 
              ? 'bg-gray-200 text-gray-400 border-transparent cursor-not-allowed' 
              : isChecking
                ? isAnswerCorrect 
                  ? 'bg-[#00E599] text-[#18181B] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] active:scale-95'
                  : 'bg-[#FF6B6B] text-white border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] active:scale-95'
                : 'bg-[#00E599] text-[#18181B] border-[#18181B] shadow-[4px_4px_0_#18181B] hover:-translate-y-1 hover:shadow-[6px_6px_0_#18181B] active:scale-95'
            }`}
        >
          {!interactiveBlock ? 'Continue' : isChecking ? 'Continue' : 'Check'}
        </button>
      </div>

    </div>
  );
};

export default LessonPlayerPreview;
