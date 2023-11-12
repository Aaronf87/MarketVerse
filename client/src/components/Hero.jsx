import hero from "/src/assets/cart2.png";

export default function Hero() {
  const style = {
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    color: "gray-50",
  };
  const hr = {
    width: "50%",
    height: "3px",
    margin: "auto",
  };

  return (
    <>
      <section className="bg-gray-50 " style={style}>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="font-extrabold text-3xl sm:block">
              Welcome to <br className="xl:hidden" />
              <h1> MarketVerse </h1>
              <hr style={hr} />
              Buy and Sell your way
            </div>

            {/* <p className="mt-4 sm:text-xl/relaxed">
       insert slogan here
      </p> */}

            <div className="mt-8 flex flex-wrap justify-center gap-4"></div>
          </div>
        </div>
      </section>
    </>
  );
}
