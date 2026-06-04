import { useState } from 'react';
import { AppRouter } from './routers/app.routers';
import { Sidebar } from './components/Nav';

function App() {
    const [sidebarAberta, setSidebarAberta] = useState(false);

    return (
        <div className="min-vh-100" style={{ background: '#f8f9fa' }}>

            {/* Sidebar */}
            <Sidebar aberta={sidebarAberta} onFechar={() => setSidebarAberta(false)} />

            {/* Topbar */}
            <header
                className="bg-dark text-white d-flex align-items-center px-3"
                style={{ height: '56px', position: 'sticky', top: 0, zIndex: 1030 }}
            >
                <button
                    className="btn btn-sm btn-outline-secondary text-white border-0 me-3"
                    onClick={() => setSidebarAberta(true)}
                    aria-label="Abrir menu"
                    style={{ fontSize: '20px', lineHeight: 1 }}
                >
                    ☰
                </button>
                <span className="fw-bold">StudyMore</span>
            </header>

            {/* Conteúdo */}
            <main className="p-3">
                <AppRouter />
            </main>
        </div>
    );
}

export default App;