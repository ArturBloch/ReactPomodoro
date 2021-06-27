import './../App.css';
import Pomodoro from './Pomodoro';
import Footer from './Footer';
import Header from "./Header"
import { TimerProvider } from './timer';

function App() {
  return (
    <TimerProvider>
      <div className="App">
        <Header />
        <Pomodoro />
        <Footer />
      </div>
    </TimerProvider>
  );
}

export default App;
