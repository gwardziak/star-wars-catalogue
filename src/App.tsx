import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import "./assets/main.css";
import { Character } from "./components/Character";
import { SearchBar } from "./components/SearchBar";
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
      <SearchBar />
      <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        {rootStore.peopleStore.filter !== ""
          ? rootStore.peopleStore.filterByName.map((person) => (
              <Character
                name={person.name}
                birthYear={person.birth_year}
                gender={person.gender}
                films={person.films}
                height={person.height}
              />
            ))
          : rootStore.peopleStore.peopleInfo.people.map((person) => (
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
          Show more
        </button>
      ) : null}
    </section>
  );
});

export default App;

// {rootStore.peopleStore.peopleInfo.people.map((person) => (
//   <Character
//     name={person.name}
//     birthYear={person.birth_year}
//     gender={person.gender}
//     films={person.films}
//     height={person.height}
//   />
// ))}
