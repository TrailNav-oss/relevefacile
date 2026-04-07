"use client";

import { useCallback, useState } from "react";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  loading?: boolean;
}

export function UploadZone({ onFileSelected, loading }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        setFileName(file.name);
        onFileSelected(file);
      }
    },
    [onFileSelected],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        onFileSelected(file);
      }
    },
    [onFileSelected],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
        dragOver ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400"
      } ${loading ? "opacity-60 pointer-events-none" : ""}`}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={loading}
      />

      {loading ? (
        <div>
          <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-600 font-medium">Analyse en cours...</p>
          <p className="text-sm text-gray-400 mt-1">{fileName}</p>
        </div>
      ) : fileName ? (
        <div>
          <p className="text-gray-600 font-medium">{fileName}</p>
          <p className="text-sm text-gray-400 mt-1">Cliquez ou deposez un autre fichier pour remplacer</p>
        </div>
      ) : (
        <div>
          <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600 font-medium">Glissez-deposez votre releve PDF ici</p>
          <p className="text-sm text-gray-400 mt-1">ou cliquez pour parcourir</p>
        </div>
      )}
    </div>
  );
}
