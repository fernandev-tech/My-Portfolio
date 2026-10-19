type FormData = {
    label: string;
    htmlFor: string;
    id: string;
    name: string;
    fieldType: "input" | "textarea";
    type?: "text" | "email";
    placeholder: string;
};
const formData: FormData[] = [
    {
        label: "Nome",
        htmlFor: "name",
        id: "name",
        name: "name",
        fieldType: "input",
        type: "text",
        placeholder: "Seu nome..."
    },

    {
        label: "E-mail",
        htmlFor: "email",
        id: "email",
        name: "email",
        fieldType: "input",
        type: "email",
        placeholder: "Ex: seuemail@gmail.com"
    },
    {
        label: "Mensagem",
        htmlFor: "mesage",
        id: "mesage",
        name: "mesage",
        fieldType: "textarea",
        placeholder: "Escreva uma mensagem..."
    }
]

export function ContactForm() {

    /*Classes Reutilizáveis*/
    const labelClassName = "text-sm font-medium text-gray-200";

    const fieldClassName =
        "w-full rounded-lg border border-[#374151] bg-[#0a0e17] px-4 py-3 text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-blue-500";

    const buttonClassName =
        "w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

    return (
        <div className="rounded-2xl border border-[#263449] bg-[#121826] p-6">
            <form className="flex flex-col gap-4">
                <header>
                    <h3>Enviar Mensagem</h3>
                    <p>Preencha os campos abaixo para entrar em contato</p>
                </header>
                <div className="flex flex-col gap-4">
                    {formData.map((item) => (
                        <div key={item.id} className="flex flex-col gap-2">
                            <label
                                htmlFor={item.htmlFor}
                                className={labelClassName}
                            >
                                {item.label}
                            </label>

                            {item.fieldType === "textarea" ? (
                                <textarea
                                    id={item.id}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className={fieldClassName}
                                    rows={4}
                                />
                            ) : (
                                <input
                                    type={item.type}
                                    id={item.id}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className={fieldClassName}
                                />
                            )}
                        </div>
                    ))}
                    <button
                        className={buttonClassName}
                        type="submit">Enviar mensagem</button>
                </div>
            </form>
        </div>
    )
}