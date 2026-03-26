'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function FileUpload({ value, onChange, accept = 'image/*', label = 'Fichier' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      onChange(url);
    } catch {
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const fullUrl = value && !value.startsWith('http') ? `${API}${value}` : value;

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <div className="flex items-center gap-4">
        {value && (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-card-border shrink-0">
            {accept.includes('image') ? (
              <img src={fullUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card text-xs text-muted">
                Fichier
              </div>
            )}
            <button
              onClick={() => onChange('')}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <X size={12} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 rounded-xl border border-card-border text-sm font-medium hover:bg-card transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Upload...' : 'Choisir'}
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
      </div>
    </div>
  );
}
