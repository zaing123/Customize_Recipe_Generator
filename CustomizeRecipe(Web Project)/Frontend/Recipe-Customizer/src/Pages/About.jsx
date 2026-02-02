import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <h1>👩‍🍳 Welcome to Recipe Customizer</h1>
        <p>Your smart kitchen companion 🍳✨</p>
      </div>

      <div className="about-content">
        <p>
          <strong>Recipe Customizer</strong> helps you create tasty meals using what you already have at home. No more guessing or wasting food. Just pick ingredients and let us suggest something delicious! 🥦🍗🧄
        </p>

        <p>
          Whether you're new to cooking or a master chef, this app is made to inspire you to be creative, efficient, and confident in your kitchen. ❤️👨‍🍳
        </p>

        <p>
          👇 Try customizing your own recipe or pick ingredients to generate one instantly!
        </p>
      </div>
    </div>
  );
};

export default About;
