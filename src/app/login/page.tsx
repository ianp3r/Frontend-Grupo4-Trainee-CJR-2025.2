"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: 'POST',     
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({ message: res.statusText }));
                setError(err.message || 'Erro no login');
                setLoading(false);
                return;
            }

            const data = await res.json().catch(() => ({}));
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }

            setLoading(false);
            router.push('/');
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : String(err);
                setError(message ?? 'Erro de rede');
            setLoading(false);
        }
    }

    return (
        <main className="h-screen flex">
                    <div className="w-1/2 flex items-center justify-center bg-white">
                        <Image src="/mascote.png" alt="Mascote Stock.io" width={400} height={400} className="h-200" />
                    </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-black">
                <h1 className="text-white text-2xl font-bold mb-6">BEM VINDO DE VOLTA!</h1>
                <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="mb-5 p-5 rounded"
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Senha"
                        className="mb-5 p-5 rounded"
                        required
                    />
                    <a href="#" className="text-white-400 text-xs mb-4">Esqueceu sua senha?</a>

                    {error && <div className="text-red-400 mb-4">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-700 hover:bg-purple-800 text-white rounded p-2 mb-2"
                    >
                        {loading ? 'Entrando...' : 'ENTRAR'}
                    </button>
                    <span className="text-white text-sm">
                    Não possui uma conta?{" "}
                    <button
                        type="button"
                        onClick={() => router.push('/cadastro')}
                        className="text-purple-500 underline"
                    >
                        Cadastre-se
                    </button>
                    </span>
                </form>
            </div>
        </main>
    );
}
