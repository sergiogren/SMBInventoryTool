import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <header className="bg-indigo-700 text-white p-4">
        <h1 className="text-2xl font-bold">SMB Inventory Tool</h1>
      </header>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md text-center">
                <h1 className="text-4xl font-bold text-indigo-700 mb-4">Tailwind v4 працює!</h1>
                <p className="text-gray-600">Ніякого config-файлу не потрібно 😎</p>
              </div>
            </div>
          } />
          <Route path="/inventory" element={<div className="bg-white rounded-lg p-6">Запаси</div>} />
          <Route path="/finance" element={<div className="bg-white rounded-lg p-6">Фінанси</div>} />
          {/* Додаткові маршрути пізніше */}
        </Routes>
      </main>
    </div>
  )
}

export default App
