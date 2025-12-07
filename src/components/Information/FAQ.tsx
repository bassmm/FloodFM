export const FAQ = () => {
  const faqs = [
    {
      question: "How often is the discharge data updated?",
      answer: "Data is refreshed every 6 hours from the Open-Meteo API, providing the latest river conditions and 30-day forecasts."
    },
    {
      question: "What does \"forecast\" mean in the discharge data?",
      answer: "Forecasts are predictions of future river discharge based on rainfall models, snowmelt projections, and upstream conditions. They help anticipate flood risks in advance."
    },
    {
      question: "Why do different villages have different threshold levels?",
      answer: "Thresholds are based on historical flood data, local geography, embankment capacity, and population vulnerability. These are customized per district."
    },
    {
      question: "What should I do if my village reaches Warning level?",
      answer: "Begin preparations: gather supplies, prepare evacuation routes, keep emergency contacts handy, and monitor forecasts daily for changes."
    }
  ];

  return (
    <div style={{ marginTop: '1rem' }}>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 600, margin: '0 0 0.5rem 0' }}>Q: {faq.question}</p>
          <p style={{ margin: '0.5rem 0 1rem 1rem', opacity: 0.9 }}>A: {faq.answer}</p>
        </div>
      ))}
    </div>
  );
};
