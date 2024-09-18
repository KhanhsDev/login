"use client"; // This is a client component

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


// const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Register() {
    const router = useRouter();

    const registerSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Xác nhận mật khẩu là bắt buộc'),
    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl text-black font-bold text-center ">Register</h2>
                <Formik
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        alert("Đăng kí thành công")
                        console.log("chekck value ", values);
                    }}
                    initialValues={{
                        email : "",
                        password: "",
                        confirmpassword : ""
                    }}
                >

                <Form>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <Field
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring focus:border-blue-300"
                            name="email"
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
                            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            name="password"
                            placeholder="Mật Khẩu"

                        />
                    </div>
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <Field
                            type="password"
                            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            name="confirmpassword"
                            placeholder="Xác nhận mật khẩu"

                        />
                    </div>
                    <ErrorMessage
                        name="confirmpassword"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition my-2.5"
                    >
                        Register
                    </button>
                </Form>

            </Formik>

            </div>
        </div>
    );
}