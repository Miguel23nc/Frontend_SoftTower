import React from "react";
import styled from "styled-components";

const Checkbox = () => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" defaultChecked="checked" />

        <svg
          className="bell-regular"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#418fda" />
              <stop offset="100%" stopColor="#2b5993" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient1)"
            d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32z"
          />
        </svg>

        <svg
          className="bell-solid"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#418fda" />
              <stop offset="100%" stopColor="#2b5993" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient2)"
            d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32z"
          />
        </svg>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    --size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: var(--size);
    user-select: none;
  }

  .container .bell-regular {
    position: absolute;
    animation: keyframes-fill 0.5s;
  }

  .container .bell-solid {
    position: absolute;
    display: none;
    animation: keyframes-fill 0.5s;
  }

  /* ------ On hover event ------ */
  .container:hover .bell-regular {
    display: none;
  }

  .container:hover .bell-solid {
    display: block;
  }

  /* ------ Hide the default checkbox ------ */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* ------ Animation ------ */
  @keyframes keyframes-fill {
    0% {
      opacity: 0;
    }

    25% {
      transform: rotate(25deg);
    }

    50% {
      transform: rotate(-20deg) scale(1.2);
    }

    75% {
      transform: rotate(15deg);
    }
  }
`;

export default Checkbox;
