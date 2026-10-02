import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Pagina from './components/Pagina'
import { pagines } from './continguts'

const noTrobada = "# Pàgina no trobada\n\nTorna a l'[inici](/)."

export default function App() {
  return (
    <Layout>
      <Routes>
        {pagines.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<Pagina text={p.text} />} />
        ))}
        <Route path="*" element={<Pagina text={noTrobada} />} />
      </Routes>
    </Layout>
  )
}
