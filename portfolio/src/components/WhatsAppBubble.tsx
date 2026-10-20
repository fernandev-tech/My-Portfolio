import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppBubble() {
    return (
        <a
            className="fixed bottom-6 right-6 max-sm:bottom-10 max-sm:right-10 z-50 flex items-center justify-center size-14 max-sm:size-12  rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
            href="https://wa.me/244940150803"
            target="_blank" rel="noopener noreferrer"
            aria-label="Conversar comigo pelo WhatsApp">
            <FaWhatsapp
                className="text-2xl" />
        </a>
    )
}