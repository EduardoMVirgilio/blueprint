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
            await JSON.parse(data);
            return true;
        } catch (error) {
            setError("registerInput", {
                type: "custom",
                message: "This is not a json text!",
            })
            console.error(error);
        }
        
        await sleep(10000);
        console.log(data);
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit(analyze)}>
            <textarea className={Style.input} {...register("json")}></textarea>
            {console.log(errors)}
            {errors && errors.registerInput && (
                <output /* className={Style.error} */>
                    {errors.registerInput.message}
                </output>
            )}
            <button className={Style.button}>
                {isSubmitting ? "Analizing..." : "Upload"}
            </button>
        </form>
    );
};
export default Input;
