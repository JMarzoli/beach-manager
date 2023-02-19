# project-pawm
Repository for the "Progettazione di Applicazioni Web e Mobile" course of the University of Camerino

## Intro/Scenario
	//TODO descrizione
	Prenotazione ombrellone
### Funzinalità principali utente
	- Login
	- Selezione e visualizzazione spiaggie
	- Prenotazione ombrellore
	- Gestione prenotazione
### Funzionalità principali gestore
	- Login
	- Creazione spiaggia
	- Specifica configurazioni prenotazione (numero massimo, costo, ecc)
### Funzionalità extra (se avanza tempo)
	//TODO

## Fronend
### Templete di grafica preso da:
	//TODO
	// Il primo che ho trovato: https://www.creative-tim.com/templates/angular-free

## Backend
	//TODO
	//elenco API
	//teconologia utilizzata

## Autenticazione
	//TODO

## Database
	//TODO
	Abbozzo struttura tabelle: 
	- Table Ombrelloni (Postazioni): 
		id ombrellone (key) | numero di sdraie | costo | id spiaggia

	- Table Prenotazioni: 
		id prenotazione (key) | id user | id ombrellone | data inizio prenotazione | data fine prenotazione

	- Table Spiaggie: 
		id spiaggia (key) | id user gestore owner 

	- Table Profilo Utente: 
		id user (key) | nome | cognome | data registrazione | email | password hash
