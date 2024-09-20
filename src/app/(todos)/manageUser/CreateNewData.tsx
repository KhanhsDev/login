"use client"
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import useSWR from "swr";

export default function createNew() {
    // lược đồ validate input data
    const addNewSchema = Yup.object().shape({
        inputData: Yup.string().required('Missing input parameter'),
    });
    const handleAddNew = (values: { inputData: string }, resetForm: () => void) => {
        // lấy ra dữ liệu ở localstrorage nếu có
        const listTodos = JSON.parse(localStorage.getItem('listTodos') as string) || [];
        const {inputData} = values;
        const newTodos = {
            inputData: inputData
        }
        // thêm data vào listTodos và năm ờ phía trên cùng của array
        listTodos.unshift(newTodos)
        // cập nhật lại localstorage
        localStorage.setItem('listTodos', JSON.stringify(listTodos))
        mutate(listTodos)
        resetForm()
    }
    const getListTodo = () => {
        return localStorage.getItem('listTodos')
            ? JSON.parse(localStorage.getItem('listTodos') as string)
            : [];
    };
    // config fetcher
    const fetcher = () => {
        return getListTodo();
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data, error, mutate} = useSWR(getListTodo, fetcher)

    return (
        <>
            <div className="mx-5">
                <Formik
                    validationSchema={addNewSchema}
                    onSubmit={(values, {resetForm}) => handleAddNew(values, resetForm)}
                    initialValues={{
                        inputData: "",
                    }}
                >

                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="flex">
                                <Field
                                    type="text"
                                    className="min-w-32 px-3 border text-black rounded-md focus:outline-none focus:ring focus:border-blue-300 my-2.5"
                                    name="inputData"
                                />
                                <Button
                                    type="submit"
                                    className="w-20 bg-blue-500 text-white py-6 rounded-md hover:bg-blue-600 transition my-2.5 mx-5"
                                >
                                    Add
                                </Button>
                            </div>
                            <ErrorMessage name="inputData" component="div" className="text-red-500"/>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
