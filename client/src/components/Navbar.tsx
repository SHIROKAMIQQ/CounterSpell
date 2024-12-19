import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <nav className="navbar sticky-top bg-dark-subtle container-fluid justify-content-center">
      <header className="d-flex justify-content-center py-2">
        <img src={logo} width={340} height={63} />
      </header>
    </nav>
  );
};

export default Navbar;
