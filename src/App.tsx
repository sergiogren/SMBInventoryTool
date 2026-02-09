import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { LanguageSelector } from './components/LanguageSelector';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { logout } from './services/firebase';
import { LogOut, Package, DollarSign } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const { user, isAuthenticated, authError, clearAuthError } = useAuth();
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
    <div className="bg-[#f5f5f7]">
        {isAuthenticated && (
          <header className="bg-white/80 backdrop-blur-md border-b border-[#d2d2d7] p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-[#1d1d1f]">SMB Tool</h1>
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <span className="text-sm text-[#6e6e73]">
                  {t('auth.userGreeting', { name: user?.displayName || user?.email })}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="gap-2 border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                  size="sm"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.logout')}
                </Button>
              </div>
            </div>
          </header>
        )}

        <main className="container mx-auto">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} authError={authError} onClearAuthError={clearAuthError} />
            } />

          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
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
