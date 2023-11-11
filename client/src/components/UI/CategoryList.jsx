export default function CategoryList({ categoryData }) {
  return (
    <>
      {categoryData.map((category) => (
        <div key={category._id} className=" p-10 card">
          <dt className="text-3xl p-3">{category.name}</dt>
        </div>
      ))}
    </>
  );
}
