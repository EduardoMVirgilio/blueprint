import { useForm } from "react-hook-form";
import Style from "../modules/Input.module.css";
import { useState } from "react";

const Input = () => {
    const [response, setResponse] = useState(null);
    const state = useForm({
        defaultValues: {
            json: "",
            about: "",
            orm: "Sequelize",
            db: "PostgreSQL",
        },
    });
    const { register, formState, reset, handleSubmit, setError } =
        state;
    const { errors, isSubmitting } = formState;

    const analyze = async (data) => {
        const input = data.json;
        const content = JSON.parse(input);
        const isValid = content !== null;
        const isArray = Array.isArray(content);
        const isEmptyArray = isArray
            ? content.some((object) => Object.keys(object).length === 0)
            : false;
        const isObject = typeof content === "object";
        const isEmptyObject = Object.keys(content).length === 0;

        if (!isValid) {
            return setError("json", {
                type: "custom",
                message: "This is not a json text!",
            });
        }

        if (isArray && content.length == 0) {
            return setError("json", {
                type: "custom",
                message: "The contents of the arrays may not be empty.",
            });
        }

        if (isEmptyArray) {
            return setError("json", {
                type: "custom",
                message: "The contents of the arrays may not be empty.",
            });
        }

        if (isObject && isEmptyObject) {
            return setError("json", {
                type: "custom",
                message: "The contents of the object may not be empty.",
            });
        }

        try {
            const server =
                import.meta.env.VITE_SERVER || "http://localhost:3000";
            const endpoint = `${server}/analize`;
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        base: data.about,
                        orm: data.orm,
                        db: data.db,
                        content: JSON.stringify(content),
                    },
                    null,
                    2
                ),
            };

            const request = await fetch(endpoint, config);
            if (!request.ok) {
                throw new Error("Error on fetching...");
            }
            const res = await request.json();
            setResponse(res.data);
        } catch (error) {
            return setError("json", {
                type: "custom",
                message: error.message,
            });
        }
    };

    return (
        <>
            <form className={Style.form} onSubmit={handleSubmit(analyze)}>
                <input
                    type="text"
                    placeholder="Write about is your data"
                    {...register("about", {
                        required: {
                            value: true,
                            message: "Complete this field",
                        },
                    })}
                />
                <select
                    {...register("orm", {
                        required: { value: true, message: "Select ORM" },
                    })}
                >
                    <option value="Prisma ORM"> Prisma ORM </option>
                    <option value="Sequelize"> Sequelize </option>
                    <option value="TypeORM">TypeORM</option>
                </select>
                <select
                    {...register("db", {
                        required: { value: true, message: "Select DB" },
                    })}
                >
                    <option value="MySQL"> MySQL</option>
                    <option value="PostgreSQL"> PostgreSQL </option>
                    <option value="Oracle DB">Oracle DB</option>
                </select>
                <textarea
                    className={Style.input}
                    placeholder="Write your JSON here..."
                    {...register("json", {
                        required: {
                            value: true,
                            message: "Complete this field",
                        },
                    })}
                ></textarea>
                {errors && errors.json && (
                    <output className={Style.error}>
                        {errors.json.message}
                    </output>
                )}
                {errors && errors.about && (
                    <output className={Style.error}>
                        {errors.about.message}
                    </output>
                )}
                <button className={Style.button}>
                    {isSubmitting ? "Analizing..." : "Upload"}
                </button>
            </form>
            {response && (
                <code>
                    <pre>{response}</pre>
                </code>
            )}
        </>
    );
};
export default Input;
