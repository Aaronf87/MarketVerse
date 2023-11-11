export default function CategoryList({ categoryData }) {
  return (
    <div className="card-wrapper ">

      {categoryData.map((category) => (
        <dt key={category._id} className="card text-3xl p-3 ">
          {category.name}
        </dt>
      ))}
    </div>
  );
}
