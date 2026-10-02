// Mapa de la web: cada pàgina és un fitxer Markdown de ../../continguts.
// Per afegir una pàgina, crea el .md i afegeix-ne una entrada aquí.
import { Home, CalendarRange, CalendarDays, Server, Newspaper, GraduationCap, FolderOpen, FileSpreadsheet, Mail, Trophy, Wrench } from 'lucide-react'

const fitxers = import.meta.glob('../../continguts/*.md', { query: '?raw', import: 'default', eager: true })
const md = (nom) => fitxers[`../../continguts/${nom}.md`] ?? `# Falta el fitxer ${nom}.md`

export const pagines = [
  { slug: '', nom: 'Inici', icona: Home, text: md('inici') },
  { slug: 'programa', nom: 'Programa i avaluació', icona: CalendarRange, text: md('programa') },
  { slug: 'calendari', nom: 'Sessions', icona: CalendarDays, text: md('calendari') },
  { slug: 'bloc-0', nom: "B0 · L'entorn", icona: Server, text: md('bloc0-entorn'), bloc: true },
  { slug: 'bloc-1', nom: 'B1 · WordPress', icona: Newspaper, text: md('bloc1-wordpress'), bloc: true },
  { slug: 'bloc-2', nom: 'B2 · Moodle', icona: GraduationCap, text: md('bloc2-moodle'), bloc: true },
  { slug: 'bloc-3', nom: 'B3 · Nextcloud', icona: FolderOpen, text: md('bloc3-nextcloud'), bloc: true },
  { slug: 'bloc-4', nom: 'B4 · Ofimàtica web', icona: FileSpreadsheet, text: md('bloc4-ofimatica'), bloc: true },
  { slug: 'bloc-5', nom: 'B5 · Correu i calendari', icona: Mail, text: md('bloc5-correu'), bloc: true },
  { slug: 'projecte', nom: 'Projecte: la intranet', icona: Trophy, text: md('projecte') },
  { slug: 'recursos', nom: 'Recursos', icona: Wrench, text: md('recursos') },
]
