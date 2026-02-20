"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import CoverScreen from "@/components/CoverScreen";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import CoupleSection from "@/components/CoupleSection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";
import WishesSection from "@/components/WishesSection";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import FloatingPetals from "@/components/FloatingPetals";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "";

  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [wishesRefresh, setWishesRefresh] = useState(0);

  const handleOpenCover = useCallback(() => {
    setIsCoverOpen(true);
    setIsMusicPlaying(true);
    document.body.classList.remove("cover-open");
  }, []);

  const handleRsvpSuccess = useCallback(() => {
    setWishesRefresh((prev) => prev + 1);
  }, []);

  // Lock body scroll when cover is showing
  if (typeof document !== "undefined") {
    if (!isCoverOpen) {
      document.body.classList.add("cover-open");
    }
  }

  return (
    <>
      {/* Cover Screen */}
      <CoverScreen
        guestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenCover}
      />

      {/* Floating Petals */}
      {isCoverOpen && <FloatingPetals />}

      {/* Music Toggle */}
      {isCoverOpen && (
        <MusicToggle
          isPlaying={isMusicPlaying}
          onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
        />
      )}

      {/* Main Content */}
      <main>
        {/* Sage top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--sage-muted), transparent)",
            opacity: 0.3,
          }}
        />

        <HeroSection />

        {/* Leaf divider */}
        <div className="leaf-divider">🌿</div>

        <QuoteSection />

        <div className="leaf-divider">🌿</div>

        <CoupleSection />

        <div className="leaf-divider">🌿</div>

        <EventSection />

        <div className="leaf-divider">🌿</div>

        <GallerySection />

        <div className="leaf-divider">🌿</div>

        <RsvpSection onSubmitSuccess={handleRsvpSuccess} />

        <div className="leaf-divider">🌿</div>

        <WishesSection refreshTrigger={wishesRefresh} />

        <div className="leaf-divider">🌿</div>

        <GiftSection />

        <div className="leaf-divider">🌿</div>

        <Footer />
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--cream)" }}
        >
          <div className="text-center">
            <div
              className="text-4xl mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--sage)",
              }}
            >
              ✿
            </div>
            <p className="text-warm-gray text-sm">Memuat undangan...</p>
          </div>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
