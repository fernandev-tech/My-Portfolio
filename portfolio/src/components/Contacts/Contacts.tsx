
import { IoCall, IoLocation } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { ContactCard } from "./ContactCard";
import { SiGmail } from "react-icons/si";
import { ContactForm } from "./ContactForm";
export function Contacts() {
    return (
        <section id="contatos"
            className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold mb-8">Contatos</h2>

            <div className="">
                <div className="mb-8 flex flex-col max-w-2xl ">
                    <h2 className="text-2xl font-semibold tracking-tight mb-3">
                        Vamos conversar.
                    </h2>
                    <p className="text-base leading-7 text-gray-400">Estou disponível para conversar sobre oportunidades profissionais, desenvolvimento de sites e aplicações Web, planeamento de projetos e colaborações em tecnologia.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8">

                    <div className="mt-4 flex flex-col gap-8">

                        {/*E-mail*/}
                        <ContactCard
                            icon={SiGmail}
                            color="#EA4335"
                            title="E-mail"
                            value="ferdinandsebastion4@gmail.com"
                            href="mailto:ferdinandsebastion4@gmail.com" />

                        {/*Telefone*/}
                        <ContactCard
                            icon={IoCall}
                            color="#38BDF8"
                            title="Telefone"
                            value="953 857 801"
                            href="tel:+244953857801" />

                        {/*WhatsApp*/}
                        <ContactCard
                            icon={FaWhatsapp}
                            color="#25D366"
                            title="WhatsApp"
                            value="940 150 803"
                            href="https://wa.me/244940150803" />

                        {/*Localização*/}
                        <ContactCard
                            icon={IoLocation}
                            color="#60A5FA"
                            title="Localização"
                            value="Luanda - Bairo Calemba II, Angola" />


                    </div>
                    <div className="">
                        <ContactForm />
                    </div>
                </div>

            </div>
        </section>
    )
}