"use client"; // This is a client component

import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";


export default function Login() {

    const router = useRouter();
// kiêm tra xem người dùng đã đăng nhập và lưu infor vào localstorage hay chưa khi trang được tải lại hoặc điều hướng tới trang khác
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            router.push('/manageUser'); // Chuyển hướng nếu người dùng đã đăng nhập
        }
    }, [router]);
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    });
    // kiểm tra email và password đã có trong localstorage chưa
    const vertifyUser = (values: { email: string; password: string }) => {
        const listUsers = JSON.parse(localStorage.getItem('listUsers') as string) || [];
        const user = listUsers.find((user: {
            email: string;
            password: string
        }) => user.email === values.email && user.password === values.password);
        return user;
    }
    const handleLogin = (values: { email: string; password: string }) => {
        console.log("check user login", vertifyUser(values));
        const user = vertifyUser(values);
        // lưu thông tin người dùng đăng nhập vào localstorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        if (user) {
            // Lưu trạng thái đăng nhập vào localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            router.push('../manageUser'); // Điều hướng đến trang quản lý người dùng
        } else {
            router.push('/register'); // Nếu không tìm thấy người dùng, điều hướng đến trang đăng ký
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl text-blue-300 font-bold text-center">Login</h2>
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <Field
                                name="email"
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <Field
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                name="password"
                                placeholder="Mật Khẩu"
                            />
                        </div>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}