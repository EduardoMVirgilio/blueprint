import { LucideFile } from "lucide-react";
import { methods } from "../helpers/constants";
import useMethod from "../hooks/useMethod";
import Style from "../modules/Tab.module.css";
import { LucideCode } from "lucide-react";

const Tab = ({ value }) => {
  const change = useMethod(({ change }) => change);
  const method = useMethod(({ method }) => method);
  const active = method == methods[value];
  return (
    <li
      onClick={() => change(value)}
      className={`${Style["tab"]} ${active ? Style["active"] : ""}`}
    >
      {value == 0 && <LucideFile />}
      {value == 1 && <LucideCode />}
    </li>
  );
};
export default Tab;
