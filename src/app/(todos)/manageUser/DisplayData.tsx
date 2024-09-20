"use client";
import useSWR from 'swr';
import React, {useState} from "react";
import EditData from "./EditData";
import deleteData from "./DeleteData";

// Hàm lấy dữ liệu từ localStorage
const getListTodo = () => {
    return localStorage.getItem('listTodos')
        ? JSON.parse(localStorage.getItem('listTodos') as string)
        : [];
};

// Config fetcher
const fetcher = () => {
    return getListTodo();
};

export default function DisplayData() {
    const {data, error, mutate} = useSWR(getListTodo, fetcher);

    // Hàm lưu chỉnh sửa
    const saveEdit = (index: number, newValue: string) => {
        const updatedList = [...data]; // Sao chép dữ liệu hiện tại
        updatedList[index].inputData = newValue; // Cập nhật giá trị mới
        localStorage.setItem('listTodos', JSON.stringify(updatedList)); // Cập nhật vào localStorage
        mutate(updatedList); // Cập nhật lại data qua SWR
    };

    if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;
    if (!data) return <div>Đang tải dữ liệu...</div>;

    return (
        <>
            <h1 className="w-full font-bold text-3xl text-center text-white my-14">Display Data from localStorage</h1>
            {data && data.length > 0 && data.reverse ? (
                <div className="my-2.5 w-1/2 mx-auto rounded-sm text-black">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2 w-1/12">No</th>
                            <th className="border px-4 py-2 w-1/2">Dữ Liệu Đã Nhập</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{item.inputData}</td>
                                <td className="border px-4 py-2 text-center">
                                    <EditData
                                        index={index}
                                        inputData={item.inputData}
                                        saveEdit={saveEdit}
                                    />
                                    {deleteData(index)}
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
