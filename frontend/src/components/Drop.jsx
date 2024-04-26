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
  const sleep = function(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

  const analize = async (data) => {
    if (data.file[0].type !== "application/json")  {
      return setError("file", { type: "custom", message: "This is not a json file!" })}
    await sleep(10000);
    console.log(data)
  }
  return (
    <form className={Style.form} onSubmit={handleSubmit(analize)}>
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
      {errors && errors.file && <output className={Style.error}>{errors.file.message}</output>}
      <button className={Style.button}>{isSubmitting? "Analizing..." : "Solution in progress"}</button>
    </form>
  );
};
export default Drop;
