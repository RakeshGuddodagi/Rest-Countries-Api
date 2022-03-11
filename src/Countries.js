import React from 'react'
import { useNavigate } from 'react-router-dom'

function Countries({ darkMode, name, capital, population, region, flag, showDetails, code }) {

  let navigate = useNavigate();

  const showCountryDetails = () => {
    navigate(`country-details/${code}`)
  }

  return (
    <div className={`countries ${darkMode ? `darkMode` : ' '}`} onClick={showCountryDetails}>
      <div className='flag'>
        <img className='image' src={flag} alt='peru' ></img>
      </div>
      <div className='details'>
        <h3 className='name'>{name}</h3>
      </div>
      <div>
        <p className="card-text">Population:{" "}
          <span className='values'>{population}</span></p>
        <p className="card-text">Region:{" "}
          <span className='values'>{region}</span></p>
        <p className="card-text">Capital:{" "}
          <span className='values'>{capital}</span></p>
      </div>
    </div>
  )
}

export default Countries;
