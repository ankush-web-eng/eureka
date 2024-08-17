import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

const CityFilter = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false })

export default function CityDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gray-100 shadow-xl border text-black hover:bg-white" variant="default">Select City <Image src='/dropdown.svg' alt="Dropdown" height={12} width={12} fetchPriority="low" loading="lazy" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CityFilter />
            </DialogContent>
        </Dialog>
    )
}
