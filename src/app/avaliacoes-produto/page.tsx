"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Send, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import ClassificacaoEstrelas from "@/components/ClassificacaoEstrelas";
import { ProductReviewAPI, CommentAPI } from "@/services/api";
import { ProductReview, Comment } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import profilePicture from "@/assets/userimage.avif";

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
          ${index < count ? "fill-[#FFEB3A]" : "fill-transparent stroke-gray-300"}
          w-[24px] h-[24px]
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

export default function AvaliacoesProdutoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { isAuthenticated, user } = useAuth();

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [reviewComments, setReviewComments] = useState<Record<number, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [submittingComment, setSubmittingComment] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [newReview, setNewReview] = useState<{ nota: number; texto: string }>({ nota: 0, texto: "" });

  const fetchReviews = async () => {
    if (!productId) {
      setError("ID do produto não fornecido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await ProductReviewAPI.getReviewsByProductId(Number(productId));
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar avaliações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const loadCommentsForReview = async (reviewId: number) => {
    try {
      const comments = await CommentAPI.getCommentsByReviewId(reviewId);
      setReviewComments((prev) => ({ ...prev, [reviewId]: comments }));
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  const handleToggleComments = async (reviewId: number) => {
    if (expandedReviewId === reviewId) {
      setExpandedReviewId(null);
    } else {
      setExpandedReviewId(reviewId);
      if (!reviewComments[reviewId]) {
        await loadCommentsForReview(reviewId);
      }
    }
  };

  const handleSubmitComment = async (reviewId: number) => {
    const comment = newComment[reviewId]?.trim();
    if (!comment || !user?.id) return;

    try {
      setSubmittingComment(reviewId);
      const newCommentData = await CommentAPI.createComment({
        usuarioId: user.id,
        avaliacaoProdutoId: reviewId,
        conteudo: comment,
      });

      setReviewComments((prev) => ({
        ...prev,
        [reviewId]: [...(prev[reviewId] || []), newCommentData],
      }));

      setNewComment((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao enviar comentário");
    } finally {
      setSubmittingComment(null);
    }
  };

  const handleCreateReview = async () => {
    if (!user?.id || !productId) {
      setCreateError("Você precisa estar logado para avaliar");
      return;
    }

    if (newReview.nota === 0) {
      setCreateError("Por favor, selecione uma nota");
      return;
    }

    try {
      setCreateLoading(true);
      setCreateError(null);

      await ProductReviewAPI.createReview({
        usuarioId: user.id,
        produtoId: Number(productId),
        nota: newReview.nota,
        comentario: newReview.texto.trim() || undefined,
      });

      setIsCreateModalOpen(false);
      setNewReview({ nota: 0, texto: "" });
      await fetchReviews();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Erro ao criar avaliação");
    } finally {
      setCreateLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.nota, 0) / reviews.length).toFixed(2)
    : "0.00";

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
        <Header />
        <p className="text-2xl">Carregando avaliações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
        <Header />
        <p className="text-2xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#F6F3E4] overflow-x-hidden">
        <Header />

      {/* Header Section */}
      <section className="w-full bg-black text-[#F6F3E4] py-16 px-[5%]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="border-[3px] border-[#F6F3E4] rounded p-1 mr-8 flex items-center justify-center cursor-pointer transition duration-150 hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[48px] font-normal">Avaliações do Produto</h1>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-[#6A38F3] hover:bg-[#5B2FE8] px-6 py-3 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Criar Avaliação</span>
            </button>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-[76px] font-normal">{averageRating}</h2>
          <p className="text-[24px] font-light mt-2">{reviews.length} avaliações</p>
        </div>
      </section>

      {/* Reviews List */}
      <div className="px-[5%] py-12">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-[31.34px] p-8 shadow-md">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="w-[81px] h-[81px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                    {review.usuario?.foto_perfil_url ? (
                      <img
                        src={review.usuario.foto_perfil_url}
                        alt={review.usuario?.nome || "Usuário"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={profilePicture}
                        alt={review.usuario?.nome || "Usuário"}
                        width={81}
                        height={81}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[32px] font-normal text-black">
                          {review.usuario?.nome || "Usuário"}
                        </h3>
                        <span className="text-[18px] text-gray-500">
                          {formatTimeAgo(review.createdAt)}
                        </span>
                      </div>
                      <StarRating count={review.nota} />
                    </div>

                    <p className="text-[24px] font-light text-black leading-relaxed mb-4">
                      {review.comentario || "Sem comentário"}
                    </p>

                    {/* Comments Toggle */}
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleComments(review.id)}
                        className="text-[#6A38F3] hover:text-[#5B2FE8] font-medium text-[18px]"
                      >
                        {expandedReviewId === review.id ? "Ocultar comentários" : "Ver comentários"}
                      </button>
                    )}

                    {/* Comments Section */}
                    {expandedReviewId === review.id && (
                      <div className="mt-6 pl-8 border-l-2 border-gray-200">
                        {/* Comments List */}
                        {reviewComments[review.id]?.length > 0 && (
                          <div className="space-y-4 mb-4">
                            {reviewComments[review.id].map((comment) => (
                              <div key={comment.id} className="flex gap-4">
                                <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                  {comment.usuario?.foto_perfil_url ? (
                                    <img
                                      src={comment.usuario.foto_perfil_url}
                                      alt={comment.usuario?.nome || "Usuário"}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Image
                                      src={profilePicture}
                                      alt={comment.usuario?.nome || "Usuário"}
                                      width={48}
                                      height={48}
                                      className="object-cover w-full h-full"
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-[18px]">
                                      {comment.usuario?.nome || "Usuário"}
                                    </span>
                                    <span className="text-gray-500 text-[14px]">
                                      {formatTimeAgo(comment.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-[16px] text-black mt-1">
                                    {comment.conteudo}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment Form */}
                        {isAuthenticated && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmitComment(review.id);
                            }}
                            className="flex gap-3"
                          >
                            <input
                              type="text"
                              placeholder="Adicionar comentário..."
                              value={newComment[review.id] || ""}
                              onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
                              disabled={submittingComment === review.id}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6A38F3]"
                            />
                            <button
                              type="submit"
                              disabled={!newComment[review.id]?.trim() || submittingComment === review.id}
                              className="p-2 bg-[#6A38F3] hover:bg-[#5B2FE8] disabled:bg-gray-400 text-white rounded-full transition-colors"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[32px] text-gray-500">Nenhuma avaliação disponível ainda</p>
            <p className="text-[20px] text-gray-400 mt-4">Seja o primeiro a avaliar este produto!</p>
          </div>
        )}
      </div>

      {/* Close main wrapper */}
      </div>

      {/* Create Review Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <div>
          <h1 className="font-extralight text-[black] text-[40px]">
            Você está avaliando este produto
          </h1>

          {createError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded mt-4">
              {createError}
            </div>
          )}

          <div className="flex flex-col items-center mt-4">
            <ClassificacaoEstrelas
              onChange={(valor: number) => setNewReview((prev) => ({ ...prev, nota: valor }))}
            />
            <textarea
              value={newReview.texto}
              onChange={(e) => setNewReview((prev) => ({ ...prev, texto: e.target.value }))}
              placeholder="Avaliação do produto"
              disabled={createLoading}
              className="w-full h-[260px] mt-4 rounded-[20px] bg-white font-light text-[18px] text-[#00000082] p-4 resize-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleCreateReview}
              disabled={createLoading}
              className="w-[300px] h-[48px] bg-[#6A38F3] hover:bg-[#5B2FE8] disabled:bg-gray-400 mt-6 text-white font-medium text-[18px] rounded-full transition-colors"
            >
              {createLoading ? "Enviando..." : "Avaliar"}
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </>
  );
}
