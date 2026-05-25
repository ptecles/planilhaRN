import { useState, useEffect } from 'react'
import { Baby, MapPin, Calendar } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function App() {
  const [formData, setFormData] = useState({
    uf: '',
    cidade: '',
    mesDPP: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ufs, setUfs] = useState([])
  const [cidades, setCidades] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/ufs`)
      .then(res => res.json())
      .then(data => setUfs(data))
      .catch(err => console.error('Erro ao carregar UFs:', err))
  }, [])

  useEffect(() => {
    if (formData.uf) {
      fetch(`${API_URL}/api/cidades/${formData.uf}`)
        .then(res => res.json())
        .then(data => setCidades(data))
        .catch(err => console.error('Erro ao carregar cidades:', err))
    } else {
      setCidades([])
    }
  }, [formData.uf])

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'uf') {
      setFormData(prev => ({ ...prev, cidade: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Baby className="w-12 h-12 text-pink-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Calculadora de Enxoval
            </h1>
            <p className="text-gray-600">
              Descubra as quantidades ideais baseadas na temperatura da sua região
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Estado (UF)
                  </label>
                  <select
                    name="uf"
                    value={formData.uf}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Cidade
                  </label>
                  <select
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    disabled={!formData.uf}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Selecione...</option>
                    {cidades.map(cidade => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Mês DPP
                  </label>
                  <select
                    name="mesDPP"
                    value={formData.mesDPP}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {meses.map(mes => (
                      <option key={mes} value={mes}>{mes}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Calculando...' : 'Calcular Enxoval'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Baby className="w-6 h-6 text-pink-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Enxoval Recomendado
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Item
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Quantidade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.enxoval.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-gray-800">
                          {item.item}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-full">
                            {item.quantidade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
