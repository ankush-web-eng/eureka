import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/navbar"));

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}