import dynamic from "next/dynamic";
const SignIn = dynamic(() => import('@/components/includes/signIn'), { ssr: false });

export default function Page() {
    return (
        <div>
            <SignIn />
        </div>
    );
};