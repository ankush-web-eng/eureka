import UserIcon from "./includes/UserIcon";

export default function Navbar() {
    return (
        <div className="px-12 py-4 top-0">
            <div className="flex px-5 justify-between items-center w-full py-2 border rounded-full sticky shrink-0">
                <h1 className="">MedZo</h1>
                <UserIcon />
            </div>
        </div>
    )
}