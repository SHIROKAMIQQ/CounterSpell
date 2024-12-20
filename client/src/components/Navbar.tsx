import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <nav className="navbar sticky-top z-2 bg-dark-subtle d-flex justify-content-start px-4 py-3">
      <a href="#" className="me-2">
        <img src={logo} width={298} height={55} />
      </a>
      <ul className="nav me-auto fs-5 col-auto">
        <li>
          <a href="#" className="nav-link text-secondary px-2">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white px-2">
            Docs
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white px-2">
            Pricing
          </a>
        </li>
      </ul>
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
