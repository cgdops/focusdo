import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FocusDo
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
