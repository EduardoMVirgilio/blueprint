import { useForm } from "react-hook-form";
import Style from "../modules/Input.module.css";

const Input = () => {
    const state = useForm();
    const { register, formState, reset, handleSubmit, setError, setValue } =
        state;
    const { errors, isSubmitting } = formState;
    const sleep = function (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const analize = async (data) => {
        await sleep(10000);
        console.log(data);
    };
    return (
        <form className={Style.form} onSubmit={handleSubmit(analize)}>
            <textarea className={Style.input} {...register("json")}></textarea>
            <button className={Style.button}>
                {isSubmitting ? "Analizing..." : "Upload"}
            </button>
        </form>
    );
};
export default Input;
