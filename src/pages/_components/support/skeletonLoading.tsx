export const SkeletonConversationLoading: React.FC = () => {
  return (
    <div className="animate-pulse flex p-4">
      {/* Skeleton loading layout */}
      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-500 mr-4"></div>
      <div className="flex-1">
        <div className="font-semibold bg-gray-300 dark:bg-gray-500 h-5 w-20 mb-2"></div>
        <div className="text-sm text-gray-600 bg-gray-300 dark:bg-gray-500 h-4 w-32"></div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-gray-600 bg-gray-300 dark:bg-gray-500 h-4 w-20"></div>
        <div className="bg-gray-300 dark:bg-gray-500 text-white text-xs rounded-full px-2 py-1 mt-1 h-5 w-5"></div>
      </div>
    </div>
  );
};

export const SkeletonMessageLoading: React.FC = () => {
  return (
    <div className="animate-pulse mb-4">
      <div className="flex mb-4">
        <div className="flex mb-1">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-500 mr-2"></div>
        </div>
        <div className="p-3 rounded-lg bg-gray-300 dark:bg-gray-500 text-white self-start">
          <div className="h-8 w-64"></div>
          <div className="text-white text-opacity-75 w-full text-xs"></div>
        </div>
      </div>
      <div className="flex mb-4 justify-end">
        <div className="p-3 rounded-lg bg-gray-300 dark:bg-gray-500 text-white self-start">
          <div className="h-8 w-64"></div>
          <div className="text-white text-opacity-75 w-full text-xs"></div>
        </div>
      </div>
    </div>
  );
};
