"use client"; // This is a client component

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import useSWR from 'swr';
import * as Yup from "yup";


export default function Login() {

    const router = useRouter();
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),

    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl text-blue-300 font-bold text-center">Login</h2>
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={(values, actions) => {
                        alert("Đăng nhập thành công")
                        console.log("chekck value ", values);
                    }}
                    initialValues={{
                        email : "",
                        password: "",
                    }}
                >
                <Form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <Field
                            name="email"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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