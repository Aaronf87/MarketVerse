import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

import CategoryList from "./UI/CategoryList";

export default function CategoryMenu() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  const categoryData = data?.getCategories || [];

  if (loading) {
    return <div>Loading...</div>;
  }

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

      <CategoryList categoryData={categoryData} />
    </>
  );
}
