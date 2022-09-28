import { useState, createContext, useContext } from "react";

const UserContext = createContext();

function ComponentA() {
  const [user, setUser] = useState("Jane Doe");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}! from parent Component`}</h1>
      <ComponentB />
    </UserContext.Provider>
  );
}

function ComponentB() {
  return (
    <>
      <h1>Component 2</h1>
      <ComponentC />
    </>
  );
}

function ComponentC() {
  return (
    <>
      <h1>Component 3</h1>
      <ComponentD />
    </>
  );
}

function ComponentD() {
  return (
    <>
      <h1>Component 4</h1>
      <ComponentE />
    </>
  );
}

function ComponentE() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} from component E!`}</h2>
    </>
  );
}

function App (){
  return <ComponentA></ComponentA>
}

export default App
