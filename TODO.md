
Backend

Frontend
	1. Definire interfaccia utente
		1. Prenotazioni
			1. Dettaglio click: visualizza dettagli/info, eliminazione, cambio data (opzionale)
		2. Spieggie 
			1. Dettaglio click: Selettore data inizio fine => Lista postazioni disponibile
				1. Crezione prenotazione
	2. Profilo utente

Backend definizione API/routing:
	1. /api/spiaggie
	2. /api/spiaggie/{id_spiaggia}/prenotazioni
	3. /api/spiaggie/{id_spiaggia}/prenotazioni/{id_prenotazione}
	4. /api/user-data
	5. /api/spiaggie/{id_spiaggia}/postazioni

Database
	1. Definire struttura dati
		1. Tabella prenotazioni
		2. Tabella postazioni
		3. Lista spiaggia

@Julian:
	1. Condivisione struttura tabella
	2. Ricerca template frontend (decidere se web o mobile)
	3. Adattamento e crezione template effettivo
	4. Implementazione login frontend in ts

@Leonid
	1. Definizione tabelle sql con ts
	2. Definizione swagger
	3. Implementazione logica backend

