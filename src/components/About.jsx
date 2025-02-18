import React from 'react';
import '../style/About.css'; // Optional, for styling
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const About = () => {
    const navigate = useNavigate();

  return (
    <div>
         <Navbar />
         <div className="breadcrumb py-2 px-4">
        <button onClick={() => navigate(-1)} className="back-button">
          ⬅ Go Back
        </button>
      </div>
   <div className="about-container">
      <div className="about-header">
        <h1>About Me</h1>
        <p>Welcome to my portfolio! Here's a little about me:</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Introduction</h2>
          <p>
            Hello! I'm [Kumaravel BM], a passionate developer skilled in front-end and back-end development.
            I specialize in building user-friendly web applications and solving complex problems.
          </p>
        </section>

        <section>
          <h2>Skills</h2>
          <ul>
          <li><a href="https://www.javascript.com" target="_blank" rel="noopener noreferrer">JavaScript</a></li>
          <li><a href="https://www.reactjs.org" target="_blank" rel="noopener noreferrer">React</a></li>
          <li><a href="https://www.nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a></li>
            <li><a href="https://www.w3schools.com/html" target="_blank" rel="noopener noreferrer">HTML/CSS</a></li>
            <li><a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer">Database Design (MySQL, MongoDB)</a></li>
            <li>GitHub</li>
          </ul>
        </section>

        <section>
          <h2>Projects</h2>
          <div className="project-list">
            <div className="project-item">
              <h3>Project 1: Food Recipe App</h3>
              <p>This app allows users to search, view, and save recipes from different categories.</p>
              <a href="https://github.com/kumarabm/FoodRecipe_UI" target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
            <div className="project-item">
              <h3>Project 2: Portfolio Website</h3>
              <p>My personal portfolio to showcase my skills and projects.</p>
              <a href="https://github.com/yourusername/portfolio" target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2>Contact</h2>
          <p>If you'd like to work with me or ask questions, feel free to reach out!</p>
          <p>Email: <a href="mailto:youremail@example.com">kumarabm11@gmail.com</a></p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default About;
