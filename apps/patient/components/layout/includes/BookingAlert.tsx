import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";

import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import BookingConfirmDialog from "./BookingConfirm";


interface Slot {
    id: string;
    date: string;
    time: string;
}

export function BookingAlertdialog({ slot, name, fee }: { slot: Slot, name: string, fee: number }) {
    return (
        <div className="cursor-pointer">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="flex justify-between text-sm mb-1 pb-1 border-b last:border-b-0">
                        <p className="text-gray-700">{slot.date}</p>
                        <p className="text-blue-600 font-medium">{slot.time}</p>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Do you want to book Dr. {name} for {slot.time} on {slot.date}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button >Continue</button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <BookingConfirmDialog params={{ name: name, fee: fee }} />
                                </DialogContent>
                            </Dialog>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
