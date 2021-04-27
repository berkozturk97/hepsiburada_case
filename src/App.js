import { useEffect } from 'react';
import './App.css';
import Logo from './components/Logo';
import Search from './components/Search';
import SearchItem from './components/SearchItem';

function App() {
  return (
    <div className="App">
      <Logo />
      <Search />
      <SearchItem />
    </div>
  );
}

export default App;
