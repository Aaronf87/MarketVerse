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
      <CategoryList categoryData={categoryData} />
    </>
  );
}
