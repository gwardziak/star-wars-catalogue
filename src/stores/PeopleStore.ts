import { action, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

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
  @observable public readonly peopleInfo: {
    people: Person[];
    hasMore: null | string;
  } = observable.object({
    people: [],
    hasMore: null,
  });

  constructor(private readonly rootStore: RootStore) {}

  private resolveFilmTitle(link: string): string {
    const titles = this.rootStore.filmStore.filmTitles;
    const splits: string[] = link.split("/");
    const episodeNb = parseInt(splits[5]);

    return titles[episodeNb];
  }

  @action async fetchPeople(): Promise<void> {
    try {
      const query = await fetch("https://swapi.dev/api/people/?take=10&page=1");

      if (query.ok) {
        const res = await query.json();
        return runInAction(() => {
          for (let film of res.films) {
            film = this.resolveFilmTitle(film);
          }

          this.peopleInfo.people = res;
        });
      } else {
        const res = await query.json();
        throw new Error(`Error ${query.status} ${res.detail}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
