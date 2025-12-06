import { useState } from "react";

interface Props {
    onChange?: (valor: number) => void,
    valorInicial?: number;
}

export default function ClassificacaoEstrelas({ onChange, valorInicial = 0 }: Props) {
    const [classificacao, setClassificacao] = useState(valorInicial);
    const [hover, setHover] = useState(0);

    const preencher = (estrela: number) => {
        const val = hover || classificacao;

        if (val >= estrela) return "100%";       
        if (val >= estrela - 0.5) return "50%"; 
        return "0%";                         
    };

    const handleSetClassificacao = (valor:number) => {
        setClassificacao(valor);
        onChange?.(valor);
    };

    return (
        <div className="flex gap-1 items-center">
            <div
                className="cursor-pointer"
                onClick={() => setClassificacao(0)}
                onMouseEnter={() => setHover(0)}
            />

            {[1, 2, 3, 4, 5].map((estrela) => (
                <div
                    key={estrela}
                    className="relative w-[60px] h-[60px] cursor-pointer"
                    onClick={(e) => {
                        const { left, width } = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - left;

                        if (clickX < width / 2) handleSetClassificacao(estrela - 0.5);
                        else handleSetClassificacao(estrela);
                    }}
                    onMouseMove={(e) => {
                        const { left, width } = e.currentTarget.getBoundingClientRect();
                        const pos = e.clientX - left;

                        if (pos < width / 2) setHover(estrela - 0.5);
                        else setHover(estrela);
                    }}
                    onMouseLeave={() => setHover(0)}
                >
                    <svg
                        viewBox="0 0 138 132"
                        className="absolute inset-0 w-full h-full"
                        fill="none"
                        stroke="#8A38F5"
                    >
                        <path d="M64.2949 3.67493C65.6449 -0.558241 71.6343 -0.55824 72.9844 3.67493L85.5361 43.0421C86.2748 45.3588 88.4337 46.9266 90.8652 46.9132L132.184 46.6857C136.627 46.6612 138.478 52.3593 134.869 54.9513L101.308 79.0538C99.3329 80.4723 98.5084 83.0092 99.2725 85.3175L112.257 124.544C113.653 128.762 108.807 132.283 105.227 129.651L71.9326 105.181C69.9734 103.741 67.3059 103.741 65.3467 105.181L32.0527 129.651C28.4723 132.283 23.6262 128.762 25.0225 124.544L38.0068 85.3175C38.7709 83.0093 37.9464 80.4723 35.9717 79.0538L2.41016 54.9513C-1.19912 52.3593 0.652165 46.6612 5.0957 46.6857L46.4141 46.9132C48.8456 46.9266 51.0045 45.3588 51.7432 43.0421L64.2949 3.67493Z" />
                    </svg>

                    <svg
                        viewBox="0 0 138 132"
                        className="absolute inset-0 w-full h-full"
                        style={{
                            clipPath: `inset(0 ${100 - parseInt(preencher(estrela))}% 0 0)`,
                        }}
                        fill="#F5C200"
                        stroke="#8A38F5"
                    >
                        <path d="M64.2949 3.67493C65.6449 -0.558241 71.6343 -0.55824 72.9844 3.67493L85.5361 43.0421C86.2748 45.3588 88.4337 46.9266 90.8652 46.9132L132.184 46.6857C136.627 46.6612 138.478 52.3593 134.869 54.9513L101.308 79.0538C99.3329 80.4723 98.5084 83.0092 99.2725 85.3175L112.257 124.544C113.653 128.762 108.807 132.283 105.227 129.651L71.9326 105.181C69.9734 103.741 67.3059 103.741 65.3467 105.181L32.0527 129.651C28.4723 132.283 23.6262 128.762 25.0225 124.544L38.0068 85.3175C38.7709 83.0093 37.9464 80.4723 35.9717 79.0538L2.41016 54.9513C-1.19912 52.3593 0.652165 46.6612 5.0957 46.6857L46.4141 46.9132C48.8456 46.9266 51.0045 45.3588 51.7432 43.0421L64.2949 3.67493Z" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
