"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft, Star } from "lucide-react"; 

// --- IMPORTS DOS ASSETS ---
import logo_small from "@/assets/logo_small.svg";
import bag from "@/assets/bag.svg";
import store from "@/assets/store.svg";
import profilePicture from "@/assets/profile_picture.svg"; 

import sofiaAvatar from "@/assets/sofia_avatar.png"; 
import mariaAvatar from "@/assets/maria_avatar.png"; 

// --- DEFINIÇÕES DE TIPAGEM E AVATARES ---
const avatarSofia: StaticImageData = sofiaAvatar;   
const avatarMaria: StaticImageData = mariaAvatar;   
const avatarSelena: StaticImageData = profilePicture; 

interface StarRatingProps {
  count: number;
}

const StarRating: React.FC<StarRatingProps> = ({ count }) => (
  <div className="flex space-x-1 items-center">
    {Array.from({ length: 5 }).map((_element: unknown, index) => ( 
      <Star
        key={index}
        className={`
          text-[#FFEB3A] 
          ${index < count ? 'fill-[#FFEB3A]' : 'fill-transparent stroke-gray-300'} 
          w-[34px] h-[34px]
        `}
      />
    ))}
  </div>
);


// --- COMPONENTE PRINCIPAL (VERSÃO DESLOGADA) ---
export default function ReviewPageDeslogado() {
  return (
    <div className="relative w-full min-h-screen bg-[#F6F3E4] overflow-x-hidden">
      
      {/* 1. NAVBAR DESLOGADA */}
      <header className="sticky top-0 z-10 w-full h-[92px] bg-black text-white flex items-center justify-between px-[5%]">
        
        {/* Logo STOCK.IO */}
        <div className="flex items-center">
          <Image
            src={logo_small}
            alt="Stock.io Logo"
            width={220}
            height={42}
          />
        </div>

        {/* Ícones e Botões (lado direito: Loja, Sacola, LOGIN, CADASTRE-SE) */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          
          {/* Ícones */}
          <div className="flex items-center space-x-6">
            <Image src={store} alt="Loja" width={38} height={38} className="cursor-pointer" />
            <Image src={bag} alt="Sacola" width={36} height={36} className="cursor-pointer" />
          </div>

          {/* LOGIN */}
          <button className="text-white font-semibold text-[17.58px] leading-4 text-center">
            LOGIN
          </button>

          {/* Botão CADASTRE-SE */}
          <button className="bg-[#6A38F3] rounded-[52.64px] px-6 py-3 flex items-center justify-center text-white font-semibold text-[17.58px] leading-4">
            CADASTRE-SE
          </button>
        </div>
      </header>
      
      {/* 2. FAIXA PRETA DA AVALIAÇÃO PRINCIPAL */}
      <section className="w-full min-h-[395px] bg-black text-[#F6F3E4] py-16 px-[5%]">
        
        {/* Container flex para o topo (Voltar, Avatar, Nome, Estrelas) */}
        <div className="flex items-start mb-8">
          
          {/* Setinha de voltar - */}
          <button 
            className="mt-6 border-[3px] border-[#F6F3E4] rounded p-1 mr-8 flex items-center justify-center cursor-pointer transition duration-150 hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Avatar, Nome e Hora */}
          <div className="flex items-center flex-grow">
            
            {/* Avatar Sofia */}
            <div className="w-[81px] h-[81px] rounded-full overflow-hidden bg-[#D9D9D9] mr-4 flex-shrink-0">
              <Image
                src={avatarSofia} 
                alt="Sofia Figueiredo"
                width={81}
                height={81}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Nome e Hora */}
            <div>
              <div className="flex items-end space-x-3">
                <h2 className="text-[39.35px] leading-none font-normal">
                  Sofia Figueiredo
                </h2>
                <span className="text-[22.94px] leading-none font-medium opacity-80 pb-1">
                  1h
                </span>
              </div>
            </div>
          </div>
          
          {/* Estrelas */}
          <div className="flex-shrink-0 mt-6">
             <StarRating count={5} />
          </div>
        </div>

        {/* Texto da avaliação principal */}
        <p className="text-[36.21px] leading-[1.2] font-extralight text-justify mx-auto max-w-[1212px]">
          Adorei o produto. Funcionou muito na minha pele. Estou muito contente
          e com toda certeza irei comprar mais produtos da marca. Que
          orgulhoooooooo! Arrasaram
        </p>
      </section>
      
      {/* 3. COMENTÁRIOS E RESPOSTAS */}
      <div className="px-[5%] pt-12 pb-12"> 
        
        {/* Coluna de Comentários com Linha Vertical */}
        <div className="flex">
          
          {/* Espaço para a Linha Vertical (Vector 155) */}
          <div className="relative pr-8">
            <div className="absolute left-1/2 top-0 h-full border-l border-black transform -translate-x-1/2" />
          </div>

          {/* Comentários (Maria e Selena) */}
          <div className="flex flex-col space-y-12 w-full">
            
            {/* COMENTÁRIO MARIA */}
            <div className="flex items-start">
              
              {/* Avatar Maria */}
              <div className="w-[63.63px] h-[63.63px] rounded-full overflow-hidden bg-gray-300 mr-4 flex-shrink-0">
                <Image
                  src={avatarMaria}
                  alt="Maria Santos"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Detalhes do Comentário Maria */}
              <div className="pt-2">
                
                {/* Nome e Hora */}
                <div className="flex items-end space-x-2 mb-1">
                  <h4 className="text-[30.91px] leading-none font-normal text-black">
                    Maria Santos
                  </h4>
                  <span className="text-[15.23px] leading-none font-medium text-black opacity-70 pb-0.5">
                    1h
                  </span>
                </div>
                
                {/* Texto Maria */}
                <p className="text-[27.13px] leading-[1.2] font-extralight text-justify text-black">
                  Amei muito também!
                </p>
              </div>
            </div>

            {/* COMENTÁRIO SELENA (Dona da Loja) */}
            <div className="flex items-start">
              
              {/* Avatar Selena */}
              <div className="w-[63.63px] h-[63.63px] rounded-full overflow-hidden bg-gray-300 mr-4 flex-shrink-0">
                <Image
                  src={avatarSelena}
                  alt="Selena Gomez"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Detalhes do Comentário Selena */}
              <div className="pt-2">
                
                {/* Nome e Hora */}
                <div className="flex items-end space-x-2 mb-1">
                  <h4 className="text-[30.91px] leading-none font-normal text-black">
                    Selena Gomez
                  </h4>
                  <span className="text-[15.23px] leading-none font-medium text-black opacity-70 pb-0.5">
                    1h
                  </span>
                </div>

                {/* Dona da Loja */}
                <span className="text-[13.04px] leading-none font-normal text-[#6A38F3] block mb-1">
                  dona da loja
                </span>
                
                {/* Texto Selena */}
                <p className="text-[27.13px] leading-[1.2] font-extralight text-justify text-black">
                  Muito obrigada pelo carinho! Nós da Rare Beauty ficamos felizes =)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}