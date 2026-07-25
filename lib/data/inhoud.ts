import type { Stap, Vraag } from "@/lib/types";

export const voordelen = [
  {
    titel: "Nederlandstalige begeleiding",
    beschrijving:
      "Van de eerste vraag tot de terugreis staat er een Nederlandstalige begeleider naast u die de rituelen stap voor stap uitlegt.",
    icoon: "begeleiding" as const,
  },
  {
    titel: "Hotels dicht bij de Haram",
    beschrijving:
      "Wij kiezen bewust hotels op korte loopafstand van de Masjid al-Haram en de Masjid an-Nabawi, zodat u weinig reistijd kwijt bent.",
    icoon: "hotel" as const,
  },
  {
    titel: "Duidelijke informatie vooraf",
    beschrijving:
      "U weet precies wat inbegrepen is en wat niet. Geen verborgen kosten en geen onduidelijke voorwaarden.",
    icoon: "document" as const,
  },
  {
    titel: "Persoonlijk contact",
    beschrijving:
      "Elke aanvraag wordt door een medewerker persoonlijk opgepakt. Geen callcenter en geen standaardantwoorden.",
    icoon: "contact" as const,
  },
  {
    titel: "Kleine groepen",
    beschrijving:
      "Wij werken met overzichtelijke groepen, zodat er aandacht is voor iedere reiziger en voor ieders tempo.",
    icoon: "groep" as const,
  },
  {
    titel: "Zorgvuldige voorbereiding",
    beschrijving:
      "Voor vertrek organiseren wij een informatiebijeenkomst over de rituelen, de reis en praktische zaken.",
    icoon: "voorbereiding" as const,
  },
];

export const stappen: Stap[] = [
  {
    nummer: "01",
    titel: "Kies een reis",
    beschrijving:
      "Bekijk onze Umrah-reizen en lees per pakket rustig door wat er inbegrepen is, wanneer u vertrekt en in welke hotels u verblijft.",
  },
  {
    nummer: "02",
    titel: "Vraag informatie aan",
    beschrijving:
      "Vul het aanvraagformulier in bij de reis van uw keuze. Dit is nog geen boeking en u zit nergens aan vast.",
  },
  {
    nummer: "03",
    titel: "Persoonlijk gesprek",
    beschrijving:
      "Wij nemen binnen twee werkdagen contact met u op via telefoon, WhatsApp of e-mail en bespreken uw wensen en vragen.",
  },
  {
    nummer: "04",
    titel: "Voorstel op maat",
    beschrijving:
      "U ontvangt een overzicht met de kamerindeling, de definitieve prijs en de voorwaarden, zodat u alles rustig kunt nalezen.",
  },
  {
    nummer: "05",
    titel: "Definitieve bevestiging",
    beschrijving:
      "Pas wanneer u schriftelijk akkoord geeft, leggen wij uw plaats vast. Daarna bespreken wij de betaling en de benodigde documenten.",
  },
  {
    nummer: "06",
    titel: "Voorbereiding en vertrek",
    beschrijving:
      "U wordt uitgenodigd voor de informatiebijeenkomst, ontvangt een reisdocument met alle gegevens en vertrekt met de groep.",
  },
];

