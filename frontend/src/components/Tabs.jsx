import { methods } from "../helpers/contants";
import Tab from "./Tab";
import Style from "../modules/Tabs.module.css";
const Tabs = () => {
  const list = Object.values(methods);
  return (
    <ul className={Style.list}>
      {list.map((method, index) => (
        <Tab key={index} name={method} value={index} />
      ))}
    </ul>
  );
};
export default Tabs;
