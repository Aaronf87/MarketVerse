
       const product = [
            {
              name: "name",
              category: "category",
              image: `image`,
            },
            // More products...
          ];
          
          export default function Card () {
            return (
              <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    product
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                     placeholder text
        
                    </p>
                  </div>
                  <ul
                    role="list"
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
                  >
                    {product.map((product) => (
                      <li key={product.name}>
                        <div className="flex items-center gap-x-6">
                          <img
                            className="h-25 w-25 rounded-full"
                            src={product.image}
                            alt="photo of product"
                          />
                          <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm font-semibold leading-6 text-indigo-600">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

    );
}
