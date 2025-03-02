import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../store/user-context';

import secTwoIllustration from '../../assets/images/trafalgar-illustration sec02 1.svg';
import secThreeIllustration from '../../assets/images/trafalgar-illustration sec03 1.svg';
import './TestimonialsPage.css';

function TestimonialsPage() {
  const { user } = useContext(UserContext);

  return (
    <section className='testimonial-sec'>
      <div className='testimonial'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <img
                src={secTwoIllustration}
                alt='Health Record'
                className='img-fluid'
                width='400'
                height='300'
              />
            </div>
            <div className='col-md-6 t-content'>
              <h2 className='t-title'>Maintains Health Record</h2>
              <hr className='t-hr' />
              <p className='t-desc'>
                Insurolife provides progressive, affordable healthcare
                accessible on mobile and online for everyone. To us, it's not
                just work. We take pride in the solutions we deliver.
              </p>
              <Link to={`/${user.type}/profile`} className='t-button'>
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='testimonial'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6 t-content'>
              <h2 className='t-title'>Book an Appointment with Expert</h2>
              <hr className='t-hr' />
              <p className='t-desc'>
                Our dedicated patient engagement app and web portal allow you to
                access information instantaneously and securely.
              </p>

              <Link to='/appointment' className='t-button'>
                Book Now
              </Link>
            </div>
            <div className='col-md-6 text-center'>
              <img
                src={secThreeIllustration}
                alt='Appointment'
                className='img-fluid'
                width='500'
                height='300'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsPage;
