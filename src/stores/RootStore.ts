import React from "react";
import { StoreContext } from "..";
import { FilmStore } from "./FilmStore";
import { PeopleStore } from "./PeopleStore";

export class RootStore {
  public readonly filmStore: FilmStore;
  public readonly peopleStore: PeopleStore;

  constructor() {
    this.filmStore = new FilmStore(this);
    this.peopleStore = new PeopleStore(this);
  }
}

export const useRootStore = () => React.useContext(StoreContext);
