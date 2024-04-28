import Tabs from "./Tabs";
import "@fontsource-variable/onest";
import "@fontsource-variable/fira-code";
import Drop from "./Drop";
import Input from "./Input";
import useMethod from "../hooks/useMethod";
import Style from "../modules/App.module.css";

const App = () => {
  const method = useMethod(({ method }) => method);

  return (
    <>
      <header className={Style.header}>
        <h1 id={Style.title}>BLUEPRINT</h1>
        <h2 id={Style.subtitle}>Your trusty DDBB model generator!</h2>
      </header>
      <Tabs />
      {method === "file" ? <Drop /> : <Input />}
    </>
  );
};
export default App;
