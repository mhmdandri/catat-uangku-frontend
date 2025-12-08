import React from "react";

const SectionDivider: React.FC = () => (
  <div className="my-6 flex items-center gap-4">
    <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
    <span className="text-sm text-gray-500 dark:text-zinc-400">atau</span>
    <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
  </div>
);

export default SectionDivider;
