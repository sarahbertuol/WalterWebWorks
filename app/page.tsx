"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroMain from "@/components/HeroMain";
import ComoFunciona from "@/components/ComoFunciona";
import Processo from "@/components/Processo";
import Servicos from "@/components/Servicos";
import QuemSomos from "@/components/QuemSomos";
import Sobre from "@/components/Sobre";
import Depoimentos from "@/components/Depoimentos";
import CTAFinal from "@/components/CTAFinal";
import OrcamentoModal from "@/components/OrcamentoModal";
import PortfolioModal from "@/components/PortfolioModal";

export default function Home() {
  const [orcamentoOpen, setOrcamentoOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <main>
      <Navbar onOpenOrcamento={() => setOrcamentoOpen(true)} />
      <HeroMain onOpenPortfolio={() => setPortfolioOpen(true)} />
      <ComoFunciona />
      <Processo />
      <Servicos />
      <QuemSomos />
      <Sobre />
      <Depoimentos />
      <CTAFinal />

      <OrcamentoModal
        open={orcamentoOpen}
        onClose={() => setOrcamentoOpen(false)}
      />
      <PortfolioModal
        open={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
      />
    </main>
  );
}
