import { Button, Form, Input, Space, Card, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useContext } from 'react';
import { useFormik } from 'formik';
import { AppContext } from '../../Provider/AppProvider';
import { useTokenChecker } from '../../hooks';


interface AccountLogin {
    name: string;
    is_active: string;
}

const initialValues = {
    name: '',
    is_active: ''
}

const AddCategory: React.FC = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useTokenChecker(token)
    
    const handleSubmit = async (values: AccountLogin) => {
        try {
            const fetching = await fetch('https://mock-api.arikmpt.com/api/category/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            if (!fetching.ok) {
                throw new Error('Error adding category');
            }
            navigate('/list');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name must exist')
    });

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (
        <Card title="Add New Category" headStyle={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => { navigate('/list') }}>Back</Button>
            <Form onFinish={formik.handleSubmit}>
                <Form.Item
                    name="name"
                    validateStatus={formik.touched.name && formik.errors.name ? 'error' : 'success'}
                    help={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                >
                    <Input
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        status={formik.errors.name && 'error'}
                    />
                </Form.Item>
                <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Select one of the status' }]}
                >
                    <Select
                        placeholder="Status"
                        value={formik.values.is_active}
                        onChange={formik.handleChange('is_active')}
                        status={formik.errors.is_active && 'error'}
                    >
                        <Select.Option value="true">Active</Select.Option>
                        <Select.Option value="false">Deactive</Select.Option>
                    </Select>
                </Form.Item>
                <Space direction="horizontal" size="middle">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form>
        </Card>
    );
};

export default AddCategory;