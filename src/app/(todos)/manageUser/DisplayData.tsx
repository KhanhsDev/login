"use client"
import useSWR from 'swr'
import React from "react";
import {Button} from "@/components/ui/button";
// kiểm tra xem window có tồn tại hay k
// lấy ra dữ liệu đã lưu trong localStorage và trả về parse nếu k rỗng
// eslint-disable-next-line react-hooks/rules-of-hooks
const getListTodo = () => {
    return typeof window !== 'undefined' && localStorage.getItem('listTodos')
        ? JSON.parse(localStorage.getItem('listTodos') as string)
        : [];
};
// config fetcher
const fetcher = () => {
    return getListTodo();
};
export default function DisplayData() {
    const {data, error, mutate} = useSWR(getListTodo, fetcher)
    if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;
    if (!data) return <div>Đang tải dữ liệu...</div>;
    return (
        <>
            <h1 className="w-full font-bold text-3xl text-center text-white my-14">Display Data from localstorage</h1>
            {data && data.length > 0 && data.reverse ? (
                <div className="my-2.5 w-1/2 mx-auto rounded-sm text-black">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2 w-1/12">ID</th>
                            <th className="border px-4 py-2 w-1/2">Dữ Liệu Đã Nhập</th>
                            <th className="border px-4 py-2">Actions</th>

                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 mx-5">{item.inputData}</td>
                                <td className="border px-4 py-2 text-center">
                                    <Button
                                        className="w-20 bg-amber-500 text-white py-6 rounded-md hover:bg-amber-600 transition my-2.5 mx-5"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="w-20 bg-red-500 text-white py-6 rounded-md hover:bg-red-600 transition my-2.5 mx-5"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Không có dữ liệu để hiển thị.</div>
            )}
        </>
    );
}
