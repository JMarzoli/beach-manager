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
		1. POST /api/auth/signup: 
		2. POST /api/auth/signin:
		3. GET /api/user-data: 
		4. GET - POST /api/beach:
		5. GET - DELETE /api/beach/{id}:
		6. GET - POST /api/beach/{id}/locations:
		7. GET - DELETE /api/beach/{id}/locations/{id}:
		8. GET - POST /api/reservation:
		9. GET - DELETE /api/reservation/{id}:
### Documentazione OpenAPI
	La documentazione delle API, utilizzata per gestire la comunicazine tra i vari membri del team, è stata realizzata utilizzando il linguaggio di documentazine delle OpenAPI Swagger.
	Oltre alla documentazione dettagliata è disponibile anche una collection postman, utilizzata per la verifica e l'interazione con il backend

@Leonid
## Database
### Tecnologie
	Il layer di backend è stato realizzato con l'utilizzo di due tecnologie principali:
	1. docker-compose: 
	2. Mysql: 
### Strottura dati
	Lato database sino state create le seguenti tabelle: 
	- Table Postazioni (Postazioni): [ id (key) | numero di sdraie | costo | fk spiaggia ]
	- Table Prenotazioni: id prenotazione (key) | id user | id ombrellone | data inizio prenotazione | data fine prenotazione
	- Table Spiagge: [ id (key) | fk user gestore owner ]
	- Table Profilo Utente: [ id (key) | username | email | password hash ]

@Leonid
## Autenticazione
	L'autenticazione tra client e server avviene trami un codice JWT. L'api utilizzata per la generazione del codice è /api/auth/signup. Ad ogni chiamata del client verso una rotta lato backend il backend nodejs verifica la validità del codice utilizzando la libreria jsonwebtoken (utilizzata anche per la generazione del codice JWT). L'algoritmo per la firma del JWT e quindi per il criptaggio con chiave simmetrica dell'hash SHA256 è HS256.
