
import './App.css'
import CodeReview from './components/CodeReview'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
        <Header /> {/* Header at the top */}
      <main className="flex-grow p-4 mt-16"> {/* Main content area */} 
        <CodeReview />
      </main>
      <Footer /> {/* Footer always at the bottom */}
    </div>
  );
}

export default App
