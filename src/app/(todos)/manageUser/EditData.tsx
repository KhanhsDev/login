"use client"
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {getItemEdit} from "@/app/(todos)/api/GetItemEdit";

export default function EditData({index, inputData, saveEdit}: {
    index: number,
    inputData: string,
    // void có tác dụng cho biêt rằng saveEdit k trả về 1 giá trị
    saveEdit: (index: number, newValue: string) => void
}) {
    // Sử dụng state để theo dõi trạng thái chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [newInputData, setNewInputData] = useState(inputData);

    // Hàm xử lý khi nhấn nút Edit
    const handleEditItem = () => {
        setIsEditing(true);

    };

    // Hàm xử lý khi người dùng hoàn thành việc chỉnh sửa
    const handleSaveItem = () => {
        // sau khi chỉnh sửa thành công thì sẽ set isEditing = false
        setIsEditing(false);
        saveEdit(index, newInputData); // Lưu giá trị mới
    };

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newInputData}
                        onChange={(e) => setNewInputData(e.target.value)}
                        className="w-3/4 px-3 py-2 border rounded-md"
                        autoFocus={true}
                    />
                </>
            ) : ""}
            <Button
                className={`text-white py-6 rounded-md transition my-2.5 mx-5 ${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-amber-500 hover:bg-amber-600"}`}
                onClick={isEditing ? handleSaveItem : handleEditItem}
            >
                {isEditing ? "Save" : "Edit"}
            </Button>
        </>
    );
}
