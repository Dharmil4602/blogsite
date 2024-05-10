import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };
  return (
    <nav className="bg-black p-4 flex justify-between items-center fixed w-full">
      {token ? (
        <>
          <div className="text-white font-bold text-xl">
            <Link to="/dashboard">Blog Dashboard</Link>
          </div>

          <div className="space-x-4">
            <Link to="/dashboard" className="text-white">
              Dashboard
            </Link>
            <Link
              to="/add-blog"
              className="text-white border-b-2 border-white hover:border-opacity-0"
            >
              Add Blog
            </Link>
            <button
              className="text-white border-b-2 border-white hover:border-opacity-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-white font-bold text-xl">
            <Link to="/">BlogSite</Link>
          </div>
          <div className="space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link
              to="/signup"
              className="text-white border-b-2 border-white hover:border-opacity-0"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-white border-b-2 border-white hover:border-opacity-0"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
