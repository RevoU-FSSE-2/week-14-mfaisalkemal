import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form, Input, Card } from 'antd';
import { useNavigate } from 'react-router';

interface LoginInterface {
    email: string;
    password: string;
}

const LoginInterfaceValues = {
    email: '',
    password: ''
}

const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
})

const Login: React.FC = () => {
    const navigate = useNavigate();

    async function registrantLogin(values: LoginInterface) {
        try {
            const fetching = await fetch('https://mock-api.arikmpt.com/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!fetching.ok) {
                throw new Error('Error login user');
            }
            const response = await fetching.json();

            localStorage.setItem('token',response.data.token);
            
            navigate('/List');
        } catch (error) {
            alert('Login Error');
        }
    }

    async function handleSubmit(values: LoginInterface) {
        try {
            if (formik.isValid) {
                await registrantLogin(values);
            }
        } catch (error) {
            alert('Error in handleSubmit');
        }
    }

    const formik = useFormik({
        initialValues: LoginInterfaceValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })


    return (
        <Card title="Login Page" headStyle={{ textAlign: 'center' }} style={{ width: '30vw', height: '30vw' }}>
            <Form onFinish={formik.handleSubmit}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        status={formik.errors.email && 'error'}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        status={formik.errors.password && 'error'}
                    />
                </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Button onClick={() => {navigate('/register')}} type="primary" >Register</Button>
                    
            </Form>
        </Card>
    );
};

export default Login;