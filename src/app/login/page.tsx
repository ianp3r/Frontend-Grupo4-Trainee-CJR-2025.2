
export default function Login() {
    return (
        <main className="h-screen flex">
            <div className="w-1/2 flex items-center justify-center bg-white">
                <img src="/mascote.png" alt="Mascote Stock.io" className="h-200" />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-black">
                <h1 className="text-white text-2xl font-bold mb-6">BEM VINDO DE VOLTA!</h1>
                <form className="flex flex-col w-2/3">
                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-5 p-5 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="mb-5 p-5 rounded"
                    />
                    <a href="#" className="text-white-400 text-xs mb-4">Esqueceu sua senha?</a>
                    <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 text-white rounded p-2 mb-2"
                    >
                        ENTRAR
                    </button>
                    <span className="text-white text-sm">Não possui uma conta? <a href="#" className="text-purple-500">Cadastre-se</a></span>
                </form>
            </div>
        </main>
    );
}
