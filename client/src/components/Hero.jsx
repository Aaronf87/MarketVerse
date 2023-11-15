import hero from "../assets/shop.png";
const Hero = () => {
  const heroContainerStyle = {
    position: 'relative',
    textAlign: 'left', // Adjust as needed
    color: '#fff', // Text color
  };

  const heroImageStyle = {
    width: '100%', // Adjust as needed
    height: '500px',
    display: 'block',
  };

  const heroTextStyle = {
    position: 'absolute',
    top: '50%',
    right: '10%', // Adjust as needed
    transform: 'translate(0%, -50%)',
  };

  const headingStyle = {
    fontSize: '6em', // Adjust as needed
    margin: 0,
  };

  const paragraphStyle = {
    fontSize: '1.5em', // Adjust as needed
    margin: '10px 0 0',
    textAlign: 'center',
  };

  const hr = {
    width: "100%",
    height: "5px",
    margin: "auto",
  };

  return (
    <div style={heroContainerStyle}>
      <img src={hero} alt="Hero Image" style={heroImageStyle} />
      <div style={heroTextStyle}>
        <h1 style={headingStyle}>MarketVerse</h1>
        <hr style={hr}></hr>
        <p style={paragraphStyle}>Your Online Store where <br></br>
        You buy and sell your way
        </p>
      </div>
    </div>
  );
};

export default Hero;