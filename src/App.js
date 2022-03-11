import React from "react";
import Header from "./Header";
// import Search from "./Search";
import Countries from "./Countries";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import SearchIcon from '@mui/icons-material/Search';
import Loader from './Loader';

import { useState, useEffect, useRef } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [country, setCountry] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const noresult = country.status || country.message;

  const [isLoading, setIsLoading] = useState(false)

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    try {
      fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    setIsLoading(true);
     await fetchData()
     setIsLoading(false);
   }, [])
 

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    setCountry(data);
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;

    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
        const data = await response.json();
        setCountry(data);
      }
      try {
        fetchSearch()
      } catch (error) {
        console.log(error)
      }
    } else {
      fetchData();
    }
  };

  const selectRegionbar = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`);
        const data = await response.json();

        if (selectValue === 'Filter by Region') {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }
        setCountry(data);
      };
      try {
        fetchSelect();
      } catch (error) {
        console.log(error)
      }
    }
  };

  console.log(country)

  return (
    <div className={`app ${darkMode ? `darkMode` : ' '}`}>
      <header>
      {console.log(isLoading)}
      {!isLoading ?
        <div>
          <Header onClick={switchMode} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={

              <div>
                <div className='search-body'>
                  <div className='inputs'>
                    <div className={`search ${darkMode ? `darkMode` : ''}`}>
                      < SearchIcon />
                      <input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries}></input>
                    </div>
                    <div className={`region ${darkMode ? `darkMode` : ' '}`}>
                      <select ref={regionRef} onChange={selectRegionbar} className='slct'>
                        <option>Filter by Region</option>
                        <option>Africa</option>
                        <option>Americas</option>
                        <option>Asia</option>
                        <option>Europe</option>
                        <option>Oceania</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="country">
                  {
                    !noresult ? (
                      country.map(countries => (
                        <Countries darkMode={darkMode}
                          key={countries.alpha3Code}
                          code={countries.alpha3Code}
                          name={countries.name}
                          capital={countries.capital}
                          region={countries.region}
                          population={countries.population}
                          flag={countries.flag}
                          
                        />

                      ))
                    ) : (
                      <h3>No Countries Found....</h3>
                    )
                  }
                </div>
              </div>
            }
            />

            <Route path="country-details/:countryCode"
              element={<CountryDetail  darkMode={darkMode} countries={country}  />} />
          </Routes>
        </div>
        : <Loader />}
      </header>
    </div>

  );
}
export default App;
