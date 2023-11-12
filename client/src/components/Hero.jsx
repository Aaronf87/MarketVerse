import hero from "/src/assets/hero1.png";

export default function Hero() {
  const style = {
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "50vh",
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
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to <br className="xl:hidden" />
              <h1> MarketVerse </h1>
              <hr style={hr} />
              <strong className="font-extrabold text-red-700 sm:block">
                Buy and Sell your way.
              </strong>
            </h1>

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
