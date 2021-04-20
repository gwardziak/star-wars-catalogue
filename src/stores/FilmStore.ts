import { action, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  chatacters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
};

export class FilmStore {
  @observable filmTitles: string[] = observable.array([]);

  constructor(private readonly rootStore: RootStore) {}

  @action async fetchFilmTitles(): Promise<void> {
    try {
      const query = await fetch("https://swapi.dev/api/films/");

      if (query.ok) {
        const res = await query.json();
        return runInAction(() => {
          for (const film of res.results) {
            this.filmTitles.push(film.title);
          }
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
