import React from 'react';
import { HistoryItem } from '../types';

interface HistoryGalleryProps {
    history: HistoryItem[];
    onDelete: (id: string) => void;
    onSelect: (item: HistoryItem) => void;
}

export const HistoryGallery: React.FC<HistoryGalleryProps> = ({ history, onDelete, onSelect }) => {
    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-10">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">No history yet</p>
                <p className="text-sm">Generated images will appear here.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {history.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg group relative">
                    <div className="aspect-[3/4] relative overflow-hidden cursor-pointer" onClick={() => onSelect(item)}>
                        <img
                            src={item.imageUrl}
                            alt={item.prompt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                            <a
                                href={item.imageUrl}
                                download={`portrait-genius-${item.timestamp}.png`}
                                className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
                                title="Download"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item.id);
                                }}
                                className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                                title="Delete"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.mode === 'portrait' ? 'bg-brand-900/50 text-brand-300 border border-brand-700/50' : 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                                }`}>
                                {item.mode}
                            </span>
                            <span className="text-xs text-slate-500">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 line-clamp-2 mb-3" title={item.prompt}>
                            {item.prompt}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
