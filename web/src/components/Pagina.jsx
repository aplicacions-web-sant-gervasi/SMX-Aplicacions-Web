import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MermaidDiagram from './MermaidDiagram'

// Id d'ancoratge a partir del text d'un títol: "Pràctica 1.2" -> "practica-1-2"
const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const textDe = (children) => [].concat(children).map((c) =>
  typeof c === 'string' ? c : c?.props?.children ? textDe(c.props.children) : '').join('')

const titol = (Tag) => function Titol({ children }) {
  return <Tag id={slugify(textDe(children))}>{children}</Tag>
}

// Amb HashRouter, un <a href="#seccio"> substitueix la ruta i deixa la pàgina en blanc.
// Els enllaços dins de la pàgina es resolen amb scrollIntoView, sense tocar l'URL.
function Enllac({ href = '', children }) {
  if (href.startsWith('#')) {
    const anar = (e) => {
      e.preventDefault()
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return <a href={href} onClick={anar}>{children}</a>
  }
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>
}

// Els blocs ```mermaid es dibuixen; la resta de blocs de codi van dins d'un <pre>.
function Bloc({ children }) {
  const codi = children?.props
  const llenguatge = /language-(\w+)/.exec(codi?.className || '')?.[1]
  if (llenguatge === 'mermaid') return <MermaidDiagram chart={String(codi.children).trim()} className="my-6" />
  return <pre>{children}</pre>
}

export default function Pagina({ text }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <article className="md max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 lg:p-10">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ a: Enllac, pre: Bloc, h2: titol('h2'), h3: titol('h3') }}
      >
        {text}
      </ReactMarkdown>
    </article>
  )
}
