# Bloc 3 · Gestió d'arxius web: Nextcloud

**3 sessions · 9 hores · RA3**

## Per a què serveix un gestor d'arxius web

A Bytes del Clot, avui els documents van per correu i en un pendrive que es passen d'un ordinador a l'altre. Un **gestor d'arxius web** és una carpeta compartida a la qual s'accedeix des del navegador, des del mòbil o sincronitzada a l'ordinador, i que soluciona això:

- Un sol lloc per als fitxers, accessible des de qualsevol lloc.
- **Permisos**: qui veu i qui edita cada carpeta.
- **Versions**: es pot tornar a la versió d'ahir d'un document.
- **Enllaços per compartir** amb clients, amb contrasenya i caducitat.
- Les dades queden **al vostre servidor**, no al d'una empresa estrangera. Això importa per al RGPD.

| Aplicació | Tipus | Comentari |
|---|---|---|
| **Nextcloud** | Lliure, PHP, autoallotjat | El més complet: arxius, calendari, ofimàtica, xat |
| ownCloud | Lliure / comercial | L'origen de Nextcloud |
| Seafile | Lliure, autoallotjat | Molt ràpid sincronitzant |
| Google Drive, OneDrive, Dropbox | Al núvol, tancats | Còmodes, però les dades no són vostres |
| FileBrowser, h5ai | Lliures, senzills | Només navegar i descarregar fitxers d'un directori |

## Pràctica 3.1 · Instal·lar Nextcloud

