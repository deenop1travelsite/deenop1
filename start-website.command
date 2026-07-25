#!/bin/bash
# Start de website van Deen op 1 Travel.
# Dubbelklik dit bestand in Finder, of draai het met:  bash start-website.command
# Werkt de dubbelklik niet? Draai eenmalig:  chmod +x start-website.command

cd "$(dirname "$0")" || exit 1

echo "──────────────────────────────────────────────"
echo "  Deen op 1 Travel — website starten"
echo "──────────────────────────────────────────────"
echo

# 1. Is Node.js aanwezig en nieuw genoeg?
if ! command -v node > /dev/null 2>&1; then
  echo "Node.js is niet gevonden."
  echo "Installeer Node.js 18.18 of nieuwer via https://nodejs.org en start dit bestand opnieuw."
  echo
  read -r -p "Druk op Enter om te sluiten."
  exit 1
fi

NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "Node.js $(node -v) is te oud. Next.js 15 vereist Node.js 18.18 of nieuwer."
  echo
  read -r -p "Druk op Enter om te sluiten."
  exit 1
fi
echo "Node.js $(node -v) gevonden."
echo

# 2. Pakketten installeren of bijwerken.
# Dit draait altijd: zo worden ontbrekende pakketten (zoals resend) alsnog opgehaald.
# Is alles al aanwezig, dan is npm binnen enkele seconden klaar.
if [ ! -d node_modules ]; then
  echo "Pakketten installeren. Dit duurt de eerste keer één tot twee minuten…"
else
  echo "Pakketten controleren en zo nodig aanvullen…"
fi
echo

if ! npm install; then
  echo
  echo "Installeren is mislukt. Controleer uw internetverbinding en probeer het opnieuw."
  echo
  read -r -p "Druk op Enter om te sluiten."
  exit 1
fi
echo

# Controle: staat resend er nu echt?
if [ -d node_modules/resend ]; then
  echo "resend is geïnstalleerd (versie $(node -p "require('./node_modules/resend/package.json').version" 2>/dev/null))."
else
  echo "Let op: de map node_modules/resend ontbreekt nog. Draai handmatig:  npm install resend"
fi
echo

# 3. Browser openen zodra de server luistert
(
  for _ in $(seq 1 40); do
    if curl -s -o /dev/null "http://localhost:3000"; then
      command -v open > /dev/null 2>&1 && open "http://localhost:3000"
      break
    fi
    sleep 1
  done
) &

# 4. Ontwikkelserver starten
echo "De website start op:  http://localhost:3000"
echo "Stoppen? Druk in dit venster op Ctrl + C."
echo
npm run dev
