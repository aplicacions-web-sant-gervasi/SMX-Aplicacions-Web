# Recursos

## Programari

| Eina | Per a què | Enllaç |
|---|---|---|
| VirtualBox | Màquina virtual del servidor | [virtualbox.org](https://www.virtualbox.org) |
| Ubuntu Server 24.04 LTS | Sistema operatiu del servidor | [ubuntu.com/download/server](https://ubuntu.com/download/server) |
| XAMPP | LAMP a Windows | [apachefriends.org](https://www.apachefriends.org) |
| WordPress | Gestor de continguts | [wordpress.org/download](https://wordpress.org/download/) |
| Moodle | Gestió de l'aprenentatge | [download.moodle.org](https://download.moodle.org) |
| Nextcloud | Gestió d'arxius, ofimàtica i calendari | [nextcloud.com/install](https://nextcloud.com/install/) |
| Roundcube | Correu web | [roundcube.net/download](https://roundcube.net/download/) |
| DAVx⁵ | Sincronitzar el calendari a Android | [davx5.com](https://www.davx5.com) |

## Documentació oficial (en anglès)

- [Apache HTTP Server 2.4](https://httpd.apache.org/docs/2.4/)
- [MariaDB Knowledge Base](https://mariadb.com/kb/en/)
- [WordPress Advanced Administration](https://developer.wordpress.org/advanced-administration/)
- [Moodle docs](https://docs.moodle.org/en/Main_page)
- [Nextcloud Admin Manual](https://docs.nextcloud.com/server/latest/admin_manual/)
- [Roundcube wiki](https://github.com/roundcube/roundcubemail/wiki)

## Xuleta de terminal

| Ordre | Què fa |
|---|---|
| `sudo systemctl status\|restart\|reload apache2` | Estat, reinici o recàrrega d'Apache |
| `sudo apache2ctl configtest` | Comprova la configuració abans de recarregar |
| `sudo a2ensite nom.conf` / `a2dissite` | Activa o desactiva un host virtual |
| `sudo a2enmod rewrite` | Activa un mòdul d'Apache |
| `sudo tail -f /var/log/apache2/error.log` | Mira els errors en directe. **La primera cosa a fer quan alguna cosa falla** |
| `sudo mariadb` | Consola de MariaDB com a root |
| `SHOW DATABASES;` · `SELECT user,host FROM mysql.user;` | Llista bases de dades i usuaris |
| `sudo mariadb-dump BD > copia.sql` | Còpia d'una base de dades |
| `sudo mariadb BD < copia.sql` | Restauració |
| `sudo chown -R www-data:www-data DIR` | Fa Apache propietari d'un directori |
| `df -h` · `free -h` · `du -sh DIR` | Espai de disc, memòria i mida d'un directori |

## Quan alguna cosa no funciona

1. **Mira el registre d'errors** d'Apache, o el del host virtual: `/var/log/apache2/NOM-error.log`.
2. **Pàgina en blanc o error 500:** gairebé sempre és PHP. Mira el registre i comprova que tens totes les extensions.
3. **«Error establishing a database connection»:** usuari, contrasenya o nom de la base de dades malament al fitxer de configuració. Prova'ls a mà: `mariadb -u wp_user -p wordpress`.
4. **403 Forbidden:** permisos de fitxers o el bloc `<Directory>` del host virtual.
5. **Surt la pàgina per defecte d'Apache:** el nom no coincideix amb cap `ServerName`, o no has fet `a2ensite` i `reload`.
6. **No puc pujar fitxers grans:** `upload_max_filesize` i `post_max_size` del `php.ini`.
7. Si res no funciona: **torna a la instantània** i repeteix els passos un per un, apuntant-los.
