import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams, useNavigate } from "react-router";
import { border } from '@mui/system';
import Loader from './Loader';


function CountryDetail(onClick, darkMode, country, countries, country_details) {


  const [state, setState] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams();
  const navigate = useNavigate();
  let name;
  let flagImg;
  let nativename;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  state.forEach(countries => {
    if (countries.alpha3Code === params.countryCode) {
      name = countries.name;
      flagImg = countries.flag;
      nativename = countries.nativeName;
      population = countries.population;
      region = countries.region;
      subregion = countries.subregion;
      capital = countries.capital;
      topLevelDomain = countries.topLevelDomain;
      currencies=countries.currencies[0].name
      languages=countries.languages;
    

      countries.borders?.forEach((border)=>
      {
        borders.push(border);
      });

    }

  });
  const goback = () => {
    navigate("/");
  }

  const fetchCountryData = async () => {
    const response = await fetch(`https://restcountries.com/v2/all`)
    const singleCountry = await response.json()
    setState(singleCountry)
    console.log(singleCountry)
  }

  useEffect(async () => {
   setIsLoading(true);
    await fetchCountryData()
    setIsLoading(false);
  }, [])

  // setTimeout(() => {
  //   console.log("state : ", state)

  // }, 1000)
  return (
    <div className='country_detail'>
      <button className={`back ${darkMode ? `darkMode` : ' '}`} onClick={goback}>
        <KeyboardBackspaceIcon /> Back</button>
    {console.log(isLoading)}
      {!isLoading ? <div className='back_body'>
        <div className='img_container'>
          <img style={{ width: '100%', height: '300px' }} src={flagImg} alt='' />
        </div>
        <div className='info'>
          <h2 className='nam'>{name}</h2>
          <div className='info_container'>
            <div className='side_info'>
              <p>Native Name:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{nativename}</span>
              </p>
              <p>Population:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{population}</span>
              </p>
              <p>Region:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{region}</span>
              </p>
              <p>Sub Region:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{subregion}</span>
              </p>
              <p>Capital:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{capital}</span>
              </p>
            </div>
            <div className='right_info'>
              <p>Top Level Domain:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}>{topLevelDomain}</span>
              </p>
              <p>Currencies:{" "}
                <span className={`values ${darkMode ? `darkMode` : ' '}`}> {currencies}</span>
              </p>
              <p>Languages:{" "}
              {languages.length > 0 && languages.map((language) => (

                <span style={{marginLeft : '6px'}} className={`values ${darkMode ? `darkMode` : ' '}`}>{language.name}</span>
              ))}
              </p>
            </div>
          </div>
          Border Countries:
          {border.length ? (
            borders.map((border)=> (
              <div className={`border ${darkMode ? "darkMode" : ""}`}>
                {border}
                </div>
            ))
          ):(
            <div className={`values ${darkMode ? "darkMode" : ""}`}>
              <p>No Borders</p>
              </div>
          
          )}
         
         
        </div>

      </div> : <Loader />}
      
    </div>
  )
}

export default CountryDetail
