# Bloc 1 · Gestors de continguts: WordPress

**6 sessions · 18 hores · RA1**

## Què és un gestor de continguts

Un **gestor de continguts** (CMS, *Content Management System*) és una aplicació web que permet publicar i mantenir un lloc web sense escriure HTML. Separa tres coses:

- **El contingut**: el text, les imatges i els menús, guardats a la base de dades.
- **La presentació**: el *tema*, que decideix com es veu.
- **La funcionalitat extra**: els *mòduls* o *plugins* (un fòrum, un formulari de contacte, una botiga).

Així, la persona de màrqueting de Bytes del Clot pot publicar una oferta sense saber programar, i el tècnic pot canviar l'aspecte del web sense tocar els continguts.

| CMS | Llenguatge | On es fa servir |
|---|---|---|
| **WordPress** | PHP + MySQL | Webs corporatius i blogs. Prop del 40 % de tots els webs del món |
| Joomla | PHP + MySQL | Portals amb molts usuaris registrats |
| Drupal | PHP + MySQL | Administracions públiques i webs grans (gencat.cat en fa servir) |
| PrestaShop | PHP + MySQL | Botigues en línia |
| Wix, Squarespace | Tancats, al núvol | Petits negocis que no volen servidor |

Al curs fem servir WordPress perquè és el que més us trobareu a l'empresa.

## Requeriments

Abans d'instal·lar qualsevol aplicació, es consulten els requeriments a la documentació oficial: [WordPress Requirements](https://wordpress.org/about/requirements/). Per a WordPress són:

- PHP (versió recomanada a la pàgina oficial) amb les extensions `mysqli`, `curl`, `gd`, `mbstring`, `xml`, `zip`, `intl`.
- MySQL o MariaDB.
- Apache amb `mod_rewrite`, per tenir URL netes com `/ofertes/portatils` en lloc de `/?p=123`.
- HTTPS recomanat.

Al Bloc 0 ja vau instal·lar tot això, excepte `mod_rewrite`.

## Pràctica 1.1 · Instal·lar WordPress

### 1. La base de dades i el seu usuari

Cada aplicació té **la seva** base de dades i **el seu** usuari, que només té permisos sobre aquella base de dades. Si algú trenca el WordPress, no pot arribar a les dades del Moodle.

```bash
sudo mariadb
```

```sql
CREATE DATABASE wordpress CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'Posa-hi-una-contrasenya-llarga';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. El codi

```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar xzf latest.tar.gz
sudo mv wordpress /var/www/web
sudo chown -R www-data:www-data /var/www/web
```

`www-data` és l'usuari amb què s'executa Apache. Ha de ser el propietari dels fitxers perquè WordPress pugui pujar imatges i actualitzar-se.

### 3. El host virtual

```apache
# /etc/apache2/sites-available/web.conf
<VirtualHost *:80>
    ServerName web.bytes.local
    DocumentRoot /var/www/web
    <Directory /var/www/web>
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/web-error.log
    CustomLog ${APACHE_LOG_DIR}/web-access.log combined
</VirtualHost>
```

```bash
sudo a2enmod rewrite
sudo a2ensite web.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
```

`AllowOverride All` deixa que WordPress faci servir el seu fitxer `.htaccess` per a les URL netes.

### 4. L'instal·lador web

Obre `http://web.bytes.local` i completa l'assistent amb les dades de la base de dades del pas 1. Com a usuari administrador **no** facis servir `admin`: és el primer nom que proven els atacs automàtics.

Quan acabi, entra a l'escriptori (`/wp-admin`) i mira **Eines › Salut del lloc**. Hi ha d'haver poques advertències. Apunta les que surtin al quadern i resol les que puguis.

### 5. Estructura de directoris

Fes `ls -l /var/www/web` i identifica:

| Element | Què conté |
|---|---|
| `wp-config.php` | La configuració: dades de connexió a la base de dades i claus secretes |
| `wp-admin/`, `wp-includes/` | El nucli de WordPress. No es toca mai: les actualitzacions el sobreescriuen |
| `wp-content/themes/` | Els temes |
| `wp-content/plugins/` | Els plugins |
| `wp-content/uploads/` | Els fitxers pujats pels usuaris. **Entra a la còpia de seguretat** |

## Usuaris i rols

WordPress té cinc rols predefinits:

| Rol | Pot fer |
|---|---|
| Administrador | Tot: plugins, temes, usuaris, configuració |
| Editor | Publicar i editar qualsevol contingut, també el dels altres |
| Autor | Publicar i editar només el seu contingut |
| Col·laborador | Escriure, però no publicar: un editor ho ha de revisar |
| Subscriptor | Només llegir i editar el seu perfil |

**Principi del mínim privilegi:** a cada persona, el rol més baix que li permeti fer la seva feina.

### Pràctica 1.2 · Els treballadors de Bytes del Clot

1. Crea aquests usuaris amb el rol que els toca i justifica-ho al quadern:
   - **Marta Soler**, gerent: vol revisar-ho tot, però no toca la part tècnica.
   - **Jordi Puig**, màrqueting: publica les ofertes de cada setmana.
   - **Aina Ruiz**, tècnica en pràctiques: escriu articles de consells, però els ha de revisar algú.
   - **Clients** registrats: només comenten i participen al fòrum.
