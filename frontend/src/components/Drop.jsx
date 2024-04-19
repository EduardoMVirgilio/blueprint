import { LucideFile } from "lucide-react";
import { LucideFileUp } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Style from "../modules/Drop.module.css";

const Drop = () => {
  const [active, setActive] = useState(false);
  const state = useForm();
  const { register, formState, reset, handleSubmit, setError, setValue } =
    state;
  const { errors, isSubmitting } = formState;
  const dragging = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { type } = e;
    let state = type === "dragleave" ? false : true;
    setActive(state);
  };
  const dropping = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    setValue("file", e.dataTransfer.files[0]);
    console.log(e.dataTransfer.files[0]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="file"
        onDragEnter={dragging}
        onDragLeave={dragging}
        onDragOver={dragging}
        onDrop={dropping}
        className={`${Style.drop} ${active ? Style.active : ""}`}
      >
        {active && <LucideFileUp className={Style.icon} />}
        {!active && <LucideFile className={Style.icon} />}
        <input type="file" id="file" {...register("file")} />
      </label>
    </form>
  );
};
export default Drop;
