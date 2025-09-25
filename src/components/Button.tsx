export const Button = ({ children, className = "" }) => {
  return (
    <button className={`px-6 py-3 text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ${className}`}>
      {children}
    </button>
  );
};