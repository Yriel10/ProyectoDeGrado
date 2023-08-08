import React from 'react';
import {MDBFooter,MDBContainer,MDBBtn} from 'mdb-react-ui-kit';
import Icon from '@mdi/react';
import { mdiFacebook,mdiInstagram,mdiTwitter  } from '@mdi/js';
import { Link } from 'react-router-dom';

 function Footers() {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
    <MDBContainer className='p-4 pb-0'>
      <section className='mb-4'>
        <a  href='https://www.facebook.com/Farmaciajehovarafha01' >
        <Icon path={mdiFacebook} size={2} />
        </a>
        <a  href='https://www.facebook.com/Farmaciajehovarafha01' >
        <Icon path={mdiTwitter} size={2} />
        </a>
        <a  href='https://www.instagram.com/farmacia_jehova_rafha/' >
        <Icon path={mdiInstagram} size={2} />
        </a>
      </section>
    </MDBContainer>

    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      © 2023 Copyright:
      <a className='text-white' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>
        Yriel Cabrera Valdez
      </a>
    </div>
  </MDBFooter>

  );
}
export default Footers;