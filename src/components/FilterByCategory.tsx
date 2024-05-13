import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export const FilterByCategory = () => {
  const { budgetDispatch } = useBudget();
  return (
    <div className="bg-white shadow-md rounded-md p-10 mb-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded-md"
            onChange={(e) =>
              budgetDispatch({
                type: "add-filter-category-action",
                payload: { category: e.target.value },
              })
            }
          >
            <option value="">-- Todas las categorias --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
