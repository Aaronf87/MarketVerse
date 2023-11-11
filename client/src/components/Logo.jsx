import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" style={{ maxWidth: '280px', minHeight: 'auto' }}/>
    </div>
  );
};

export default Logo;
