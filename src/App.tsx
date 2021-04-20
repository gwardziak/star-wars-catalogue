import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { ScrollState } from "react-scrollbars-custom/dist/types/types";
import "./assets/main.css";
import { Character } from "./components/Character";
import { SearchBar } from "./components/SearchBar";
import { useRootStore } from "./stores/RootStore";

const App = observer(() => {
  const rootStore = useRootStore();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    rootStore.peopleStore.fetchAll();
  }, [rootStore]);

  return (
    <Scrollbar
      onUpdate={async (scrollValues: ScrollState) => {
        if (
          scrollValues.scrollTop + scrollValues.clientHeight >=
            scrollValues.scrollHeight &&
          !isFetching &&
          rootStore.peopleStore.peopleInfo.hasMore &&
          rootStore.peopleStore.filter === "" &&
          scrollValues.scrollTop !== 0
        ) {
          console.log("Fetching");
          setIsFetching(true);
          await rootStore.peopleStore.fetchPeople();
          setIsFetching(false);
          console.log("Done fetching");
        }
      }}
    >
      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl leading-10 font-medium text-black">
            Star Wars Characters Catalogue
          </h2>
        </header>
        <SearchBar />

        <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mb-4">
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
      </section>
    </Scrollbar>
  );
});

export default App;
