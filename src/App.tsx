import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "./assets/main.css";
import { Character } from "./components/Character";
import { useRootStore } from "./stores/RootStore";

const App = observer(() => {
  const rootStore = useRootStore();

  useEffect(() => {
    rootStore.peopleStore.fetchAll();
  }, [rootStore]);

  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 ">
      <header className="flex items-center justify-between ">
        <h2 className="text-3xl leading-10 font-medium text-black">
          Star Wars Characters Catalogue
        </h2>
      </header>
      <form className="relative">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text"
          aria-label="Filter characters"
          placeholder="Filter characters"
        />
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        {rootStore.peopleStore.peopleInfo.people.map((person) => (
          <Character
            name={person.name}
            birthYear={person.birth_year}
            gender={person.gender}
            films={person.films}
            height={person.height}
          />
        ))}
      </ul>
      {rootStore.peopleStore.peopleInfo.hasMore ? (
        <button
          onClick={() => {
            rootStore.peopleStore.fetchPeople();
          }}
        >
          add more
        </button>
      ) : null}
    </section>
  );
});

export default App;
