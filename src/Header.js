import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function Header({onClick,darkMode}) {
    return (
        <div className={`header ${darkMode ? `darkMode` : ' '}`}>
            <div className='first'>
            <h3 className='text'>Where in the world?</h3>
            <div className='switch' onClick={onClick}>
                    <DarkModeIcon />
                  <h3>Dark mode</h3>
                    
            </div>
            </div>
            
        </div>
    )
}
export default Header;