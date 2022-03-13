import MessageIcon from '../MessageIcon';
import PhoneIcon from '../PhoneIcon';
import './GetInTouch.style.scss';

const EMAIL = 'enquiry@tappiola-agency.com';
const PHONE = '+44 7507 625 808';

const GetInTouch = () => (
  <div className="GetInTouch">
    <span className="GetInTouch-Title">Get in touch</span>
    <span className="GetInTouch-Contact">
      <MessageIcon />
      <span className="GetInTouch-Label">Email us:</span>
      <a href={`mailto:${EMAIL}`} className="GetInTouch-ContactLink">
        {EMAIL}
      </a>
    </span>
    <span className="GetInTouch-Contact">
      <PhoneIcon />
      <span className="GetInTouch-Label">Call us:</span>
      <a href={`tel:${PHONE}`} className="GetInTouch-ContactLink">
        {PHONE}
      </a>
    </span>
  </div>
);

export default GetInTouch;
