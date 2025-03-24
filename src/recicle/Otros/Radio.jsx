import React, { useState } from "react";
import styled from "styled-components";

const RadioOption = ({ opciones, selectedOption, onChange }) => {
  return (
    <StyledWrapper>
      <div className="radio-inputs">
        {opciones?.map((option) => (
          <label key={option} className="radio">
            <input
              type="radio"
              name="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => onChange(option)}
            />
            <span className="name">{option}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    min-width: 400px;
    max-width: 600px;
    font-size: 18px;
    font-weight: 600;
  }

  .radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs .radio input {
    display: none;
  }

  .radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 1rem;
    color: rgba(51, 65, 85, 1);
    transition: all 0.3s ease-in-out;
  }

  .radio-inputs .radio input:checked + .name {
    background-color: #fff;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export default RadioOption;
