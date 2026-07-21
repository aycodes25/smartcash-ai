import React, { useState } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { useStatement } from '../../context/StatementContext';
import { Upload, FileSpreadsheet, AlertCircle, ArrowRight } from 'lucide-react';

export const FileUploader: React.FC = () => {
  const { uploadFile, progress } = useUpload();
  const { isLoading, error } = useStatement();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleFileDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-900'
        }`}
      >
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shadow-inner">
            <Upload className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Drop your bank statement here
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Supports <span className="text-indigo-400 font-medium">.XLSX</span>,{' '}
              <span className="text-indigo-400 font-medium">.XLS</span>, and{' '}
              <span className="text-indigo-400 font-medium">.CSV</span> files (Max 20MB)
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition cursor-pointer">
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            Browse File
          </label>
        </div>
      </div>

      {/* Selected File Details & Upload Button */}
      {selectedFile && (
        <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileSpreadsheet className="w-8 h-8 text-indigo-400 shrink-0" />
            <div className="truncate">
              <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={handleUploadSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Statement...
              </>
            ) : (
              <>
                Analyze Statement
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {isLoading && progress > 0 && (
        <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
