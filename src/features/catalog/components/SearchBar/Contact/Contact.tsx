import { Phone } from "lucide-react"

export const Contact = () => {
    return <div>
        <a href="tel:+1-923-233-0907" className="font-bold flex text-base items-end flex-1"> <Phone size={"18"} className="text-textPrimary mr-1" /> +1-923-233-0907</a>
    </div>
}