2. Crea l'estructura del web: pàgines *Inici*, *Qui som*, *Servei tècnic*, *Contacte*, i les categories d'entrades *Ofertes* i *Consells*.
3. Crea el **menú principal** amb aquestes pàgines i un submenú *Blog* amb les dues categories.
4. Entra com a Aina i comprova que **no** pot publicar. Entra com a Jordi i comprova que **no** pot instal·lar plugins. Fes-ne captures: són les teves **proves de funcionament**.

## Personalitzar la interfície

- **Temes:** *Aparença › Temes*. Instal·la'n un de lleuger (per exemple, Astra o GeneratePress) i configura'l des del *Personalitzador* o l'*Editor del lloc*: logotip, colors corporatius, tipografia, peu de pàgina.
- **Ginys** i **blocs**: barra lateral amb les últimes ofertes, cercador i horari de la botiga.
- **CSS addicional:** retocs petits sense modificar el tema. Per exemple, perquè els botons tinguin el color de l'empresa:

```css
.wp-block-button__link {
  background-color: #0d9488;
  border-radius: 8px;
}
```

> Mai no editis directament els fitxers d'un tema descarregat: la propera actualització esborra els canvis. Per a canvis grans es fa un **tema fill**.

## Mòduls i fòrums

Els plugins s'instal·len des de *Plugins › Afegeix*. Criteris per triar-ne un, perquè cada plugin és codi d'un tercer que s'executa al teu servidor:

- Darrera actualització recent (fa menys de 6 mesos).
- Moltes instal·lacions actives i bones valoracions.
- Compatible amb la teva versió de WordPress.

### Pràctica 1.3 · Fòrum de clients i sindicació

1. Instal·la **bbPress** i crea un fòrum *Suport als clients* amb dos subfòrums: *Ordinadors* i *Mòbils*.
2. **Regles d'accés:** els visitants llegeixen, però només els usuaris registrats escriuen. Els *Subscriptors* tenen el rol de fòrum *Participant*, i Aina és *Moderadora*.
3. Activa el **registre d'usuaris** a *Ajustos › General*, amb rol per defecte *Subscriptor*.
4. **Sindicació:** comprova que `http://web.bytes.local/category/ofertes/feed/` retorna el canal RSS de les ofertes i subscriu-t'hi amb un lector de RSS.
5. Proves de funcionament: registra un client nou, fes que publiqui un tema al fòrum i que Aina el moderi.

## Seguretat

WordPress és l'objectiu d'atacs automàtics constants pel simple fet de ser el més usat. Els mecanismes bàsics, sense necessitat de cap plugin:

| Mesura | Com |
|---|---|
| **Actualitzacions** | *Escriptori › Actualitzacions*. Nucli, plugins i temes. Activa les automàtiques per a les de seguretat. **Abans, còpia** |
| Esborrar el que no es fa servir | Plugins i temes desactivats també poden tenir vulnerabilitats |
| Contrasenyes | Les forces que proposa WordPress. Cap usuari `admin` |
| Permisos de fitxers | Carpetes `755`, fitxers `644`, `wp-config.php` a `640` |
| Editor de fitxers desactivat | A `wp-config.php`: `define('DISALLOW_FILE_EDIT', true);` |
| Limitar els intents d'inici de sessió | Plugin com *Limit Login Attempts Reloaded* o *Wordfence* |
| HTTPS | Amb un certificat. El veurem a Nextcloud, i es pot aplicar a tots els hosts virtuals |

## Còpies de seguretat

Una còpia de WordPress té dues parts: **la base de dades** i **els fitxers** (`wp-content` i `wp-config.php`).

### Pràctica 1.4 · Còpia i restauració manual

```bash
# Còpia: la base de dades i els fitxers, amb la data al nom
DATA=$(date +%F)
sudo mkdir -p /backup
sudo mariadb-dump wordpress | sudo tee /backup/web-$DATA.sql > /dev/null
sudo tar czf /backup/web-$DATA.tar.gz -C /var/www web
ls -lh /backup
```

Després, **trenca-ho**: esborra tres entrades, un usuari i una imatge de la biblioteca de mitjans. Restaura:

```bash
sudo mariadb wordpress < /backup/web-$DATA.sql          # la base de dades
sudo tar xzf /backup/web-$DATA.tar.gz -C /var/www       # els fitxers
```

Comprova que les entrades, l'usuari i la imatge han tornat. **Una còpia que no s'ha restaurat mai no és una còpia.**

Fes també una còpia amb un plugin (per exemple, *UpdraftPlus*) i compara les dues maneres al quadern.

## Pràctica avaluable PA1 · El web de Bytes del Clot

Lliura el web sencer, funcionant a `web.bytes.local`, i un informe en PDF que demostri cada criteri del RA1:

| Criteri | Evidència |
|---|---|
| Requeriments | Taula de requeriments i com els has comprovat (*Salut del lloc*) |
| Usuaris i rols | Taula d'usuaris amb el rol justificat, captures de les proves d'accés |
| Interfície | Tema configurat amb la imatge corporativa i CSS addicional |
| Mòduls i menús | Menú principal i submenú, ginys, plugins instal·lats amb el criteri d'elecció |
| Fòrums | Fòrum amb les regles d'accés funcionant |
| Seguretat | Les mesures aplicades, amb captura de cadascuna |
| Actualització | Una actualització feta (nucli o plugin), amb còpia prèvia |
| Còpies | Còpia i restauració demostrades |
| Proves de funcionament | Llista de proves i resultat |

## Per saber-ne més

- [WordPress: Roles and Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/)
- [Hardening WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/) · lectura en anglès del bloc
- [bbPress documentation](https://codex.bbpress.org/)
