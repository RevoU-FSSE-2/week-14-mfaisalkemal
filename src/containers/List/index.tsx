import { useCallback, useContext, useEffect } from 'react';
import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Provider/AppProvider';

interface Category {
    key: string;
    id: string;
    name: string;
    is_active: boolean;
}

interface GetCategoryResponse {
    data: Category[],
    currentPage: number,
    totalItem: number,
    totalPage: number
}

const List: React.FC = () => {

    const { categories, setCategories } = useContext(AppContext);
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const getCategoryList = useCallback(
        async () => {
            const fetching = await fetch('https://mock-api.arikmpt.com/api/category', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            const response: GetCategoryResponse = await fetching.json();

            

            const categorizedData = response.data ? response.data.map(category => ({
                ...category,
                key: category.id
            })) : [];
            
            setCategories(categorizedData ?? []);
            console.log(categorizedData)
        },
        [setCategories, token]
    )
    useEffect(
        () => {
            getCategoryList()
        },
        [getCategoryList]
    )
    
    const deleteCategory = async (recordId: string) => {
        try {
            const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/${recordId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!fetching.ok) {
                throw new Error('Error deleting category');
            }

            getCategoryList();
        } catch (error) {
            alert('Error delete Data');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }

    const columns: ColumnsType<Category> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => (
                <span>{isActive ? 'Active' : 'Deactive'}</span>
            ),
            sorter: (a) => (a.is_active ? 1 : -1),
            onFilter: (value, record) => record.is_active === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a><Button type='primary' onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button></a>
                    <a><Button type='primary' danger onClick={() => deleteCategory(record.id)}>Delete</Button></a>
                </Space>
            ),
            onFilter: (value, record) => record.is_active === value,
        },
    ];

    return (
        <Card title="List Page" style={{ height: '85vh' }} extra={
            <div>
                <br></br>
                <div>
                    <Button onClick={handleLogout} >Log Out</Button>
                </div>
                <br></br>
                <div>
                    <Button onClick={() => { navigate('/add') }}>Add Category</Button>
                </div>
            </div>
        }>
            <Table
                columns={columns}
                dataSource={categories}
                pagination={{
                    defaultPageSize: 5,
                    total: categories.length,
                    position: ['topCenter']
                }}
            />
        </Card>
    )
}

export default List;