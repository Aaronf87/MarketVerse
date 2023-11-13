import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

export default function CategoryMenu({ category, setCategory }) {
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  const categoryData = data?.getCategories || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <dt
      className="category p-2"
      onClick={() => setCategory(null)}>
        All
      </dt>
      {categoryData.map((category) => (
        <dt
          key={category._id}
          id={category._id}
          className="category p-2"
          onClick={(e) => setCategory(e.target.id)}
        >
          {category.name}
        </dt>
      ))}
    </>
  );
}
