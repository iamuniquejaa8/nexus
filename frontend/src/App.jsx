import React, { useState, useRef, useEffect } from 'react';
import { AlignJustify, X } from 'lucide-react';
import axios from "axios";

import NEXUSLOGO from './assets/nexuslogo.jpg'
import GWECCCLOGO from './assets/gweccclogo.jpg'
import BAHRAIN from './assets/bahrain.jpeg'
import EARTH from './assets/earth.jpeg'

const SERVER = "https://nexus-backend-cy6c.onrender.com"

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const scheduleRef = useRef(null);
  const registerRef = useRef(null);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionRef, tabName) => {
    setActiveTab(tabName);
    if (sectionRef.current) {
      const yOffset = -80; // Offset to account for fixed header
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better section detection

      const sections = [
        { ref: homeRef, tab: 'home' },
        { ref: aboutRef, tab: 'about' },
        { ref: scheduleRef, tab: 'schedule' },
        { ref: registerRef, tab: 'register' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveTab(section.tab);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // slides content
  const slides = [
    {
      title: "GWECCC 2025",
      subtitle: "Global Water, Energy and Climate Change Congress",
      date: "October 15-17, 2025",
      venue: "Dubai International Convention Centre",
      image: EARTH
    },
    {
      title: "Join World Leaders",
      subtitle: "Shape the Future of Sustainability",
      date: "October 15-17, 2025",
      venue: "Dubai International Convention Centre",
      image: BAHRAIN
    }
  ];

  // schedule content
  const scheduleData = [
    {
      date: "October 15, 2025",
      events: [
        { time: "09:00 - 10:30", title: "Opening Ceremony", speaker: "Dr. Sarah Johnson" },
        { time: "11:00 - 12:30", title: "Future of Renewable Energy", speaker: "Prof. Michael Chen" },
        { time: "14:00 - 15:30", title: "Water Conservation Technologies", speaker: "Dr. Emma Roberts" }
      ]
    },
    {
      date: "October 16, 2025",
      events: [
        { time: "09:00 - 10:30", title: "Climate Change Mitigation", speaker: "Dr. James Wilson" },
        { time: "11:00 - 12:30", title: "Sustainable Urban Development", speaker: "Prof. Lisa Zhang" },
        { time: "14:00 - 15:30", title: "Energy Transition Strategies", speaker: "Dr. David Miller" }
      ]
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    organisation: '',
    delegates: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
    axios.post(`${SERVER}/register`, formData)
      .then((response) => {
        // Handle success
        console.log('Registration successful:', response.data);
        alert('Registration successful!');
      })
      .catch((error) => {
        // Handle error
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Navigation items array for cleaner code
  const navItems = [
    { name: 'Home', ref: homeRef },
    { name: 'About', ref: aboutRef },
    { name: 'Schedule', ref: scheduleRef },
    { name: 'Register', ref: registerRef }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <img src={GWECCCLOGO} alt="GWECCC Logo" className="h-12" />
              </div>
              <div className="hidden md:block">
                <img src={NEXUSLOGO} alt="Nexus Logo" className="h-8" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref, item.name.toLowerCase())}
                  className={`${
                    activeTab === item.name.toLowerCase()
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  } px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X /> : <AlignJustify />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref, item.name.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section / Slider */}
        <section ref={homeRef} className="relative h-[600px] bg-gray-900">
          {/* Hero content remains the same */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
                  <p className="text-2xl mb-6">{slides[currentSlide].subtitle}</p>
                  <div className="text-xl">
                    <p className="mb-2">{slides[currentSlide].date}</p>
                    <p>{slides[currentSlide].venue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-16 bg-white" id="about">
          {/* About content remains the same */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">About GWECCC 2025</h2>
            <div className="max-w-3xl mx-auto text-gray-600">
              <p className="mb-4">
                The Global Water, Energy and Climate Change Congress (GWECCC) 2025 brings together world leaders, 
                researchers, and industry experts to address the most pressing environmental challenges of our time.
              </p>
              <p className="mb-4">
                This prestigious event will feature keynote speeches, panel discussions, and interactive sessions 
                focused on innovative solutions for sustainable development, renewable energy adoption, and climate 
                change mitigation strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section ref={scheduleRef} className="py-16 bg-gray-50" id="schedule">
          {/* Schedule content remains the same */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Event Schedule</h2>
            <div className="max-w-4xl mx-auto">
              {scheduleData.map((day, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{day.date}</h3>
                  <div className="space-y-4">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="font-medium text-blue-600">{event.time}</p>
                          <div className="md:ml-8">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-gray-600">{event.speaker}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={registerRef} className="py-16 bg-white" id="register">
          {/* Registration form content remains the same */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Register Now</h2>
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organisation
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Delegates
                  </label>
                  <input
                    type="number"
                    name="delegates"
                    required
                    min="1"
                    value={formData.delegates}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src={NEXUSLOGO} alt="GWECCC Logo" className="h-8" />
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 NEXUS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;