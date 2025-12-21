import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { LansiaDashboard } from './pages/LansiaDashboard';
import { AktivitasPage } from './pages/AktivitasPage';
import { LatihanPage } from './pages/LatihanPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Role Selection (Login) */}
          <Route path="/" element={<RoleSelectionPage />} />

          {/* Main Dashboard */}
          <Route path="/dashboard" element={<LansiaDashboard />} />

          {/* Lansia Routes */}
          <Route path="/aktivitas" element={<AktivitasPage />} />
          <Route path="/latihan" element={<LatihanPage />} />

          {/* Monitoring Routes (Keluarga/Kader) */}
          <Route path="/monitoring" element={<MonitoringPage />} />

          {/* Community Directory */}
          <Route path="/komunitas" element={<CommunityPage />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Profile */}
          <Route path="/profil" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
