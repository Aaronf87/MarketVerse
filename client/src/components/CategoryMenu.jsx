import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

export default function CategoryMenu() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  const categoryData = data?.getCategories || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {categoryData.map((category) => (
        <dt key={category._id} className="category p-2">
          {category.name}
        </dt>
      ))}
    </>
  );
}
