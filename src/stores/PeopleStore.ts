import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "./RootStore";

export type PersonApiResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Person[];
};

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
  created: string;
  edited: string;
};

export class PeopleStore {
  @observable readonly peopleInfo: {
    people: Person[];
    hasMore: null | string;
  } = observable.object({
    people: [],
    hasMore: "https://swapi.dev/api/people/?take=10&page=11",
  });

  @observable filter: string = "";

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  private resolveFilmTitle(link: string): string {
    const titles = this.rootStore.filmStore.filmTitles;
    const splits: string[] = link.split("/");
    const episodeNb = parseInt(splits[5]);

    return titles[episodeNb - 1];
  }

  @computed get filterByName() {
    const filterResult = this.peopleInfo.people.filter((person) =>
      person.name.toLowerCase().includes(this.filter.toLowerCase())
    );

    filterResult.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return filterResult;
  }

  @action setFilter(input: string): void {
    this.filter = input;
  }

  @action async fetchPeople(): Promise<void> {
    const url = this.peopleInfo.hasMore;

    if (!url) {
      return;
    }

    try {
      const query = await fetch(url);

      if (query.ok) {
        const response: PersonApiResponse = await query.json();
        return runInAction(() => {
          for (const person of response.results) {
            const resolvedFilms = [];
            for (let film of person.films) {
              resolvedFilms.push(this.resolveFilmTitle(film));
            }

            person.films = resolvedFilms;
          }

          this.peopleInfo.hasMore = response.next;
          this.peopleInfo.people.push(...response.results);
        });
      } else {
        const response = await query.json();

        throw new Error(`Error ${query.status} ${response.detail}`);
      }
    } catch (error) {
      throw error;
    }
  }

  @action async fetchAll(): Promise<void> {
    await this.rootStore.filmStore.fetchFilmTitles();
    await this.fetchPeople();
  }
}
