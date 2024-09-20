"use client"
import {Button} from "@/components/ui/button";
import {mutate} from "swr";
import React from "react";

export default function deleteData(index: number): React.JSX.Element {
    const getListTodo = () => {
        return localStorage.getItem('listTodos')
            ? JSON.parse(localStorage.getItem('listTodos') as string)
            : [];
    };

    // Hàm xử lý xóa item
    const handleDelete = (index: number) => {
        const currentTodos = getListTodo();
        const updatedTodos = currentTodos.filter((_: never, i: number) => i !== index); // Xóa item theo index
        localStorage.setItem('listTodos', JSON.stringify(updatedTodos)); // Cập nhật lại localStorage
        mutate(getListTodo); // Cập nhật lại dữ liệu sau khi xóa
    };
    return (
        <>
            <Button
                className="w-20 bg-red-500 text-white py-6 rounded-md hover:bg-red-600 transition my-2.5 mx-5"
                onClick={() => handleDelete(index)} // Gọi hàm xóa khi click vào
            >
                Delete
            </Button>
        </>
    )
}