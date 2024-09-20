"use client";
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Button} from "@/components/ui/button";
import createNew from './CreateNewData';
import displayData from './DisplayData'

export default function ManageUser() {

    const router = useRouter();
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        }
    }, [router]);
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Xóa trạng thái đăng nhập
        router.push('/login'); // Chuyển hướng về trang đăng nhập
    }


    return (
        <div>
            <h1 className="w-full font-bold text-3xl text-center text-white mt-14">TODOS</h1>
            <div className="flex justify-center">
                {createNew()}
                <Button
                    type="button"
                    className="w-20 bg-amber-500 text-white hover:bg-amber-600 transition my-2.5 py-6"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </div>
            {displayData()}
        </div>
    );
}


