import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-2 mb-3 container">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          <Link
            to="/reduce"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            useReducer
          </Link>
          <Link
            to="/redux"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Redux
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
