'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import s from './HomePage.module.scss';
import { Header } from './Header';

export const HomePage: React.FC = () => {
    let router = useRouter();

    return <div className={s.page}>
        <Header title="Instrument Index" />

        <div className={s.scroll}>
            {/* ── the plate ─────────────────────────────────── */}
            <section className={s.hero}>
                <div className={s.heroRule} />
                <h1 className={s.heroTitle}>
                    An instrument for<br />
                    <em>looking inside</em> a thought
                </h1>
                <p className={s.heroLede}>
                    A working language model, cut open and set under glass. Every weight is
                    visible; every operation can be followed by eye, from the first token
                    embedding to the final logit.
                </p>
                <div className={s.heroRule} />
            </section>

            {/* ── the one project ───────────────────────────── */}
            <section className={s.projects}>
                <div className={s.sectionLabel}>The Instrument</div>

                <article className={s.card} onClick={() => router.push('/llm')}>
                    <div className={s.cardPlate}>
                        <img src="/images/llm-viz-screenshot2.png" alt="The transformer under observation" />
                        <div className={s.cardPlateSheen} />
                    </div>

                    <div className={s.cardBody}>
                        <h2 className={s.cardTitle}>
                            <Link href="/llm">NOOSCOPE — Transformer Observatory</Link>
                        </h2>
                        <p className={s.cardText}>
                            A real-time 3D rendering of a GPT-style network executing a forward
                            pass, running the actual weights in the browser. The geometry is the
                            computation: each cube is a number, each slab a tensor, each thread
                            of light a value moving through the model.
                        </p>
                        <div className={s.specs}>
                            <div className={s.spec}>
                                <span className={s.specKey}>Renderer</span>
                                <span className={s.specVal}>WebGL2, custom</span>
                            </div>
                            <div className={s.spec}>
                                <span className={s.specKey}>Inference</span>
                                <span className={s.specVal}>WASM + GPU</span>
                            </div>
                            <div className={s.spec}>
                                <span className={s.specKey}>Model</span>
                                <span className={s.specVal}>nano-GPT, sort task</span>
                            </div>
                        </div>
                        <div className={s.enter}>
                            <span>Enter the observatory</span>
                            <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden>
                                <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </article>
            </section>

            {/* ── colophon ──────────────────────────────────── */}
            <footer className={s.colophon}>
                <div className={s.heroRule} />
                <p>
                    Built as a study in making the invisible legible — the same instinct that
                    drives an oscilloscope, a cloud chamber, or an anatomical atlas.
                </p>
            </footer>
        </div>
    </div>;
};
