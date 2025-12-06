"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Star, Send } from "lucide-react"; 
import Header from "@/components/Header";
import { ProductReviewAPI, CommentAPI } from "@/services/api";
import { ProductReview, Comment } from "@/types";

// Default profile image
import profilePicture from "@/assets/profile_picture.svg"; 

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

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

export default function ReviewPageLogado() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('id');

  const [review, setReview] = useState<ProductReview | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      if (!reviewId) {
        setError('ID da avaliação não fornecido');
        setLoading(false);
        return;
      }

      try {
        const reviewData = await ProductReviewAPI.getReviewById(Number(reviewId));
        setReview(reviewData);

        const commentsData = await CommentAPI.getCommentsByReviewId(Number(reviewId));
        setComments(commentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar avaliação');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !review) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Você precisa estar logado para comentar');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      setSubmitting(true);
      const newCommentData = await CommentAPI.createComment({
        usuarioId: userId,
        avaliacaoProdutoId: review.id,
        conteudo: newComment,
      });

      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao enviar comentário');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
        <Header />
        <p className="text-2xl">Carregando avaliação...</p>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
        <Header />
        <p className="text-2xl text-red-600">{error || 'Avaliação não encontrada'}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#F6F3E4] overflow-x-hidden">
      <Header />
      
      {/* FAIXA PRETA DA AVALIAÇÃO PRINCIPAL */}
      <section className="w-full min-h-[395px] bg-black text-[#F6F3E4] py-16 px-[5%]">
        <div className="flex items-start mb-8">
          {/* Botão Voltar */}
          <button 
            onClick={() => router.back()}
            className="mt-6 border-[3px] border-[#F6F3E4] rounded p-1 mr-8 flex items-center justify-center cursor-pointer transition duration-150 hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Avatar, Nome e Hora */}
          <div className="flex items-center flex-grow">
            <div className="w-[81px] h-[81px] rounded-full overflow-hidden bg-[#D9D9D9] mr-4 flex-shrink-0">
              {review.usuario?.foto_perfil_url ? (
                <img
                  src={review.usuario.foto_perfil_url}
                  alt={review.usuario?.nome || 'Usuário'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={profilePicture}
                  alt={review.usuario?.nome || 'Usuário'}
                  width={81}
                  height={81}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            
            <div>
              <div className="flex items-end space-x-3">
                <h2 className="text-[39.35px] leading-none font-normal">
                  {review.usuario?.nome || 'Usuário'}
                </h2>
                <span className="text-[22.94px] leading-none font-medium opacity-80 pb-1">
                  {formatTimeAgo(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Estrelas */}
          <div className="flex-shrink-0 mt-6">
            <StarRating count={review.nota} />
          </div>
        </div>

        {/* Texto da avaliação */}
        <p className="text-[36.21px] leading-[1.2] font-extralight text-justify mx-auto max-w-[1212px]">
          {review.comentario || 'Sem comentário'}
        </p>
      </section>
      
      {/* COMENTÁRIOS E RESPOSTAS */}
      <div className="px-[5%] pt-12 pb-24"> 
        <div className="flex">
          {/* Linha Vertical */}
          <div className="relative pr-8">
            <div className="absolute left-1/2 top-0 h-full border-l border-black transform -translate-x-1/2" />
          </div>

          {/* Lista de Comentários */}
          <div className="flex flex-col space-y-12 w-full">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start">
                  <div className="w-[63.63px] h-[63.63px] rounded-full overflow-hidden bg-gray-300 mr-4 flex-shrink-0">
                    {comment.usuario?.foto_perfil_url ? (
                      <img
                        src={comment.usuario.foto_perfil_url}
                        alt={comment.usuario?.nome || 'Usuário'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={profilePicture}
                        alt={comment.usuario?.nome || 'Usuário'}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>

                  <div className="pt-2">
                    <div className="flex items-end space-x-2 mb-1">
                      <h4 className="text-[30.91px] leading-none font-normal text-black">
                        {comment.usuario?.nome || 'Usuário'}
                      </h4>
                      <span className="text-[15.23px] leading-none font-medium text-black opacity-70 pb-0.5">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-[27.13px] leading-[1.2] font-extralight text-justify text-black">
                      {comment.conteudo}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Nenhum comentário ainda</p>
            )}
          </div>
        </div>
      </div>
      
      {/* CAMPO ADICIONAR COMENTÁRIO (FIXO NO RODAPÉ) */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-[#F6F3E4] z-10">
        <form onSubmit={handleSubmitComment} className="relative w-full max-w-[1170px] mx-auto h-[77px] bg-white rounded-[110px] flex items-center px-8 shadow-lg">
          <input
            type="text"
            placeholder="Adicionar comentário"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
            className="flex-grow bg-transparent text-black placeholder:text-black placeholder:opacity-30 text-[26.82px] leading-[25px] font-light outline-none"
            style={{ width: 'calc(100% - 70px)' }}
          />
          
          <button 
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="flex-shrink-0 w-[34px] h-[34px] ml-4 text-black opacity-43 transition hover:opacity-100 disabled:opacity-20"
          >
            <Send className="w-full h-full fill-current" />
          </button>
        </form>
      </div>
    </div>
  );
}