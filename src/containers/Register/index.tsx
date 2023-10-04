import { Button, Form, Input, Space, Card } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface RegisterInterface {
    name: string;
    email: string;
    password: string;
}

const RegisterInterfaceValues = {
    name: '',
    email: '',
    password: ''
}

const validationSchema = yup.object({
    name: yup.string().required('Name cannot blank'),
    email: yup.string()
        .email('Invalid email format')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
        .required('Email cannot blank')
        .min(10),
    password: yup.string().required('Password cannot blank').min(8, '8 characters minimum')
})

const Register: React.FC = () => {

    const navigate = useNavigate();

    async function addRegistrant(values: RegisterInterface) {
        try {
            const fetching = await fetch('https://mock-api.arikmpt.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!fetching.ok) {
                throw new Error('Registering error');
            }
            navigate('/login');
        } catch (error) {
            console.error('Registering error:', error);
        }
    }
    
    async function handleSubmit(values: RegisterInterface) {
        try {
            if (formik.isValid) {
                await addRegistrant(values);
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    }

    const formik = useFormik({
        initialValues: RegisterInterfaceValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (
        <Card title="Register Page" headStyle={{ textAlign: 'center' }} style={{ width: '30vw', height: '30vw' }}>
            <Form onFinish={formik.handleSubmit}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Name cannot blank!' }]}
                >
                    <Input
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        status={formik.errors.name && 'error'}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    validateStatus={formik.touched.email && formik.errors.email ? 'error' : 'success'}
                    help={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                >
                    <>
                        <Input
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                        />
                    </>

                </Form.Item>
                <Form.Item
                    name="password"
                    validateStatus={formik.touched.password && formik.errors.password ? 'error' : 'success'}
                    help={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                >
                    <Input
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        status={formik.errors.password && 'error'}
                    />
                </Form.Item>
                    
                    <Button onClick={() => {navigate('/login')}} type="primary" > Login </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

            </Form>
        </Card>
    );
};

export default Register;