Requeriments: [Nextcloud System requirements](https://docs.nextcloud.com/server/latest/admin_manual/installation/system_requirements.html).

```bash
sudo apt install -y php-gd php-mysql php-curl php-mbstring php-intl php-gmp \
  php-bcmath php-xml php-zip php-imagick php-apcu
```

```sql
CREATE DATABASE nextcloud CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'nc_user'@'localhost' IDENTIFIED BY 'Contrasenya-llarga-3';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nc_user'@'localhost';
FLUSH PRIVILEGES;
```

```bash
cd /tmp
wget https://download.nextcloud.com/server/releases/latest.zip
unzip -q latest.zip
sudo mv nextcloud /var/www/nuvol
sudo mkdir /var/nc-data
sudo chown -R www-data:www-data /var/www/nuvol /var/nc-data
```

Igual que amb `moodledata`: les dades, **fora** del directori web.

```apache
# /etc/apache2/sites-available/nuvol.conf
<VirtualHost *:80>
    ServerName nuvol.bytes.local
    DocumentRoot /var/www/nuvol
    <Directory /var/www/nuvol>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
    </Directory>
</VirtualHost>
```

```bash
sudo a2enmod rewrite headers env dir mime
sudo a2ensite nuvol.conf && sudo systemctl reload apache2
```

Obre `http://nuvol.bytes.local`, crea l'administrador, indica `/var/nc-data` com a carpeta de dades i la base de dades. Després, a *Configuració d'administració › Visió general*, revisa els **avisos de seguretat i configuració** i resol-ne tants com puguis. Per a les tasques en segon pla, configura el cron igual que a Moodle:

```text
*/5 * * * * php -f /var/www/nuvol/cron.php
```

## HTTPS

Fins ara tot anava per HTTP: les contrasenyes viatgen en clar per la xarxa. Per a un núvol d'arxius no és acceptable. A la xarxa local farem servir un **certificat autosignat**. A Internet seria un de Let's Encrypt, amb `certbot`.

```bash
sudo a2enmod ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nuvol.key -out /etc/ssl/certs/nuvol.crt \
  -subj "/CN=nuvol.bytes.local"
```

Afegeix un segon `VirtualHost *:443` amb `SSLEngine on`, `SSLCertificateFile` i `SSLCertificateKeyFile`. Al de 80, posa `Redirect permanent / https://nuvol.bytes.local/`. El navegador avisarà que el certificat no és de confiança: explica per què al quadern.

## Usuaris, grups i permisos

| Concepte | A Nextcloud |
|---|---|
| Grups | *Botiga*, *Servei tècnic*, *Oficina*, *Direcció* |
| Quota | Espai màxim per usuari (5 GB els treballadors, 20 GB direcció) |
| Administrador de grup | Un usuari que pot gestionar els membres d'un grup sense ser administrador |
| Compartició | Amb usuaris, amb grups o amb un enllaç públic |
| Permisos de compartició | Llegir, editar, crear, esborrar, tornar a compartir |
| Carpetes de grup | App *Team folders*: carpetes que són del grup, no d'una persona |

### Pràctica 3.2 · L'organització dels arxius

1. Crea els 4 grups i els 12 usuaris amb la seva quota. Fes-ho almenys una vegada per la línia d'ordres amb `occ`, l'eina d'administració de Nextcloud:

```bash
cd /var/www/nuvol
sudo -u www-data php occ group:add "Servei tecnic"
sudo -u www-data OC_PASS='Canvia-la-1!' php occ user:add --password-from-env \
  --display-name="Aina Ruiz" --group="Servei tecnic" aruiz
sudo -u www-data php occ user:setting aruiz files quota "5 GB"
```

2. Crea aquesta estructura de carpetes de grup i aplica-hi els permisos:

| Carpeta | Llegir | Editar |
|---|---|---|
| `Comú` | Tothom | Tothom |
| `Servei tècnic/Manuals` | Tothom | Servei tècnic |
| `Oficina/Factures` | Oficina, Direcció | Oficina |
| `Direcció` | Direcció | Direcció |

3. Comparteix un pressupost amb un client per **enllaç públic** amb contrasenya i data de caducitat.
4. **Proves:** entra com un usuari de la Botiga i comprova que no veu `Factures`; puja un fitxer que superi la quota i mira què passa.

## Informació addicional i indexació

Els criteris 6 i 7 del RA3 demanen fer servir informació addicional sobre els arxius i criteris d'indexació. A Nextcloud això són:

- **Etiquetes col·laboratives** (*tags*): marca les factures com a *Pendent*, *Pagada*, *Reclamada*.
- **Comentaris** i **descripció** a cada fitxer i carpeta (fitxers `README.md` que Nextcloud mostra a dalt de la carpeta).
- **Favorits** i **versions**.
- **Cerca**: per nom, per etiqueta, per tipus. Amb l'app *Full text search* (i un motor com Elasticsearch) també es busca dins del contingut dels documents.
- Un **criteri de noms**: `AAAA-MM-DD_client_concepte.pdf`. Fa que l'ordre alfabètic sigui també cronològic.

### Pràctica 3.3 · Posar ordre

Puja 20 fitxers de prova a `Oficina/Factures`, reanomena'ls amb el criteri de noms, etiqueta'ls, posa un `README.md` a la carpeta explicant el criteri i troba totes les factures *Pendent* d'un client concret amb la cerca.

## Seguretat del gestor d'arxius

| Mesura | On |
|---|---|
| HTTPS obligatori | Apache |
| Doble factor (2FA) | App *Two-Factor TOTP*. Obligatori per al grup Direcció |
| Política de contrasenyes | *Seguretat* a la configuració d'administració |
| Protecció contra força bruta | Integrada. Prova-la equivocant-te 5 vegades |
| Registre d'activitat i d'auditoria | App *Activity*, i *Auditing / Logging* |
| Xifratge al servidor | *Seguretat › Xifratge al costat del servidor*. Pensa bé si l'actives: si es perden les claus, es perden les dades |
| Antivirus | App *Antivirus for files* amb ClamAV |
| Escaneig extern | [scan.nextcloud.com](https://scan.nextcloud.com), si el servidor fos públic |

## Pràctica avaluable PA3 · El núvol de Bytes del Clot

Nextcloud funcionant a `https://nuvol.bytes.local` i informe amb:

| Criteri | Evidència |
|---|---|
| Utilitat i aplicacions | Comparativa de 4 gestors d'arxius i per què tries Nextcloud per a Bytes del Clot |
| Instal·lació i adaptació | Instal·lació sense avisos crítics, HTTPS, logotip i colors |
| Comptes i permisos | Taula d'usuaris, grups i quotes; matriu de permisos amb proves |
| Arxius i directoris | Estructura de carpetes de grup |
| Informació addicional i indexació | Etiquetes, comentaris, README, criteri de noms, cerca |
| Seguretat | 2FA, força bruta, registre d'activitat, decisió raonada sobre el xifratge |

## Per saber-ne més

- [Nextcloud Admin Manual](https://docs.nextcloud.com/server/latest/admin_manual/) · lectura en anglès del bloc: *Hardening and security guidance*
- [Nextcloud occ command](https://docs.nextcloud.com/server/latest/admin_manual/occ_command.html)
