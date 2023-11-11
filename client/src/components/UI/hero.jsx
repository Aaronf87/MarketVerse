import hero from "/src/assets/hero1.png";

export default function Hero() {
  const style = {
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "50vh",
  };

  return (
    <>
      <section className="bg-gray-50 " style={style}>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to MarketVerse. <br className="xl:hidden" />
              <strong className="font-extrabold text-red-700 sm:block">
                Buy and Sell your way.
              </strong>
            </h1>

            {/* <p className="mt-4 sm:text-xl/relaxed">
       insert slogan here
      </p> */}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
