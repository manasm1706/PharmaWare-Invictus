import FrameInsurance from '../../assets/images/Frame.svg';
import FrameConsultation from '../../assets/images/Frame-Consultation.svg';
import FrameDetailsInfo from '../../assets/images/Frame-DetailsInfo.svg';
import FrameHealthRecords from '../../assets/images/Frame-HealthRecords.svg';
import './ServicesPage.css';

function ServicesPage() {
  return (
    <section className='services-section bg-light'>
      <div className='container text-center'>
        <h2 className='sec-heading'>Our Services</h2>
        <div className='text-center mb-4'>
          <div className='d-inline-block position-relative'>
            <div className='position-relative'>
              <div
                className='bg-black'
                style={{ height: '2px', width: '60px', margin: '0 auto' }}
              ></div>
            </div>
          </div>
        </div>
        <p className='sec-description'>
          We provide to you the best choices for you. Adjust it to your health
          needs and make sure you undergo treatment with our highly qualified
          doctors. You can consult with us which type of service is suitable for
          your health.
        </p>

        <div className='row sec-padding'>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='sec-card'>
              <img
                src={FrameInsurance}
                alt='Find Insurance'
                className='img-fluid mb-3'
                style={{ width: '130px', height: '130px' }}
              />
              <h4 className='card-title'>Find Insurance</h4>
              <p className='card-desc'>
                Choose your doctor from thousands of specialists, general, and
                trusted hospitals.
              </p>
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='sec-card'>
              <img
                src={FrameConsultation}
                alt='Consultation'
                className='img-fluid mb-3'
                style={{ width: '100px', height: 'auto' }}
              />
              <h4 className='card-title'>Consultation</h4>
              <p className='card-desc'>
                Free consultation with our trusted doctors and get the best
                recommendations.
              </p>
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='sec-card'>
              <img
                src={FrameDetailsInfo}
                alt='Details Info'
                className='img-fluid mb-3'
                style={{ width: '100px', height: 'auto' }}
              />
              <h4 className='card-title'>Details Info</h4>
              <p className='card-desc'>
                Get the best recommendations from our trusted doctors.
              </p>
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center'>
            <div className='sec-card'>
              <img
                src={FrameHealthRecords}
                alt='Health Records'
                className='img-fluid mb-3'
                style={{ width: '100px', height: 'auto' }}
              />
              <h4 className='card-title'>Health Records</h4>
              <p className='card-desc'>
                Track and save your medical history and health data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;
