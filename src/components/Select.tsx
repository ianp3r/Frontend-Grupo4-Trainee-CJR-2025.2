import { useState, useEffect } from "react";
import Image from "next/image";
import seta_baixo from '@/assets/seta-baixo.svg';
import seta_cima from '@/assets/seta-cima.svg';

interface Props {
    opcoes: string[];
    onSelect?: (item: string) => void;
    nome: string;
    valorInicial?: string | null;
}

const Select = ({ opcoes, onSelect, nome, valorInicial = null }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(valorInicial);

    useEffect(() => {
        setSelectedItem(valorInicial);
    }, [valorInicial]);

    return (
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className={`
                    bg-[white] flex items-center justify-between w-full h-[65px] mt-[30px]
                    rounded-t-[33px] ${isOpen ? '' : 'rounded-b-[33px]'}
                    font-light text-[25px] font-[League_Spartan] text-[#00000082] p-6
                `}
            >
                <span>{selectedItem || nome}</span>
                {isOpen ? (
                    <Image src={seta_cima} alt="fechar" />
                ) : (
                    <Image src={seta_baixo} alt="abrir" />
                )}
            </div>

            <ul
                className={`
                    bg-[white] flex flex-col rounded-b-[33px] p-6 pt-0 gap-1
                    transition-all duration-300 overflow-hidden
                    ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                {opcoes.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            setSelectedItem(item);
                            onSelect?.(item);
                            setIsOpen(false);
                        }}
                        className="flex items-center font-[League_Spartan] text-[#6A38F3] font-light text-[20.73px] cursor-pointer"
                    >
                        <div className="w-6 h-6 rounded-full border-[1px] border-[#6A38F3] flex items-center justify-center">
                            {selectedItem === item && (
                                <div className="w-4 h-4 bg-[#6A38F3] rounded-full"></div>
                            )}
                        </div>
                        <span className="ml-[5px]">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
