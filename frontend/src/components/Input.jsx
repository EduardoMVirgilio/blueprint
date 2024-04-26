import { useForm } from "react-hook-form";
import Style from "../modules/Input.module.css";
import { useState } from "react";

const Input = () => {
    const state = useForm();
    const { register, formState, reset, handleSubmit, setError, setValue } =
        state;
    const { errors, isSubmitting } = formState;
    const [model, setModel] = useState(null)
    const sleep = function (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const analyze = async (data) => {
        /* console.log(data) */
        await sleep(5000);
        try {
            const jsonText = data.json
            const obj = JSON.parse(jsonText);
            if (
                typeof obj === "object" &&
                obj !== null &&
                !Array.isArray(obj)
            ) {
                const response = await fetch("http://localhost:3000/analize", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ json: jsonText })
                });
                console.log(response)
                const responseData = await response.text();
                /* console.log("Respuesta del backend:", responseData); */
                setModel(responseData)
                /* return true; */
            }
        } catch (error) {
            setError("registerInput", {
                type: "custom",
                message: "This is not a json text!",
            });
            console.error(error);
            return false;
        }
        return false;
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
            <div>{model? (<p>{model}</p>) : null}</div>
        </form>
    );
};
export default Input;
