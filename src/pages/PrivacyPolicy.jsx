import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '8vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        textTransform: 'uppercase',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        color: 'var(--text-color)'
                    }}>
                        Privacy Policy & Bylaws
                    </h1>

                    <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        color: 'var(--text-color)',
                        marginBottom: '4rem'
                    }}>
                        {/* Section: Stadgar */}
                        <section style={{ marginBottom: '4rem' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-color)',
                                textTransform: 'uppercase'
                            }}>
                                STADGAR
                            </h2>
                            <p><strong>§ 1 NAMN OCH SÄTE</strong><br />Föreningens namn är Kulturföreningen Musikbopp (nedan kallad föreningen). Föreningen har sitt säte i Tyresö. Föreningen är ansluten till Svensk Live.</p>
                            <p><strong>§ 2 FORM OCH ORGANISATION</strong><br />Föreningen är en fristående partipolitiskt och religiöst obunden ideell förening.</p>
                            <p><strong>§ 3 ÄNDAMÅL</strong><br />Vi vill främja kreatörer inom utövandet av elektronisk musik samt främja dolda musikgenrer. Vi vill skapa en trygg gemenskap mellan ungdomar oavsett vem du är. Vår förening spelar kön, etnicitet och sexuell läggning ingen roll, alla är välkomna.</p>
                            <p><strong>§ 4 VERKSAMHETSÅR</strong><br />Föreningens verksamhetsår sammanfaller med kalenderår, 1 januari - 31 december.</p>
                            <p><strong>§ 5 MEDLEMSKAP</strong><br />Föreningen är öppen för alla som accepterar föreningens stadgar och årligen betalar medlemsavgift. Medlem har närvaro- och yttranderätt på alla föreningens möten.<br />Medlem som motarbetar föreningens målsättning eller bryter mot dessa stadgar kan uteslutas. För uteslutning krävs 3/4 majoritet på styrelsemöte. Utesluten medlem har rätt att överklaga uteslutning vid medlemsmöte, där den uteslutne även har rösträtt.</p>

                            <h3 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>§ 6 BESLUTANDE ORGAN</h3>
                            <p><strong>§ 6.1 ÅRSSTÄMMA</strong><br />FÖRENINGENS HÖGST BESLUTANDE ORGAN ÄR ÅRSSTÄMMA. ÅRSSTÄMMA SKA HÅLLAS SENAST 31 MARS.</p>
                            <p><strong>§ 6.2 EXTRA ÅRSSTÄMMA</strong><br />Extra årsstämma ska sammankallas om revisorer, styrelse eller minst 1/3 av föreningens medlemmar så kräver.</p>
                            <p><strong>§ 6.3 MEDLEMSMÖTE</strong><br />Medlemsmöte är föreningens näst högst beslutande organ. På medlemsmöte får ej beslut tas som strider mot beslut tagna vid årsstämma.</p>
                            <p><strong>§ 6.4 STYRELSEMÖTE</strong><br />Styrelse ansvarar för föreningens löpande frågor och är underordnad årsstämma och medlemsmöte.</p>

                            <p style={{ marginTop: '1rem' }}><em>(Fullständiga stadgar finns tillgängliga vid förfrågan)</em></p>
                        </section>

                        {/* Section: Data Handling */}
                        <section>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-color)',
                                textTransform: 'uppercase'
                            }}>
                                Hanteringen av dina uppgifter
                            </h2>
                            <p style={{ marginBottom: '1rem' }}>Den förening du nu blir medlem i ansvarar för att dina personuppgifter behandlas med noggrann försiktighet och att dessa inte lämnas vidare till annan part, utan ditt samtycke.</p>
                            <p style={{ marginBottom: '1rem' }}>Du lämnar nu dina personuppgifter i databasen eBas, som är ett rapportsystem för alla medlemsföreninger i riksförbundet Svensk Live. När du blir medlem i den här föreningen blir du även medlem i Svensk Live.</p>
                            <p style={{ marginBottom: '1rem' }}>Svensk Live följer Personuppgiftslagen och behandlar dina uppgifter med noggrann försiktighet. Dina personuppgifter lämnas aldrig ut till andra av Svensk Live.</p>
                            <p style={{ marginBottom: '1rem' }}>Svensk Live skickar kontinuerligt utskick till alla medlemmar i förbundet. Det kan även förekomma enkätundersökningar som du ombeds svara på. Uppgifterna används även som underlag vid statsbidragsansökan, distriktens landstingsbidragsansökningar och statistik.</p>
                            <p>Granskare från statlig myndighet eller region/landstingsförbund kan få möjlighet att granska personuppgifter från kansliet för Svensk Live, om deras arbete kräver det.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
