import { useForm } from "react-hook-form";
import Style from "../modules/Input.module.css";
import { useState } from "react";

const Input = () => {
    const state = useForm();
    const { register, formState, reset, handleSubmit, setError, setValue } =
        state;
    const { errors, isSubmitting } = formState;
    const sleep = function (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const analyze = async (data) => {
        await sleep(5000);
        try {
            JSON.parse(data.json);
            return true;
        } catch (error) {
            setError("registerInput", {
                type: "custom",
                message: "This is not a json text!",
            });
            console.error(error)
            return false;
        }
        
        
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit(analyze)}>
            <textarea
                className={Style.input}
                placeholder="Write your JSON here..."
                {...register("json")}
            ></textarea>
            {errors && errors.registerInput && (
                <div className={Style.error}>
                    {errors.registerInput.message}
                </div>
            )}
            <button className={Style.button}>
                {isSubmitting ? "Analizing..." : "Upload"}
            </button>
        </form>
    );
};
export default Input;
