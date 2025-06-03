import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

type LoginForm = {
    username: string;
    password: string;
    'g-recaptcha-response': string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        'g-recaptcha-response': '',
    });

    const recaptchaRef = useRef(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {
                reset('password');
            },
            onSuccess: () => {
                toast.success('Login berhasil!');
                setTimeout(() => {
                    router.get(route('users.index'));
                }, 3000);
            },
            onError: () => {
                toast.success('Login Gagal!');
            },
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your username and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Username"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="grid gap-2">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={(token) => setData('g-recaptcha-response', token ?? '')}
                        />
                        <InputError message={errors['g-recaptcha-response']} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
