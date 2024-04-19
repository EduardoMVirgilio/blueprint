import Tabs from "./Tabs";
import "@fontsource-variable/onest";
import "@fontsource-variable/fira-code";
import Drop from "./Drop";
import Input from "./Input";
import useMethod from "../hooks/useMethod";

const App = () => {
  const method = useMethod(({method}) => method)
    

  return (
    <>
      <h1>Blueprint bebé</h1>
      <Tabs />
      {method === "file"? <Drop />: <Input /> }
    </>
  );
};
export default App;
