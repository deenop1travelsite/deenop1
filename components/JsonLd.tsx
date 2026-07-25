/**
 * Plaatst structured data (Schema.org) op de pagina.
 * De inhoud wordt op de server samengesteld en bevat geen invoer van bezoekers.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const lijst = Array.isArray(data) ? data : [data];

  return (
    <>
      {lijst.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Voorkomt dat een < of & in de gegevens het script kan afbreken.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
