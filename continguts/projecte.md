# Projecte: la intranet de Bytes del Clot

El projecte no és una feina a part: és el **servidor que heu anat construint bloc a bloc**. A la darrera sessió (S22) el presenteu sencer, funcionant, i el defenseu davant del professor com si fos el client.

## Què s'ha de veure funcionant

| Servei | Adreça | Mínim per aprovar |
|---|---|---|
| Web corporativa | `web.bytes.local` | Tema corporatiu, menús, rols, fòrum amb regles d'accés, horari incrustat des del calendari |
| Campus de formació | `campus.bytes.local` | Curs d'acollida amb activitats, usuaris del CSV, còpia restaurable |
| Núvol d'arxius | `https://nuvol.bytes.local` | Carpetes de grup amb permisos, 2FA a direcció |
| Ofimàtica web | dins del núvol | Documents editables per grups |
| Correu web | `correu.bytes.local` | Correu entre dos usuaris |
| Calendari | dins del núvol | Calendari compartit sincronitzat amb un mòbil |

## El pla de còpies

Lliureu un document d'una pàgina amb el **pla de còpies de seguretat** de tota la intranet: què es copia de cada servei (base de dades, codi, dades), cada quan, on es guarda i com es restaura. Opcionalment, un script que ho faci tot, programat amb `cron`:

```bash
#!/bin/bash
# /usr/local/bin/copia-intranet.sh
DATA=$(date +%F)
DESTI=/backup/$DATA
mkdir -p "$DESTI"
for BD in wordpress moodle nextcloud roundcube; do
  mariadb-dump "$BD" > "$DESTI/$BD.sql"
done
tar czf "$DESTI/fitxers.tar.gz" /var/www /var/moodledata /var/nc-data
# Esborra les còpies de fa més de 7 dies
find /backup -mindepth 1 -maxdepth 1 -type d -mtime +7 -exec rm -rf {} +
```

## La defensa (15 minuts)

1. **Demostració (5 min).** Un recorregut com a usuari de l'empresa: entra a la web, al campus, obre un document al núvol, envia un correu, crea una cita.
2. **Preguntes del client (10 min).** El professor fa de gerent de Bytes del Clot i us demana canvis i explicacions en directe. Per exemple:
   - *En Jordi se'n va de l'empresa. Què has de fer a cada servei?*
   - *Ahir algú va esborrar la carpeta de factures. Recupera-la.*
   - *Per què el navegador diu que la connexió al núvol no és segura?*
   - *Ensenya'm on és guardat físicament el PDF que he pujat al campus.*

La defensa compta com a part de la prova pràctica de cada RA, i també serveix per recuperar-ne.

## La vostra màquina virtual

Al final del curs, exporteu la màquina virtual (*Fitxer › Exporta un servei virtualitzat*, format `.ova`) i guardeu-la. És la vostra intranet de mostra per a les entrevistes de feina i per a l'estada a l'empresa.
