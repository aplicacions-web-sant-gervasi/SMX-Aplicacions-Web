# Bloc 4 · Ofimàtica web

**2 sessions · 6 hores · RA4**

## Què és l'ofimàtica web

Les aplicacions d'ofimàtica de tota la vida (Word, Excel, LibreOffice) s'instal·len a cada ordinador i cada persona treballa amb la seva còpia del fitxer. Les d'**ofimàtica web** s'executen al servidor i s'obren al navegador. El canvi important no és on s'executen, sinó que **diverses persones poden editar el mateix document alhora**.

| Avantatges | Inconvenients |
|---|---|
| No cal instal·lar res a cada equip | Sense xarxa, sense documents (o amb mode fora de línia limitat) |
| Una sola versió del document, sempre l'última | Menys funcions avançades que l'escriptori |
| Edició simultània i comentaris | Les macros i plantilles complexes poden fallar |
| Historial de versions automàtic | Si és al núvol d'un altre, les dades no són vostres |

| Aplicació | Tipus | Inclou |
|---|---|---|
| Google Docs / Sheets / Slides | Al núvol, tancat | Text, full de càlcul, presentacions, formularis |
| Microsoft 365 (Word, Excel en línia) | Al núvol, tancat | El paquet Office al navegador |
| **Collabora Online** | Lliure, autoallotjat | LibreOffice al navegador. És el que porta **Nextcloud Office** |
| OnlyOffice Docs | Lliure / comercial, autoallotjat | Molt compatible amb els formats de Microsoft |
| CryptPad | Lliure, xifrat | Documents xifrats d'extrem a extrem |

## Pràctica 4.1 · Nextcloud Office

Collabora necessita un servidor propi (CODE, *Collabora Online Development Edition*). Per a una oficina petita com Bytes del Clot n'hi ha prou amb el **servidor integrat**, que s'instal·la com una app més de Nextcloud.

1. A *Aplicacions › Office & text*, instal·la **Nextcloud Office** i **Collabora Online - Built-in CODE Server**. Tarda: baixa uns 300 MB.
2. A *Configuració d'administració › Nextcloud Office*, tria *Utilitza el servidor CODE integrat*.
3. Obre `Comú` i crea un document de text, un full de càlcul i una presentació. S'han d'obrir dins del navegador.

Si el servidor integrat falla (per exemple, per arquitectura o memòria), la documentació de Nextcloud explica com muntar CODE en un contenidor Docker. Comenta-ho amb el professor abans de fer-ho.

> Instal·la també **OnlyOffice** en una instantània a part de la màquina virtual i compara'ls: format per defecte, compatibilitat amb un `.docx` complex que et passarà el professor, consum de memòria (`free -h` abans i després).

## Comptes i seguretat en l'accés

A *Configuració d'administració › Nextcloud Office*:

- **Limita l'edició a grups**: només *Oficina* i *Direcció* poden editar fulls de càlcul. La resta, només veure'ls.
- **Llista blanca de WOPI**: només el propi servidor pot fer servir el motor d'ofimàtica.
- **Marca d'aigua** als documents compartits per enllaç públic.
- Els permisos de compartició del Bloc 3 continuen manant: algú amb permís de lectura obrirà el document en mode lectura.

## Prestacions de cada aplicació

Documenta al quadern què ofereix cada aplicació, provant-ho de veritat:

| Aplicació | Prova |
|---|---|
| Processador de textos | Estils, taula de continguts, control de canvis, exportar a PDF |
| Full de càlcul | Fórmules, format condicional, gràfic, filtre, protecció de cel·les |
| Presentacions | Plantilla, transicions, mode presentació |
| Formularis (app *Forms*) | Enquesta de satisfacció de clients, resultats exportats a full de càlcul |

## Treball col·laboratiu

### Pràctica 4.2 · Tres persones, un document

Feu-ho en grups de 3, cadascú amb un usuari diferent al servidor d'un de vosaltres:

1. Obriu alhora el full de càlcul `Inventari magatzem.ods` i ompliu-lo a la vegada. Fixeu-vos en els cursors de colors.
2. Deixeu **comentaris** i **mencions** (`@aruiz`) i comproveu que arriba la notificació.
3. Activeu el **control de canvis** a un document de text i accepteu-ne o rebutgeu-ne els canvis.
4. Torneu a una **versió anterior** des del panell de versions.
5. Compartiu el document amb un client per enllaç **només de lectura** i comproveu que no pot editar.

## Pràctica avaluable PA4

Informe amb:

| Criteri | Evidència |
|---|---|
| Utilitat | Avantatges i inconvenients per a Bytes del Clot |
| Aplicacions | Comparativa Google, Microsoft 365, Collabora, OnlyOffice |
| Instal·lació | Nextcloud Office funcionant, amb captures |
| Comptes d'usuari | Edició limitada per grups |
| Seguretat en l'accés | Llista blanca, marca d'aigua, proves de lectura i escriptura |
| Prestacions | La taula de prestacions provada |
| Col·laboració | Evidències de la pràctica 4.2 |

## Per saber-ne més

- [Nextcloud Office](https://docs.nextcloud.com/server/latest/admin_manual/office/index.html) · lectura en anglès del bloc
- [Collabora Online](https://www.collaboraonline.com/)
