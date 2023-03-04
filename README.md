# project-pawm
Repository for the "Progettazione di Applicazioni Web e Mobile" course of the University of Camerino

## Intro/Scenario
	//TODO descrizione
	Prenotazione ombrellone
### Funzinalità principali utente
	- Login
	- Selezione e visualizzazione spiagge
	- Prenotazione ombrellore
	- Gestione prenotazione
### Funzionalità principali gestore
	- Login
	- Creazione spiaggia
	- Specifica configurazioni prenotazione (numero massimo, costo, ecc)

@Julian
## Fronend
### Templete di grafica preso da:
	//TODO
	// Il primo che ho trovato: https://www.creative-tim.com/templates/angular-free

@Leonid
## Backend
### Tecnologie
	Il layer di backend è stato realizzato con l'utilizzo di due tecnologie principali:
	1.  NodeJs: questo semplice ma potente server web ci ha permesso di implementare la maggior parte della logica necessaria al funzionamento dell'applicativo. Al fine di implementare una solida modularità del codice sorgente, la strottura di quest ultimo è stata divista in cinque distinte categorie: 
    	1.  config: comprendente i file di configurazione, come, per esempio, i dati necessari per la connessione al database o il secret utilizzato per criptare la firma del jwt.
    	2.  controller: costituisce il nucleo della logica dove avvengono tutte le interazioni con il database
    	3.  middleware: è composto dalle logiche di controllo, come, per esempio, la verifica del token jwt o la verifica del ruolo di un utente
    	4.  models: contente i modelli delle tabelle utilizzati
    	5.  routes: tutte le rotte o path esposti dal web server
	2.  Sequalize: utilizzata per l'implementazione delle comunicazione con il database. Questa libreria Object-rational mapping ci ha permesso di astrarre e semplificare le varie query di lettura e scrittura su DB. Abbiamo preferito questo approccio, in contrasto con la scrittura manuale di query SQL, perché ritenuto dai membri del team come il più efficace e di semplice comprensione.
### Elenco API
	Segue una breve lista delle API esposte dal backend:
		1. POST /api/auth/signup: utilizzata per registrare un utente nel sistema, vengono specificati diversi dati dell'utente compresi i ruili posseduti.
		2. POST /api/auth/signin: utilizzata per eseguire una login del sistema, l'API restituisce un codice JWT da utilizzare per l'autenticazione.
		3. GET /api/user-data: API utilizzata per leggere le informazioni riguardanti gli utenti. 
		4. GET - POST /api/beach: API utilizzata per la lettura della lista spiagge, in POST per creare una nuova spiaggia, per eseguire quest'azione è necessario possedere il ruolo di amministratore.
		5. GET - DELETE /api/beach/{id}: utilizzata per leggere informazioni di una specifica spiaggia o cancellarne il record da DB.
		6. GET - POST /api/beach/{id}/locations: API utilizzata per la lettura della lista postazione, in POST per creare una nuova postazione, per eseguire quest'azione è necessario essere il creatore della spiggia.
		7. GET - DELETE /api/beach/{id}/locations/{id}: utilizzata per leggere informazioni di una specifica postazione o cancellarne il record da DB.
		8. GET - POST /api/reservation: API utilizzata per la lettura della lista prenotazioni, in POST per creare una nuova prenotazione.
		9. GET - DELETE /api/reservation/{id}: utilizzata per leggere informazioni di una specifica prenotazione o cancellarne il record da DB.
### Documentazione OpenAPI
	La documentazione delle API, utilizzata per gestire la comunicazine tra i vari membri del team, è stata realizzata utilizzando il linguaggio di documentazine delle OpenAPI Swagger.
	Oltre alla documentazione dettagliata è disponibile anche una collection postman, utilizzata per la verifica e l'interazione con il backend

@Leonid
## Database
### Tecnologie
	Il layer di backend è stato realizzato con l'utilizzo di due tecnologie principali:
	1. Mysql: il database utilizzato per il salvataggio dei dati 
	2. Docker: per semplificare l'installazione del database nella macchina di test, il team, ha deciso di installare il software in un container docker, partendo da un file docker compose.
### Strottura dati
	Lato database sino state create le seguenti tabelle: 
	- Table Postazioni: [ id (key) | numero di sdraie | costo | fk spiaggia ]
    	- Tabella utilizzata per lo storing le postazioni della spiaggia, ogni postazione è collegata ad una spiaggia con chiave.
	- Table Prenotazioni: id prenotazione (key) | id user | id ombrellone | data inizio prenotazione | data fine prenotazione
    	- Tabella utilizzata per lo storing delle prenotazioni, una prenotazione comprende un id prenotazione e un id utente per tracciare chi ha eseguito la prenotazione e per quale postazione.
	- Table Spiagge: [ id (key) | fk user gestore owner | nome ]
    	- Tabella utilizzata per lo storing delle spiagge
	- Table Profilo Utente: [ id (key) | username | email | password hash ]
    	- Tabella contente le informazioni utente

@Leonid
## Autenticazione
	L'autenticazione tra client e server avviene trami un codice JWT. L'api utilizzata per la generazione del codice è /api/auth/signup. Ad ogni chiamata del client verso una rotta lato backend il backend nodejs verifica la validità del codice utilizzando la libreria jsonwebtoken (utilizzata anche per la generazione del codice JWT). L'algoritmo per la firma del JWT e quindi per il criptaggio con chiave simmetrica dell'hash SHA256 è HS256.
	Il modulo utilizzato la generazione dell'utenza e del salvataggio della password hash nel database è auth.controller.
