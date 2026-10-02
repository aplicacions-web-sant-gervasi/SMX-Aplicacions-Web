import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { pagines } from '../continguts'

function Entrada({ p, actiu, tancar }) {
  return (
    <Link
      to={`/${p.slug}`}
      onClick={tancar}
      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${actiu ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <p.icona className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium text-sm">{p.nom}</span>
    </Link>
  )
}

const generals = pagines.filter((p) => !p.bloc)
const blocs = pagines.filter((p) => p.bloc)

export default function Layout({ children }) {
  const [obert, setObert] = useState(false)
  const { pathname } = useLocation()
  const tancar = () => setObert(false)
  const entrada = (p) => <Entrada key={p.slug} p={p} actiu={pathname === `/${p.slug}`} tancar={tancar} />

  return (
    <div className="min-h-screen bg-gray-50">
      {obert && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={tancar} />}

      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 flex flex-col lg:translate-x-0 ${obert ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2" onClick={tancar}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">AW</span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-900 block">Aplicacions web</span>
              <span className="text-xs text-gray-500">Curs 2026-27</span>
            </div>
          </Link>
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={tancar}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {generals.slice(0, 3).map(entrada)}
          <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Blocs</p>
          {blocs.map(entrada)}
          <div className="pt-4" />
          {generals.slice(3).map(entrada)}
        </nav>

        <div className="p-4 border-t bg-gray-50 flex-shrink-0 text-xs text-gray-500">
          <p className="font-medium text-gray-700">0228 · CFGM SMX</p>
          <p>Institut TIC de Barcelona · 2n curs</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 h-16 bg-white border-b flex items-center px-4 lg:px-8">
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setObert(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 lg:ml-0 text-base lg:text-lg font-semibold text-gray-900 truncate">
            Aplicacions web · Sistemes Microinformàtics i Xarxes
          </h1>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
