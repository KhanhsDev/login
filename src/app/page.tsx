import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl mb-4">Welcome to my app</h1>
                <div className="space-x-10">
                    <Button>
                        <Link href="/register">Register</Link>
                    </Button>
                    <Button>
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
