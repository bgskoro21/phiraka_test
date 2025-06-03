import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowBigLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

type CreateUserForm = {
    name: string;
    username: string;
    password: string;
};

interface UserEditProps {
    user: User;
}

const UserEditPage = ({ user }: UserEditProps) => {
    const { data, setData, put, processing, errors, reset } = useForm<Required<CreateUserForm>>({
        username: user.username,
        name: user.name,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            onFinish: () => reset('password'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit" />
            <div className="p-4">
                <div className="mb-9 flex items-center gap-3">
                    <Link href={route('users.index')}>
                        <ArrowBigLeft />
                    </Link>
                    <h1 className="text-2xl font-bold">Edit User Form</h1>
                </div>
                <div className="w-[40%]">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Name"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    tabIndex={1}
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="Username"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    tabIndex={1}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="mt-4 w-25" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserEditPage;
