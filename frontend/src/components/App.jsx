import Tabs from "./Tabs";
import "@fontsource-variable/onest";
import "@fontsource-variable/fira-code";
import Drop from "./Drop";
import Input from "./Input";
import useMethod from "../hooks/useMethod";
import "../index.css";

const App = () => {
  const method = useMethod(({method}) => method)
    

  return (
    <>
      <h1>Blueprint</h1>
      <h2>Your trusty DDBB model generator!</h2>
      <Tabs />
      {method === "file"? <Drop />: <Input /> }
    </>
  );
};
export default App;

