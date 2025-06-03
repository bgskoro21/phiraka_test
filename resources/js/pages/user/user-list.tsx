import { DataTable } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { PaginationMeta } from '@/types/pagination';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

function getColumns(): ColumnDef<User>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'password',
            header: 'Password',
        },
        {
            accessorKey: 'created_at',
            header: 'CreatedTime',
            cell: ({ getValue }: any) => {
                const date = new Date(getValue());
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-center gap-2.5">
                    <Link href={route('users.show', row.original.id)}>Edit</Link>
                    <DeleteButton userId={row.original.id} />
                </div>
            ),
        },
    ];
}

interface Props {
    users: {
        data: User[];
    } & PaginationMeta;
}

const DeleteButton = ({ userId }: { userId: number }) => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('users.destroy', userId));
        }
    };

    return (
        <button onClick={() => handleDelete()} className="text-blue-500 hover:underline">
            Delete
        </button>
    );
};

const UserPage = ({ users }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">User List</h1>
                    <Link href={route('users.create')} className="cursor-pointer rounded-xl bg-blue-500 p-4 duration-300 hover:opacity-75">
                        Tambah User
                    </Link>
                </div>
                <DataTable data={users.data} columns={getColumns()} pagination={users} />
            </div>
        </AppLayout>
    );
};

export default UserPage;
