import hero from "../assets/shop.png";
const Hero = () => {

  return (
    <div className='hero-container-style'>
      <img src={hero} alt="Hero Image" className='hero-image-style' />
      <div className='hero-text-style'>
        <h1 className="heading-style">MarketVerse</h1>
        <hr className="hr"></hr>
        <p className="paragraph-style">Your Online Store where <br></br>
        You buy and sell your way
        </p>
      </div>
    </div>
  );
};

export default Hero;