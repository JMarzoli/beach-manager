# project-pawm
Repository for the "Progettazione di Applicazioni Web e Mobile" course of the University of Camerino

## Intro/Scenario
Il sistema rappresenta una versione molto basilare di un gestionale per gestori e clienti di chalet di mare. Il sistema viene usato dai gestori per registrate le spiagge di loro proprietà e dai clienti per poter effettuare prenotazione nelle spiagge presenti nel sistema.
### Funzinalità principali utente
- Registrazione e Login
- Visualizzare l'elenco delle spiagge presenti nel sistema
- Visualizzare l'elenco delle postazioni prenotabili di un determinata spiaggia
- Effettuare un prenotazione di una postazione di una determinata spiaggia, per un determinato lasso di tempo 
- Accedere alla propria area personale, dove l'utente potrà visualizzare le sue prenotazioni
- Eliminare una prenotazione 
### Funzionalità principali gestore
- Registrazione e Login
- Accedere alla propria pagina di amministrazione
- Visualizzare l'elenco delle proprie spiagge presenti nel sistema
- Aggiungere una nuova spiaggia nel sistema
- Eliminare una spiaggia di sua proprietà dal sistema
- Visualizzare l'elenco di postazioni prenotabili presenti nel sistema
- Aggiungere una postazione ad una spiaggia
- Eliminare un postazione da una spiaggia
- Specifica configurazioni prenotazione (numero massimo, costo, ecc)

## Frontend
### Tecnologie
1. Angular - il frontend è stato costruito usando questo framework open source. La scelta di utilizzare proprio questo strumento è stata fatta dopo aver considerato che, per il tipo di applicazione, la scelta più consona era una single-page application. Angular inoltre ci ha assicurato che l'applicazione fosse visualizzabile anche da browser mobile come smartphone e tablet, questo perché il framework è detto responsiveness, cioè il design del sito web si addetta alle dimensioni dello schermo del dispositivo.
2. Argon Design System - per riuscire ad avere una estetica più piacevole e uniforme delle varie pagine è stato usato un template basato su:
	- Bootstrap 4
	- JQuery - libreria JavaScript
	- Open Sans Font - una typeface open source
La documentazione del template è presente al link: "https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html". 
Le pagine dell'applicazione sono state disegnate in html utilizzando gli stili e gli elementi messi a disposizione dal template. 
### Elenco routes
Le ruotes per muoversi attraverso le varie pagine dell'applicazione sono: 
- /signup : pagina di registrazione dove è possibile scegliere se registrarsi come cliente o gestore
- /login : pagina di login dove posso autenticarsi sia clienti che gestori
- /dashboard : pagina in cui un utente può vedere la lista delle prenotazioni che ha effettuato ed eliminarle
- /admin : pagine in cui un gestore può visualizzare le proprie spiagge, aggiungerne o eliminarne, le postazioni associate ad ogni spiaggia e ha la possibilità di aggiungerne delle nuove o eliminare quelle già presenti. 
- /beaches : pagina in cui è possibile visualizzare le spiagge presenti nel sistema ed effettuare una prenotazione ad una di essa

## Backend
### Tecnologie
Il layer di backend è stato realizzato con l'utilizzo di due tecnologie principali:
1.  NodeJs: questo semplice ma potente server web ci ha permesso di implementare la maggior parte della logica necessaria al funzionamento dell'applicativo. Al fine di implementare una solida modularità del codice sorgente, la struttura di quest’ultimo è stata divista in cinque distinte categorie: 
    1.  config: comprendente i file di configurazione, come, per esempio, i dati necessari per la connessione al database o il secret utilizzato per criptare la firma del jwt.
    2.  controller: costituisce il nucleo della logica dove avvengono tutte le interazioni con il database
    3.  middleware: è composto dalle logiche di controllo, come, per esempio, la verifica del token jwt o la verifica del ruolo di un utente
    4.  models: contente i modelli delle tabelle utilizzati
    5.  routes: tutte le rotte o path esposti dal web server
	2.  Sequalize: utilizzata per l'implementazione delle comunicazione con il database. Questa libreria Object-rational mapping ci ha permesso di astrarre e semplificare le varie query di lettura e scrittura su DB. Abbiamo preferito questo approccio, in contrasto con la scrittura manuale di query SQL, perché ritenuto dai membri del team come il più efficace e di semplice comprensione.

