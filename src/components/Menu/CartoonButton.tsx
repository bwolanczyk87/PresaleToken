// Import React and necessary components from Mantine
import React from 'react';
import { Button } from '@mantine/core';

// TypeScript interface for props
interface CartoonButtonProps {
  label: string;
  onClick: () => void; // Example click handler type
}

const CartoonButton: React.FC<CartoonButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      styles={(theme) => ({
        root: {
          position: 'relative',
          backgroundColor: theme.colors.cyan[9], // Consistent bright and playful color
          border: 'none',
          color: theme.colors.red[5],
          fontWeight: 'bold',
          fontSize: '20px',
          fontFamily: '"Comic Sans MS", "Comic Neue", cursive', // Comic-style font
          padding: '10px 20px',
          borderRadius: '0px', // Sharp edges for a cubic appearance
          textTransform: 'uppercase',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Shadow for 3D effect
          transform: 'rotateY(-20deg) rotateX(10deg)', // Initial 3D tilt
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:before': { // Simulating the left side of the cube
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '10px',
            height: '100%',
            backgroundColor: theme.colors.yellow[4],
            transform: 'translateX(-100%) rotateY(90deg)',
            transformOrigin: 'left',
            boxShadow: '-5px 0 10px rgba(0, 0, 0, 0.1)',
          },
          '&:hover': {
            transform: 'rotateY(-20deg) rotateX(10deg) translateY(-5px) scale(1.05)', // Enhanced 3D effect on hover
            boxShadow: '10px 5px 15px', // Darker and more pronounced shadow for depth
          },
          '&:active': {
            transform: 'rotateY(-20deg) rotateX(10deg) translateY(2px) scale(0.97)', // Press down effect
            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', // Reduced shadow when pressed
          }
        },
      })}
    >
      {label}
    </Button>
  );
};

export default CartoonButton;
