import { Outlet } from 'react-router'
import { Layout } from 'antd';

const PublicLayout = () => {

    return (
        <Layout style={{ width: '100%', height: '100%', background: 'black' }}>
            <div>
                < Outlet />
                <div style={{ width: '30vw' }}>Created by Muhammad Faisal Kemal @2023</div>
            </div>
        </Layout>
    )
}

export default PublicLayout