### Elenco API
Segue una breve lista delle API esposte dal backend:
1. POST /api/auth/signup: utilizzata per registrare un utente nel sistema, vengono specificati diversi dati dell'utente compresi i ruoli posseduti.
2. POST /api/auth/signin: utilizzata per eseguire una login del sistema, l'API restituisce un codice JWT da utilizzare per l'autenticazione.
3. GET /api/user-data: API utilizzata per leggere le informazioni riguardanti gli utenti. 
4. GET - POST /api/beach: API utilizzata per la lettura della lista spiagge, in POST per creare una nuova spiaggia, per eseguire quest'azione è necessario possedere il ruolo di amministratore.
5. GET - DELETE /api/beach/{id}: utilizzata per leggere informazioni di una specifica spiaggia o cancellarne il record da DB.
6. GET - POST /api/beach/{id}/locations: API utilizzata per la lettura della lista postazione, in POST per creare una nuova postazione, per eseguire quest'azione è necessario essere il creatore della spiaggia.
7. GET - DELETE /api/beach/{id}/locations/{id}: utilizzata per leggere informazioni di una specifica postazione o cancellarne il record da DB.
8. GET - POST /api/reservation: API utilizzata per la lettura della lista prenotazioni, in POST per creare una nuova prenotazione.
9. GET - DELETE /api/reservation/{id}: utilizzata per leggere informazioni di una specifica prenotazione o cancellarne il record da DB.
### Documentazione OpenAPI
La documentazione delle API, utilizzata per gestire la comunicazione tra i vari membri del team, è stata realizzata utilizzando il linguaggio di documentazine delle OpenAPI Swagger.
Oltre alla documentazione dettagliata è disponibile anche una collection postman, utilizzata per la verifica e l'interazione con il backend

## Database
### Tecnologie
Il layer di backend è stato realizzato con l'utilizzo di due tecnologie principali:
1. Mysql: il database utilizzato per il salvataggio dei dati 
2. Docker: per semplificare l'installazione del database nella macchina di test, il team, ha deciso di installare il software in un container docker, partendo da un file docker compose.
### Struttura  dati
Lato database sino state create le seguenti tabelle: 
- Table Postazioni: [ id (key) | numero di sdraie | costo | fk spiaggia ]
    - Tabella utilizzata per lo storing le postazioni della spiaggia, ogni postazione è collegata ad una spiaggia con chiave.
- Table Prenotazioni: id prenotazione (key) | id user | id ombrellone | data inizio prenotazione | data fine prenotazione
    - Tabella utilizzata per lo storing delle prenotazioni, una prenotazione comprende un id prenotazione e un id utente per tracciare chi ha eseguito la prenotazione e per quale postazione.
- Table Spiagge: [ id (key) | fk user gestore owner | nome ]
    - Tabella utilizzata per lo storing delle spiagge
- Table Profilo Utente: [ id (key) | username | email | password hash ]
    - Tabella contente le informazioni utente

## Autenticazione
### Processo
L'autenticazione tra client e server avviene trami un codice JWT. L'api utilizzata per la generazione del codice è /api/auth/signup. Ad ogni chiamata del client verso una rotta lato backend il backend nodejs verifica la validità del codice utilizzando la libreria jsonwebtoken (utilizzata anche per la generazione del codice JWT). L'algoritmo per la firma del JWT e quindi per il criptaggio con chiave simmetrica dell'hash SHA256 è HS256.
Il modulo utilizzato la generazione dell'utenza e del salvataggio della password hash nel database è auth.controller.
Lato frontend quando si effettua l'operazione di login, viene recuperato dalla risposta http il token generato. Ci si avvale poi del LocalStorage, ovvero di una memoria del browser del client, per poter salvare questo token. Si è poi definito un servizio interceptor, implmentando l'intefaccia HttpInterceptor messa a disposizione dal modulo @angular/common/http, che intercetta ogni richiesta http effettuata al backend e inietta nell'header della richiesta il token di autenticazione. In questo modo una volta che un utente ha effettuato l'autenticazione, esso sarà in grado di muoversi liberamente ed utilizzare i servizi desiderati. 

##CORS
###Proxy
Per ovviare alle problematiche di violazione del CORS è stato implmentato un proxy. Questo proxy è stato istruito a reindirizzare tutte le chiamate che il frontend effettuta verso se stesso al backend. Questo viene fatto tramite un file di congifiguarazione del proxy che specifica il path e l'url di reindirizzamento. 

