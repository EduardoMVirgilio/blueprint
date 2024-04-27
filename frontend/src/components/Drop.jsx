import { LucideFile } from "lucide-react";
import { LucideFileUp } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Style from "../modules/Drop.module.css";

const Drop = () => {
    const [active, setActive] = useState(false);
    const [response, setResponse] = useState(null);
    const state = useForm({
        defaultValues: {
            file: "",
            about: "",
            orm: "Sequelize",
            db: "PostgreSQL",
        },
    });
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

    const analize = async (data) => {
        if (data.file[0].type !== "application/json") {
            return setError("file", {
                type: "custom",
                message: "This is not a json file!",
            });
        }
        try {
            const server =
                import.meta.env.VITE_SERVER || "http://localhost:3000";
            const endpoint = `${server}/analize`;
            const form = new FormData();
            form.append("file", data.file[0]);
            form.append("orm", data.orm);
            form.append("db", data.db);
            form.append("base", data.about);

            const config = {
                method: "POST",
                /* headers: {
                "Content-Type": "application/json",
            }, */
                body: form,
            };

            const request = await fetch(endpoint, config);
            if (!request.ok) {
                throw new Error("Error on fetching...");
            }
            const res = await request.json();
            const responseOk = res.data.trim()
            setResponse(responseOk);
            return reset();
        } catch (error) {
            return setError("json", {
                type: "custom",
                message: error.message,
            });
        }
        console.log(data);
    };
    return (
        <form className={Style.form} onSubmit={handleSubmit(analize)}>
            <input
                type="text"
                placeholder="What's your data about?"
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
            {errors && errors.file && (
                <output className={Style.error}>{errors.file.message}</output>
            )}
            {errors && errors.about && (
                <output className={Style.error}>{errors.about.message}</output>
            )}
            {errors && errors.db && (
                <output className={Style.error}>{errors.db.message}</output>
            )}
            {errors && errors.orm && (
                <output className={Style.error}>{errors.orm.message}</output>
            )}
            <button disabled={isSubmitting} className={Style.button}>
                {isSubmitting ? "Analizing..." : "Upload"}
            </button>
            {response && (
                <code>
                    <pre>{response}</pre>
                </code>
            )}
        </form>
    );
};
export default Drop;
