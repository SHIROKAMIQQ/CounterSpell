import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <nav className="navbar sticky-top z-2 bg-dark-subtle container-fluid justify-content-center px-4 py-3">
      <header className="me-auto">
        <img src={logo} width={298} height={55} />
      </header>
      <div className="text-end">
        <button type="button" className="btn btn-outline-light me-2">
          Login
        </button>
        <button type="button" className="btn btn-outline-light me-2">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
