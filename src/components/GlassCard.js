import React from 'react';

export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
}