export const veelgesteldeVragen: Vraag[] = [
  {
    vraag: "Kan ik via de website direct boeken of betalen?",
    antwoord:
      "Nee. Onze website is op dit moment informatief. U kunt per reis een aanvraag doen, waarna wij persoonlijk contact met u opnemen. Er wordt via de website niets afgerekend en er komt pas een boeking tot stand nadat u een voorstel van ons heeft ontvangen en daar schriftelijk akkoord op geeft.",
  },
  {
    vraag: "Wat gebeurt er nadat ik het aanvraagformulier heb ingevuld?",
    antwoord:
      "U ontvangt een bevestiging dat wij uw aanvraag hebben ontvangen. Vervolgens neemt een van onze medewerkers binnen twee werkdagen contact met u op om uw wensen door te nemen. Daarna sturen wij een voorstel met de definitieve prijs en de voorwaarden.",
  },
  {
    vraag: "Is de prijs vanaf de uiteindelijke prijs?",
    antwoord:
      "De vermelde prijs vanaf geldt per persoon en is gebaseerd op de voordeligste kamerindeling, meestal een vierpersoonskamer. Wilt u een twee- of driepersoonskamer, dan geldt een toeslag. In het persoonlijke voorstel staat altijd de exacte prijs die voor u geldt.",
  },
  {
    vraag: "Moet ik mijn paspoortgegevens invullen op de website?",
    antwoord:
      "Nee. Wij vragen via de website nooit om paspoortnummers, kopieën van identiteitsbewijzen of andere gevoelige documenten. Deze gegevens worden pas op een later moment en via een veilige weg opgevraagd, wanneer uw boeking definitief is.",
  },
  {
    vraag: "Is de Umrah-reis geschikt voor een eerste keer?",
    antwoord:
      "Ja. Een groot deel van onze reizigers gaat voor het eerst. De begeleiding legt de rituelen stap voor stap uit, in het Nederlands, en er is voor vertrek een informatiebijeenkomst waarin alles rustig wordt doorgenomen.",
  },
  {
    vraag: "Kan ik met mijn gezin of kinderen mee?",
    antwoord:
      "Dat kan. Bij verschillende reizen bieden wij familiekamers aan en houden wij rekening met een rustiger tempo. Geef in uw aanvraag door met hoeveel personen u wilt reizen en wat de leeftijden zijn, dan bespreken wij de mogelijkheden.",
  },
  {
    vraag: "Hoe wordt het visum geregeld?",
    antwoord:
      "Het Umrah-visum wordt door ons aangevraagd en is bij de reissom inbegrepen. Wij laten u tijdig weten welke gegevens en documenten daarvoor nodig zijn en hoe u deze veilig kunt aanleveren.",
  },
  {
    vraag: "Is een reisverzekering verplicht?",
    antwoord:
      "Een reis- en annuleringsverzekering is niet bij de reissom inbegrepen. Wij raden u sterk aan zelf een passende verzekering af te sluiten en adviseren u hier graag over.",
  },
  {
    vraag: "Wat als een reis vol is?",
    antwoord:
      "Wij plaatsen u dan op de wachtlijst en informeren u zodra er een plaats vrijkomt. Ook laten wij u weten wanneer een vergelijkbare reis in een andere periode wordt aangeboden.",
  },
  {
    vraag: "Hoe kan ik jullie het snelst bereiken?",
    antwoord:
      "Via WhatsApp krijgt u meestal binnen enkele uren antwoord tijdens onze openingstijden. U kunt ons ook bellen of een e-mail sturen; de gegevens vindt u op de contactpagina.",
  },
];

export const begeleidingPunten = [
  {
    titel: "Voor vertrek",
    beschrijving:
      "Een informatiebijeenkomst over de rituelen, de reis en praktische zaken zoals bagage, kleding en gezondheid. U ontvangt een duidelijk reisdocument met alle gegevens.",
  },
  {
    titel: "Tijdens de reis",
    beschrijving:
      "Nederlandstalige begeleiders reizen met de groep mee. Zij begeleiden de Umrah stap voor stap, verzorgen de ziyarah en zijn dag en nacht bereikbaar.",
  },
  {
    titel: "Voor broeders en zusters",
    beschrijving:
      "Bij onze reizen is er een vast aanspreekpunt voor de broeders en een aanspreekpunt voor de zusters, zodat iedereen zich op zijn gemak voelt.",
  },
  {
    titel: "Na de terugkeer",
    beschrijving:
      "Ook na de reis blijven wij bereikbaar voor vragen, en horen wij graag uw ervaringen zodat wij onze reizen blijven verbeteren.",
  },
];
