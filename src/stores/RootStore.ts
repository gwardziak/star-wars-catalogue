import React from "react";
import { StoreContext } from "..";
import { PeopleStore } from "./PeopleStore";

export class RootStore {
  public readonly peopleStore: PeopleStore;

  constructor() {
    this.peopleStore = new PeopleStore(this);
  }
}

export const useRootStore = () => React.useContext(StoreContext);
