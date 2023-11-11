export default function CatagoryAll() {

    return (
        <>
    <div className=" p-10">
            <a className="card" href="">
              <div>
                <div>
                  <dt className="text-3xl p-3">All Categories</dt>
                  <img
                    className="rounded"
                    src={`https://source.unsplash.com/random/384x512?sig=${Math.random()}
                    `}
                    alt="hero image"
                  />
                </div>
              </div>
            </a>
          </div>
        </>
        );
    }
    