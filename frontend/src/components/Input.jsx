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

    const analyze = async (data) => {
        try {
            JSON.parse(data);
            return true;
        } catch (error) {
            setError("jsonFormat", {
                type: "custom",
                message: "This is not a json text!",
            });
        }
        await sleep(10000);
        console.log(data);
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit(analyze)}>
            <textarea className={Style.input} {...register("json")}></textarea>
            {errors && errors.file && (
                <output /* className={Style.error} */>
                    {errors.file.message}
                </output>
            )}
            <button className={Style.button}>
                {isSubmitting ? "Analizing..." : "Upload"}
            </button>
        </form>
    );
};
export default Input;
