import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import './main.css'; // Importing the CSS correctly
import logo1 from './OIP.jpeg';
import logo2 from './DOC1.jpeg';
import logo3 from './DOC2.jpeg';
import logo4 from './DOC3.jpeg';

function Main() {
  // Define working hours and available sections
  const workingHours = [
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '12:00', end: '13:00' },
    { start: '13:00', end: '14:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' }
  ];

  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedSection, setSelectedSection] = useState(''); // Track selected section
  const [showTimePicker, setShowTimePicker] = useState(false); // Toggle appointment time picker
  const [selectedDoctor, setSelectedDoctor] = useState(''); // Track selected doctor
  const [bookedAppointments, setBookedAppointments] = useState([]); // Track booked appointments
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(true); // Check doctor availability

  useEffect(() => {
    // Fetch booked appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/doctors'); // Adjust URL based on your setup
        setBookedAppointments(response.data);
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to handle booking token generation
  const handleBookToken = (doctorName) => {
    setShowTimePicker(true); // Show time picker when booking is initiated
    setSelectedDoctor(doctorName); // Track which doctor is being booked
    setIsDoctorAvailable(true); // Reset availability status
  };

  // Function to check if the doctor is available for the selected time section
  const checkDoctorAvailability = () => {
    return bookedAppointments.some(appointment =>
      appointment.doctor === selectedDoctor &&
      appointment.startTime === selectedSection
    );
  };

  // Function to handle appointment confirmation
  const handleConfirmAppointment = () => {
    const selectedTime = workingHours.find(time => time.start === selectedSection);
    if (!selectedTime) {
      alert('Please select a valid time section.');
      return;
    }

    // Check if the doctor is available
    if (checkDoctorAvailability()) {
      setIsDoctorAvailable(false); // Set availability status to false if booked
      return;
    }

    const currentDate = new Date();
    const bookingData = {
      doctor: selectedDoctor,
      startTime: selectedTime.start,
      endTime: selectedTime.end,
      timestamp: currentDate.toISOString(), // Capture current time in ISO format
    };

    // Sending POST request to save booking in db.json
    axios.post('http://localhost:3001/doctors', bookingData)
      .then((response) => {
        // Set the booking details (doctor name, selected appointment times)
        setBookingDetails({
          doctor: selectedDoctor,
          startTime: selectedTime.start,
          endTime: selectedTime.end,
        });
        alert(`Booking confirmed with Dr. ${selectedDoctor} from ${selectedTime.start} to ${selectedTime.end}`);
        console.log('Booking Response:', response.data);
        // Fetch updated appointments
        setBookedAppointments(prev => [...prev, bookingData]);
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
      });

    setShowTimePicker(false); // Hide the time picker after confirmation
  };

  // Function to handle booking cancellation
  const handleCancelBooking = () => {
    setBookingDetails(null); // Reset the booking details state
    setSelectedSection(''); // Reset the selected section
    setShowTimePicker(false); // Hide time picker if it's open
    alert('Booking has been canceled');
  };

  return (
    <div className="App">
      {/* Header with Logo and Navigation */}
      <header className="App-header">
        <img src={logo1} alt="Hospital Logo" className="logo" />
        <h1>Hospital Management System</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <h2>Welcome to Our Hospital</h2>
        <p>Providing compassionate care and advanced medical services to our community.</p>
        <button className="learn-more-btn">Learn More</button>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          Our hospital is dedicated to offering the highest quality healthcare services. With a team of
          experienced professionals and state-of-the-art facilities, we are here to serve your health needs.
        </p><br></br>
        <h3>Our Mission</h3><br></br>
        <p>
          Our mission is to revolutionize healthcare management by providing a comprehensive, user-friendly platform that integrates all aspects of hospital administration. We aim to support healthcare professionals in delivering the highest quality of care and to ensure a seamless, patient-centered experience.
        </p>
        <br></br>
        <h3>Our Vision</h3><br></br>
        <p>
          We envision a future where technology empowers healthcare. Our vision is to be a leading provider of healthcare management systems, known for our commitment to innovation, reliability, and excellence. By leveraging cutting-edge technology, we strive to improve the efficiency and effectiveness of hospital operations, making quality healthcare accessible to all.
        </p><br></br>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Emergency Care</h3>
            <p>24/7 emergency services to handle urgent medical situations with efficiency and care.</p>
          </div>
          <div className="service-item">
            <h3>Outpatient Services</h3>
            <p>Comprehensive outpatient services, including diagnostics and consultations.</p>
          </div>
          <div className="service-item">
            <h3>Inpatient Care</h3>
            <p>State-of-the-art facilities for inpatient care with a focus on comfort and recovery.</p>
          </div>
        </div>
      </section>

      {/* Doctors Information Section */}
      <section id="doctors" className="doctors-section">
        <h2>Meet Our Doctors</h2>
        <div className="doctors-grid">
          <div className="doctor-card">
            <img src={logo2} alt="Doctor 1" className="doctor-image" />
            <h3>Dr. John Smith</h3>
            <p>Cardiologist</p>
            <p>johnsmith@example.com</p>
            <button 
              className="book-token-btn"
              onClick={() => handleBookToken('John Smith')}
              disabled={bookingDetails} // Disable the button if a doctor is already booked
            >
              Book Token
            </button>
          </div>
          <div className="doctor-card">
            <img src={logo3} alt="Doctor 2" className="doctor-image" />
            <h3>Dr. Emily Johnson</h3>
            <p>Pediatrician</p>
            <p>emilyjohnson@example.com</p>
            <button 
              className="book-token-btn"
              onClick={() => handleBookToken('Emily Johnson')}
              disabled={bookingDetails}
            >
              Book Token
            </button>
          </div>
          <div className="doctor-card">
            <img src={logo4} alt="Doctor 3" className="doctor-image" />
            <h3>Dr. Michael Brown</h3>
            <p>Neurologist</p>
            <p>michaelbrown@example.com</p>
            <button 
              className="book-token-btn"
              onClick={() => handleBookToken('Michael Brown')}
              disabled={bookingDetails}
            >
              Book Token
            </button>
          </div>
        </div>

        {/* Show appointment time picker if a doctor is selected */}
        {showTimePicker && !bookingDetails && (
          <div className="appointment-time-picker">
            <h3>Select Appointment Time:</h3>
            <label>
              Time:
              <select 
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select a time section</option>
                {workingHours.map((time, index) => (
                  <option key={index} value={time.start}>
                    {time.start} - {time.end}
                  </option>
                ))}
              </select>
            </label>
            <button 
              className="confirm-appointment-btn" 
              onClick={handleConfirmAppointment}
              disabled={!selectedSection} // Disable if time is not selected
            >
              Confirm Appointment
            </button>
            {!isDoctorAvailable && (
              <p className="error-message">This doctor is not available at this time section.</p>
            )}
          </div>
        )}

        {/* Conditionally show Cancel button if a doctor is booked */}
        {bookingDetails && (
          <div className="cancel-booking-section">
            <p>Booking with Dr. {bookingDetails.doctor} is confirmed.</p>
            <p>Time: {bookingDetails.startTime} - {bookingDetails.endTime}</p>
            <button className="cancel-booking-btn" onClick={handleCancelBooking}>
              Cancel Booking
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
