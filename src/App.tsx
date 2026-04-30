import CreateRecipeForm from "./components/CreateRecipeForm.tsx";

export default function App() {
  return (
      <>
          <div>
              <h1>Recipe Book</h1>
          </div>
          <div>
              <h2>Add your recipe below</h2>
          </div>
          <div>
              <CreateRecipeForm/>
          </div>
      </>
  );
}
