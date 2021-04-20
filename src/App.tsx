import { useRootStore } from "./stores/RootStore";

const App = () => {
  const rootStore = useRootStore();

  console.log(rootStore.peopleStore.fetchPeople());
  return <p>Hello world</p>;
};

export default App;
