"use client";

import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import logo_small from "@/assets/logo_small.svg";
import bag from "@/assets/bag.svg";
import store from "@/assets/store.svg";
import person_active from "@/assets/person_active.svg";
import profilePicture from "@/assets/profile_picture.svg";
import mascote from "@/assets/mascote.png";

export default function AvaliacoesDeslogadoPixelPerfect() {
  const mainReview = {
    name: "Sofia Figueiredo",
    time: "1h",
    text:
      "Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram",
  };

  const replies = [
    {
      id: 1,
      name: "Maria Santos",
      time: "1h",
      text: "Amei muito também!",
      avatar: profilePicture,
      isOwner: false,
    },
    {
      id: 2,
      name: "Selena Gomez",
      time: "1h",
      text: "Muito obrigada pelo carinho! Nós da Rare Beauty ficamos felizes =)",
      avatar: profilePicture,
      isOwner: true,
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#F6F3E4]">
      {/* Root fixed-width canvas (pixel-perfect 1440px) */}
      <div
        className="relative bg-[#F6F3E4] shadow-none"
        style={{ width: 1440, minHeight: 1024 }}
      >
        {/* NAVBAR (fixed height 92px) */}
        <header
          className="absolute left-0 top-0"
          style={{ width: 1440, height: 92, background: "#000" }}
        >
          <div
            style={{ width: 1440, height: 92 }}
            className="relative px-[72px] flex items-center"
          >
            {/* Logo - left 5.06% of 1440 ≈ 72px (we use px padding) */}
            <div className="absolute left-[72px] top-[25px]">
              <Image src={logo_small} alt="Stock.io" width={220} height={42} />
            </div>

            {/* Icons and buttons on right (group positioned) */}
            <div className="absolute right-[72px] top-[20px] flex items-center gap-[30px]">
              <Image src={bag} alt="bag" width={36} height={36} />
              <Image src={store} alt="store" width={38} height={38} />
              <Image src={person_active} alt="person" width={36} height={36} />

              <button className="text-white font-semibold text-[17.5815px] leading-[16px]">
                LOGIN
              </button>

              <button className="bg-[#6A38F3] text-white font-semibold text-[17.5815px] leading-[16px] px-6 py-2 rounded-[52.64px]">
                CADASTRE-SE
              </button>
            </div>
          </div>
        </header>

        {/* BLACK HERO SECTION (height 395px) */}
        <section
          className="absolute left-0"
          style={{ width: 1440, height: 395, background: "#000", color: "#F6F3E4" }}
        >
          {/* Back button (absolute on hero) */}
          <button
            className="absolute"
            style={{
              left: 64,
              top: 169,
              border: "3px solid #F6F3E4",
              borderRadius: 6,
              padding: 6,
              background: "transparent",
            }}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-[18px] h-[25px] text-[#F6F3E4]" />
          </button>

          {/* Avatar + name */}
          <div
            className="absolute flex items-center"
            style={{ left: 114, top: 152 }}
          >
            <div
              style={{
                width: 81,
                height: 81,
                borderRadius: 9999,
                overflow: "hidden",
                background: "#D9D9D9",
              }}
            >
              <Image src={profilePicture} alt="Sofia" width={81} height={81} />
            </div>

            <div style={{ marginLeft: 14 }}>
              <h2
                style={{
                  fontSize: 39.3509,
                  lineHeight: "36px",
                  fontWeight: 400,
                  color: "#F6F3E4",
                }}
              >
                {mainReview.name}
              </h2>
              <div
                style={{
                  fontSize: 22.9422,
                  lineHeight: "21px",
                  fontWeight: 500,
                  color: "rgba(246,243,228,0.84)",
                }}
              >
                {mainReview.time}
              </div>
            </div>
          </div>

          {/* Stars (right side) */}
          <div
            className="absolute"
            style={{ left: 1154, top: 176, display: "flex", gap: 6 }}
          >
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className="w-[34.57px] h-[34.57px]"
                style={{ color: "#FFEB3A", fill: "#FFEB3A" }}
              />
            ))}
          </div>

          {/* Main review text */}
          <p
            style={{
              position: "absolute",
              left: 114,
              top: 263,
              width: 1212,
              fontSize: 36.2088,
              lineHeight: "33px",
              fontWeight: 200,
              color: "#F6F3E4",
              textAlign: "justify",
            }}
          >
            {mainReview.text}
          </p>
        </section>

        {/* Vertical divider line for comments (positioned below hero) */}
        <div
          style={{
            position: "absolute",
            left: 134,
            top: 506,
            height: 154,
            borderLeft: "1px solid #000",
          }}
        />

        {/* COMMENTS AREA (absolute positioning per mockup) */}
        <section style={{ position: "absolute", left: 0, top: 506, width: 1440 }}>
          {/* First reply */}
          <div style={{ position: "absolute", left: 194, top: 6, display: "flex", gap: 18, alignItems: "flex-start", width: 1200 }}>
            <div style={{ width: 63.63, height: 63.63, borderRadius: 9999, overflow: "hidden" }}>
              <Image src={profilePicture} alt="Maria" width={64} height={64} />
            </div>

            <div style={{ marginLeft: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <h4 style={{ fontSize: 30.9133, lineHeight: "28px", fontWeight: 400, color: "#000" }}>Maria Santos</h4>
                <span style={{ fontSize: 15.2321, lineHeight: "14px", color: "rgba(0,0,0,0.71)" }}>1h</span>
              </div>
              <p style={{ marginTop: 8, fontSize: 27.1277, lineHeight: "25px", fontWeight: 200, color: "#000", maxWidth: 1056, textAlign: "justify" }}>
                Amei muito também!
              </p>
            </div>
          </div>

          {/* Second reply (owner) */}
          <div style={{ position: "absolute", left: 194, top: 123, display: "flex", gap: 18, alignItems: "flex-start", width: 1200 }}>
            <div style={{ width: 63.63, height: 63.63, borderRadius: 9999, overflow: "hidden" }}>
              <Image src={profilePicture} alt="Selena" width={64} height={64} />
            </div>

            <div style={{ marginLeft: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <h4 style={{ fontSize: 30.9133, lineHeight: "28px", fontWeight: 400, color: "#000" }}>Selena Gomez</h4>
                <span style={{ fontSize: 15.2321, lineHeight: "14px", color: "rgba(0,0,0,0.71)" }}>1h</span>
              </div>

              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: 13.0435, lineHeight: "12px", color: "#6A38F3", display: "inline-block", marginBottom: 6 }}>
                  dona da loja
                </span>
              </div>

              <p style={{ marginTop: 6, fontSize: 27.1277, lineHeight: "25px", fontWeight: 200, color: "#000", maxWidth: 1056, textAlign: "justify" }}>
                Muito obrigada pelo carinho! Nós da Rare Beauty ficamos felizes =)
              </p>
            </div>
          </div>
        </section>

        {/* Mascote bottom-right (overlapping hero area like mockup) */}
        <div style={{ position: "absolute", right: 110, bottom: -80 }}>
          <Image src={mascote} alt="mascote" width={280} height={280} />
        </div>
      </div>
    </div>
  );
}
