import Image from "next/image";
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import arrow from '@/assets/arrow.svg';
import email from '@/assets/email.svg';
import cover from '@/assets/cover.svg';
import profile_picture from '@/assets/profile_picture.svg';
import produto from '@/assets/produto.png';
import produto2 from '@/assets/produto2.png';
import produto3 from '@/assets/produto3.png';
import produto4 from '@/assets/produto4.png';
import produto5 from '@/assets/produto5.png';
import avaliacoes from '@/assets/avaliacoes.svg';
import foto_comentario from '@/assets/foto-comentario.png';
import image_loja_ex from '@/assets/imagem-loja-ex.svg';

const usuarios = [
    {
        username: "selena-gomez",
        nome: "Selena Gomez",
        email: "selenamariegomez@rare.com",
        foto: '@/assets/profile_picture.svg',
        capa: 'cover.svg',
        produtos: [
            { id: 1, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
            { id: 2, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
            { id: 3, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
            { id: 4, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
            { id: 5, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
        ],
    },
    {
        username: "justin-bieber",
        nome: "Justin Bieber",
        email: "jb@music.com",
        foto: 'j.png',
        capa: 'cover.svg',
        produtos: [
            { id: 1, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
            { id: 2, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
            { id: 3, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
            { id: 4, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
            { id: 5, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
        ],
    },
];

// TRECHO PARA TESTE DE AVALIACOES COMECA AQUI
const listaAvaliacoes = [
    {
        nome: "Sofia Figueiredo",
        texto: "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram",
        foto: foto_comentario,
        avaliacoes: avaliacoes
    },
    {
        nome: "Sofia Figueiredo",
        texto: "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram",
        foto: foto_comentario,
        avaliacoes: avaliacoes
    },
];
// TERMINA AQUI

export async function generateStaticParams() {
    return usuarios.map((u) => ({ username: u.username }))    
}

const Perfil = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    console.log(username)

    const usuario = usuarios.find(u => u.username === username);
    if (!usuario) return notFound(); 

    return (
        <main className="w-full min-h-screen bg-[#F6F3E4]">
            <Header />
            <div className="relative">
                <Image className="w-full h-full" src={cover} alt="cover" />
                <div className="ml-[116px] mt-[175px] flex gap-[36px] absolute top-[25px]">
                    <div>
                        <Image className='w-[28px] h-[48px] mt-[67px]' src={arrow} alt="seta"/>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <Image className='w-[230px] h-[230px]' src={profile_picture} alt='foto de perfil' />
                        <h1 className="font-[League_Spartan] font-medium text-[52.56px] leading-[100%] text-black">{usuario.nome}</h1>
                        <span className="font-[League_Spartan] font-light text-[29.15px] leading-[100%] text-black">@ {usuario.username}</span>
                        <span className="font-[League_Spartan] font-light text-[29.15px] leading-[100%] text-black flex items-center gap-[7.15px]">
                            <Image src={email} alt='email'/>
                            {usuario.email}
                        </span>
                    </div>
                    <button className="absolute w-[324px] h-[43.22px] top-[250px] left-[1002px] rounded-[266px] bg-[#6A38F3] font-inter font-normal text-[21.66px]" 
                        >Editar Perfil
                    </button>
                </div>

                <div className='w-full absolute top-[650px] px-[115px]'>
                    <div className="w-full flex justify-between flex justify-between items-center">
                        <h1 className="font-league font-medium text-[36.25px] text-black">Produtos</h1>
                        <span className="font-league font-medium text-[15.99px] text-[#6A38F3]">ver mais</span>
                    </div>
                    <div className="flex gap-[32px] overflow-x-auto mt-[42px]">
                            {
                                usuario.produtos.map(item => (
                                    <div key={item.id} className="w-[228.67px] h-[310px] rounded-[12.81px] bg-white flex flex-col list-none shrink-0">
                                        {/* Trecho adicionado para colocar o selo da loja no produto. COMECA AQUI*/}
                                        <div className=" self-center relative justify-center items-center flex w-[190.24px] h-[190.24px]">
                                            <Image className="w-full h-full" src={item.image} alt={item.alt}/>
                                            <Image className="absolute top-2.5 right-2.5 w-[50px] h-[50px]" src={image_loja_ex} alt="imagem da loja"/>
                                        </div>
                                        {/* TERMINA AQUI */}
                                        <div className="flex flex-col px-[22px] leading-[1] gap-[8px]">
                                            <span className="font-[League_Spartan] font-medium text-[26.65px] text-black">{item.nome}</span>
                                            <span className="font-[League_Spartan] font-medium text-[23.02px] text-black">R${item.preco}</span>
                                            {/* TRECHO PARA MUDAR A COR CONFORME A DISPONILIDADE. COMECA AQUI */}
                                            <span className={`font-[League_Spartan] font-medium text-[13.86px] ${item.estoque === 'Disponível'? 'text-[#C6E700]' : 'text-[#AF052A]'}`}>{item.estoque}</span>
                                            {/* TERMINA AQUI */}
                                        </div>
                                    </div>
                                ))
                            }
                    </div>
                </div>
                {/* Trecho adicionado para listar as avaliacoes. COMECA AQUI*/}
                <div className="absolute top-[1100px] px-[115px]">
                    <h1 className="font-league font-medium text-[36.25px] text-black">Avaliações</h1>
                    <ul className="flex mt-[10px] mb-[40px] mt-[42px] gap-[30px] overflow-x-auto">
                        {listaAvaliacoes.map((item, index) => (
                            <li
                                key={index}
                                className="w-full flex-none w-[930px] h-[205px] bg-[white] flex items-center gap-[18px] rounded-[31.34px]"
                            >
                                <Image
                                    className="h-[154px] w-[154px] ml-[30px]"
                                    src={item.foto}
                                    alt={`Foto de ${item.nome}`}
                                />
                                <div className="flex flex-col mr-[30px]">
                                <div className="flex items-start justify-between">
                                        <span className="font-[League_Spartan] font-normal text-[28.67px] leading-[100%] tracking-[0%] text-black">
                                            {item.nome}
                                        </span>
                                    <Image
                                        src={item.avaliacoes}
                                        className="w-[172px] h-[34.57px]"
                                        alt="Avaliações"
                                    />
                                    </div>
                                    <div className="mt-[10px] flex flex-col">
                                        <p className="font-[League_Spartan] font-light text-[24.59px] leading-[100%] tracking-[0%] text-black">
                                            {item.texto}
                                        </p>
                                        <span className="font-[League_Spartan] self-end font-light text-[24.59px] leading-[100%] tracking-[0%] text-[#8A38F5]">
                                            ver mais
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* TERMINA AQUI */}
            </div>
        </main>
    )
};

export default Perfil;
