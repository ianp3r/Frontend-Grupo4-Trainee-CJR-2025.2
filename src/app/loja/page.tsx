import Header from "@/components/Header";
import Image from "next/image";
import criar_icone from '@/assets/criar-icone.svg';
import editar_icone from '@/assets/editar-icone.svg';
import foto_comentario from '@/assets/foto-comentario.png';
import avaliacoes from '@/assets/avaliacoes.svg';
import produto from '@/assets/produto.png';
import produto2 from '@/assets/produto2.png';
import produto3 from '@/assets/produto3.png';
import produto4 from '@/assets/produto4.png';
import produto5 from '@/assets/produto5.png';
import Paginador from "@/components/Paginador";

const comentarios = [
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

const produtos = [
    { id: 1, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 2, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 3, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 4, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 5, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
]

const produtos2 = [
    { id: 1, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 2, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 3, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 4, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 5, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
    { id: 6, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 7, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 8, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 9, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 10, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
    { id: 11, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 12, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 13, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 14, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 15, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
    { id: 16, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 17, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 18, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 19, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 20, nome: 'Mini', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
    { id: 21, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 22, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 23, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 24, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 25, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' },
    { id: 26, nome: 'Bronzer', preco: 254.99, estoque: 'Disponível', image: produto, alt: 'produto' },
    { id: 27, nome: 'Blush', preco: 199.99, estoque: 'Indisponível', image: produto2, alt: 'produto2' },
    { id: 28, nome: 'Perfume', preco: 599.99, estoque: 'Disponível', image: produto3, alt: 'produto3' },
    { id: 29, nome: 'Iluminador', preco: 259.90, estoque: 'Disponível', image: produto4, alt: 'produto4' },
    { id: 30, nome: 'Mini Blush', preco: 99.99, estoque: 'Indisponível', image: produto5, alt: 'produto5' }
];


const Loja = () => {
    return (
        <div>
            <Header />
            <div className="bg-[url('/capa-loja.png')] bg-gradient-to-b from-black to-transparent h-[539px] w-[1440px]">
                <div className="h-[539px] w-[1440px] flex flex-col bg-[linear-gradient(180deg,_#000000_0%,_rgba(0,0,0,0)_49%)]">
                    <div className="mt-[54px] mr-[114px] flex flex-col gap-[12px] self-end">
                        <button className="w-[45px] h-[45px] bg-[#6A38F3] flex justify-center items-center rounded-[30px]">
                            <Image src={editar_icone} alt="icone de editar"/>
                        </button>
                        <button className="w-[45px] h-[45px] bg-[#6A38F3] flex justify-center items-center rounded-[30px]">
                            <Image src={criar_icone} alt="icone de criar"/>
                        </button>
                    </div>
                    <div className="self-center">
                        <h1 className="font-[League_Spartan] text-[#F6F3E4] text-[90px] leading-[1] font-medium">Rare Beauty</h1>
                        <h2 className=" font-[League_Spartan] text-[#F6F3E4] font-light text-[33.27px] leading-[100%] tracking-normal">beleza</h2>
                    </div>
                    <p className="font-[League_Spartan] font-light text-[#F6F3E4] text-[20.39px] leading-[100%] tracking-normal mt-[225.26px] mr-[114px] self-end"
                        >by <span className="underline decoration-solid decoration-[0%]">Selena Gomes</span>
                    </p>
                </div>
            </div>

            <div className="h-[606px] flex flex-col">
                <h1 className="font-[League_Spartan] mt-[59px] font-normal text-[53.65px] leading-[100%] tracking-[0%] text-center">Reviews e Comentários</h1>
                <h2 className="font-[League_Spartan] mt-[30px] font-normal text-[76.19px] leading-[100%] tracking-[0%] text-center">4.75</h2>
                <Image className="mt-[15px] self-center" src={avaliacoes} alt='avalicoes'/>
                <span className=" mt-[40px] mr-[114px] font-[League_Spartan] self-end font-light text-[24.59px] leading-[100%] tracking-[0%] text-[#8A38F5]">ver mais</span>
                <ul className="flex mt-[10px] gap-[30px] ml-[114px] mr-[114px] overflow-x-auto">
                    {comentarios.map((item, index) => (
                        <li
                            key={index}
                            className="flex-none w-[930px] h-[205px] bg-[#F6F3E4] flex items-center gap-[18px] rounded-[31.34px]"
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

            <div className="bg-[#F6F3E4]">
                <div className='w-full px-[115px]'>
                    <div className="w-full flex justify-between flex justify-between items-center">
                        <h1 className="font-league mt-[35px] font-medium text-[36.25px] text-black">Produtos<span className="font-[League_Spartan] font-medium text-[15.99px] leading-[100%] tracking-[0%]"> melhor avaliados</span></h1>
                        <span className="font-league mt-[35px] font-medium text-[15.99px] text-[#6A38F3]">ver mais</span>
                    </div>
                    <div className="flex gap-[32px] overflow-x-auto mt-[42px]">
                        {
                            produtos.map(item => (
                                <div key={item.id} className="w-[228.67px] h-[310px] overflow-x-auto rounded-[12.81px] bg-white flex flex-col list-none shrink-0">
                                    <Image className="self-center w-[190.24px] h-[190.24px]" src={item.image} alt={item.alt}/>
                                    <div className="flex flex-col px-[22px] leading-[1] gap-[8px]">
                                        <span className="font-[League_Spartan] font-medium text-[26.65px] text-black">{item.nome}</span>
                                        <span className="font-[League_Spartan] font-medium text-[23.02px] text-black">R${item.preco}</span>
                                        <span className="font-[League_Spartan] font-medium text-[13.86px] text-[#C6E700]">{item.estoque}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
                    
            <div className="bg-[#F6F3E4]">
                <div className='w-full h-auto px-[115px]'>
                    <div className="w-full flex justify-between flex justify-between items-center">
                        <h1 className="font-league mt-[35px] font-medium text-[36.25px] text-black">Produtos<span className="font-[League_Spartan] font-medium text-[15.99px] leading-[100%] tracking-[0%]"> de rare beauty</span></h1>
                        <span className="font-league mt-[35px] font-medium text-[15.99px] text-[#6A38F3]">ver mais</span>
                    </div>
                    <Paginador produtos={produtos2}/>
                </div>
            </div>
        </div>
    )
};

export default Loja;