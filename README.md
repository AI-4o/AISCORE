#  AISCORE360

Pronostici calcio, dirette live, statistiche partite e calciatori, forum per confronto su partite.

## TODO SPRINT

### TASK GIORGIO
- [x] skeleton table
- [ ] layout table  => fare in modo che la stella a sx degli accordion compaia dentro la parte chiara (sul modello di diretta.it). La parte Chiuara deve occupare l'intera riga (vedere diretta.it)
- [x] responsiveness navbar
- [ ] modale dettaglio partita
      - [ ] banner
        - [ ] spazio tra i punteggi: in -:- le - sono troppo appiccicate a :
        - [ ] sistemare layout stemmi: sembra che alcuni siano schiacciati nella direzione orizzontale; poi migliorare padding dello stemma dentro il rettangolo
        - [ ] aggiungere la città della squadra sotto il suo nome
- [ ] statistiche iniettare dati da api, + layout sistemare: 
      - [] nomi statistiche e valori in grassetto
      - [] estendere le barre degli input range a occupare spazio orizzontale in modo più estetico
      - [] rendere percentuali i seguenti campi: 
      — [] possesso palla
      — [] percentuale passaggi
      - [] vedere se ci sono altre statistiche nell’API
      - [] per navbar, mobile si vedono le voci “pronistici”, “forum”, e le altre nel menu a tendina
- [ ] sistemare layout && responsiveness formazioni
- [ ] pagina squadra
---

### TASK ALFREDO

- [ ] PARTITE LIVE
      - [ ] !! pulsante LIVE (come in diretta) illuminato se la partita sta venendo giocata
      - [ ] tasto LIVE a livello della toolbar che permette di selezionare le partite live
      - [ ] fix: capire come mai certe partite dei giorni passati non mostarno i risultati, come se dovessere ancora essere giocate…
      - []  vedere tempo che passa
  
Partendo dalla modale dettaglio partita:
- [ ] la pagina (creare) della squadra
- [ ] la pagina (creare) della lega
- [ ] al click su un giocatore nella sezione "formazioni", si apre la pagina (creare) del giocatore

---

### Backlog
- [ ] tabella dirette dare priorità: prima assoluta coppa italia, champions league, europa league
- [x] predisporre modale ad accogliere più views
- [] caching su redis 
- [ ] sistemare immagini su [bunny.net](https://bunny.net)
      - [ ] caching degli url delle immagini su redis ? 
- [ ] nella tabella feature: filtraggio per lega
- [ ] PARTITA LIVE
  - [ ]  suoni → aggiungere suono quando viene fatto goal (come in diretta, quando finisce partita fare suono fischio 
  - [ ]  quando sta per esserci un  goal mostrare scritta goal e illuminare la riga