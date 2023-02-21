
Frontend
	1. Definire interfaccia utente
		1. Prenotazioni
			1. Dettaglio click: visualizza dettagli/info, eliminazione, cambio data (opzionale)
		2. Spiaggie 
			1. Dettaglio click: Selettore data inizio fine => Lista postazioni disponibile
				1. Crezione prenotazione
	2. Profilo utente

Backend definizione API/routing:
	1. /api/beach
	2. /api/prenotazioni
	3. /api/beach/{id_spiaggia}/postazioni
	4. /api/user-data

Database
	1. Definire struttura dati
		1. Tabella prenotazioni
		2. Tabella postazioni
		3. Lista spiaggia

@Julian:
	1. Condivisione struttura tabella - DONE
	2. Ricerca template frontend (decidere se web o mobile)
	3. Adattamento e crezione template effettivo
	4. Implementazione login frontend in ts

@Leonid
	1. Definizione tabelle sql con ts - DONE
	2. Definizione swagger - 
	3. Implementazione logica backend
	4. Implementazione registrazione utente