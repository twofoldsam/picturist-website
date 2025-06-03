import React from "react";

interface SuggestionSection {
  title: string;
  content: string;
}

interface PicturistSuggestionCardProps {
  sections: SuggestionSection[];
  onClose?: () => void;
  className?: string;
}

export const PicturistSuggestionCard: React.FC<PicturistSuggestionCardProps> = ({
  sections,
  onClose,
  className = "",
}) => {
  return (
    <div className={`max-w-[288px] bg-white rounded-xl border border-[#F7F6F4] shadow-md text-xs ${className}`}>
      {/* Card Header */}
      <div className="p-[6px_8px] bg-[#F7F6F4] border-b border-[#F7F6F4] rounded-t-xl">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#1E4A52] flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-3 h-3 text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-medium text-[#292D31]">Picturist</div>
            <div className="text-[10px] text-[#6B7280]">Suggestion overview</div>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-2 flex flex-col gap-2">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <h5 className="text-[10px] font-semibold uppercase text-[#6B7280] m-0">
              {section.title}
            </h5>
            <p className="text-xs leading-[1.4] text-[#292D31] m-0">
              {section.content}
            </p>
          </div>
        ))}
      </div>
      
      {/* Card Footer */}
      <div className="p-[6px_8px] bg-[#F7F6F4] border-t border-[#F7F6F4] rounded-b-xl flex justify-end">
        <button 
          onClick={onClose}
          className="py-0.5 px-2 bg-[#1E4A52] text-white border-none rounded hover:bg-[#154145] transition-colors text-[10px] cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};