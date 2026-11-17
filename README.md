# Inventario Mobili

Web app per il telefono: si fotografa un mobile, si inseriscono subito le misure, si assegna la stanza di destinazione e alla fine si esporta tutto in un file da analizzare sul computer.

## Funzioni
- **📷 Nuovo mobile**: apre direttamente la fotocamera; dopo lo scatto si apre la scheda con il cursore sulla larghezza.
- **Misure principali**: larghezza, profondità e altezza in cm (si accetta la virgola: `45,5`). Ingombro a pavimento (m²) e volume (m³) sono calcolati in automatico.
- **Misure aggiuntive**: l'app propone quelle tipiche della categoria scelta (ad es. per un armadio: ingombro ante, misure interne, n. ante). Se ne possono aggiungere altre 25 predefinite, oppure misure personalizzate.
- **Stanza di destinazione**, provenienza, quantità, materiale, finitura, condizioni e note.
- **Salva + nuovo 📷**: salva la scheda e riapre subito la fotocamera, per inventariare in fretta.
- **Stanze**: riepilogo con numero di pezzi, m² e m³ per ogni stanza.
- **Esporta**: un file `.zip` che contiene
  - `inventario.xlsx` con il foglio *Mobili* (una riga per mobile e una colonna per ogni misura, con filtri e collegamento alla foto), più i fogli *Per stanza* e *Per categoria*;
  - la cartella `foto/` con le foto chiamate `M001_nome_1.jpg`;
  - la cartella `foto_con_misure/`: le stesse foto, con una fascia in basso che riporta codice, nome, misure e stanza;
  - `catalogo.html`, da aprire nel browser per sfogliare le schede con le foto, raggruppate per stanza (si può anche stampare);
  - `backup/dati.json`: con questo file si può ripristinare tutto (*Esporta → Ripristina*).
  Ci sono anche le opzioni "solo Excel" e "solo CSV".
- Stanze e categorie si possono modificare dalla schermata *Esporta*.
- La scheda che si sta compilando viene salvata in automatico come bozza: se il telefono chiude il browser mentre la fotocamera è aperta, alla riapertura non si perde nulla.

## Dove stanno i dati
Tutto resta **sul telefono**, nella memoria del browser, e non c'è nessun server. L'app funziona anche senza connessione. Ci sono però due cose da sapere:
- Conviene **esportare spesso**: lo zip serve anche come backup.
- Su iPhone l'app va **aggiunta alla schermata Home**, altrimenti Safari può svuotarne la memoria dopo un periodo in cui non la si usa.

## Come metterla sul telefono
La fotocamera funziona solo da un indirizzo **https**. Ecco il modo più semplice, gratuito:

1. Vai su https://app.netlify.com/drop e trascina l'intera cartella `app_ma`. Ti verrà dato un indirizzo come `https://nome-a-caso.netlify.app`.
   (In alternativa puoi usare GitHub Pages.)
2. Apri quell'indirizzo sul telefono:
   - **iPhone (Safari)**: Condividi → *Aggiungi alla schermata Home*
   - **Android (Chrome)**: menu ⋮ → *Installa app* / *Aggiungi a schermata Home*
3. Da quel momento l'app si apre come una normale app, con la sua icona.

Quando aggiorni i file, l'app si aggiorna da sola alla riapertura successiva. Per forzare l'aggiornamento puoi cambiare il numero di versione in `sw.js` (`inventario-mobili-v1` → `v2`).

## Provarla sul computer
```
python -m http.server 8765
```
Poi apri http://localhost:8765. Sul PC il pulsante della fotocamera apre la scelta del file.

## File
- `index.html`: l'intera app (interfaccia, database, esportazione)
- `photo-worker.js`: elabora le foto in background, così l'interfaccia non si blocca
- `sw.js`, `manifest.webmanifest`, `icons/`: servono per funzionare offline e per l'installazione
- `vendor/`: SheetJS (per l'Excel) e JSZip (per lo zip), salvati in locale
