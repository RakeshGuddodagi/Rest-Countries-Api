import React from 'react';
import { Modal, Box, Typography} from '@mui/material';
import './Loader.css';

export default function Loader() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
  return (
    <Modal open={true}>
        <Box sx={style}>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Box>
    </Modal>
  )
}

