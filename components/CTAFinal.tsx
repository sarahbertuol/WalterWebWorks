"use client";

export default function CTAFinal() {
  return (
    <section
      id="contato"
      className="bg-pink px-5 py-20 text-center text-ink md:py-28"
    >
      <p className="mx-auto max-w-md font-display text-3xl font-bold leading-tight md:text-4xl">
        Bora tirar seu
        <br />
        site do papel?
      </p>
      <a
        href="https://wa.me/5551999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-medium text-cream transition hover:brightness-110"
      >
        Chamar no WhatsApp
      </a>
    </section>
  );
}
