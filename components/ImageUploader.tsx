import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  onImageSelect: (base64: string | null) => void;
  selectedImage: string | null;
  helpText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  onImageSelect,
  selectedImage,
  helpText = "PNG, JPG up to 10MB"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div
        className={`relative w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out flex flex-col items-center justify-center overflow-hidden cursor-pointer group
          ${dragActive ? 'border-brand-500 bg-brand-900/20' : 'border-slate-600 bg-slate-800/50 hover:border-slate-400 hover:bg-slate-800'}
          ${selectedImage ? 'border-brand-500 border-solid' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {selectedImage ? (
          <>
            <img
              src={selectedImage}
              alt="Upload Preview"
              className="w-full h-full object-contain z-10 p-2"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 text-white font-medium">
              Click to Change
            </div>
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 z-30 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110"
              title="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto text-slate-400 mb-3 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-300 font-medium">Click to upload or drag and drop</p>
            <p className="text-slate-500 text-sm mt-1">{helpText}</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};