import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-dark-3 rounded-xl overflow-hidden skeleton">
      <div className="aspect-video skeleton mb-4" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton" />
        <div className="h-6 skeleton w-2/3" />
        <div className="h-4 skeleton w-1/2" />
        <div className="pt-2 flex gap-2 justify-between">
          <div className="h-4 skeleton flex-1" />
          <div className="h-8 skeleton w-20" />
        </div>
      </div>
    </div>
  );
};
