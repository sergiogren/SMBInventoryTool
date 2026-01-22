import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { LanguageSelector } from './components/LanguageSelector';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { logout } from './services/firebase';
import { LogOut, Package, DollarSign } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
        {isAuthenticated && (
          <header className="bg-indigo-700 text-white p-4 border-b border-indigo-700">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">SMB Tool</h1>
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <span className="text-sm">
                  {t('auth.userGreeting', { name: user?.displayName || user?.email })}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.logout')}
                </Button>
              </div>
            </div>
          </header>
        )}

        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } />

          <Route path="/" element={
            <PrivateRoute>
              <div className="flex items-center justify-center min-h-[80vh] p-4">
                <Card className="max-w-md w-full shadow-2xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl text-indigo-700 mb-2">
                      🎉 {t('auth.welcome')}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t('auth.welcomeBack')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={() => navigate('/inventory')}
                      className="w-full gap-2 h-12"
                      size="lg"
                    >
                      <Package className="w-5 h-5" />
                      {t('dashboard.goToInventory')}
                    </Button>
                    <Button
                      onClick={() => navigate('/finance')}
                      variant="outline"
                      className="w-full gap-2 h-12"
                      size="lg"
                    >
                      <DollarSign className="w-5 h-5" />
                      {t('dashboard.goToFinance')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </PrivateRoute>
          } />

          <Route path="/inventory" element={
            <PrivateRoute>
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-6 h-6" />
                      {t('inventory.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('inventory.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t('inventory.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </PrivateRoute>
          } />

          <Route path="/finance" element={
            <PrivateRoute>
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-6 h-6" />
                      {t('finance.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('finance.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t('finance.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </PrivateRoute>
          } />

            {/* Redirect unknown routes to login if not authenticated, or home if authenticated */}
            <Route path="*" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </main>
      </div>
    )
}

export default App
