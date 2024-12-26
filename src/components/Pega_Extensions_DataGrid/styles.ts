// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;

    .data-container.error p, .data-container.error h3 {
      color: red;
    }

    .data-container ul {
      display: inline-block;
      text-align: left;
      margin: 10px auto;
      padding: 0;
      list-style-type: disc;
    }

    .mt10 {
      margin-top: 10px;
    }

    .close-btn {
      position:absolute;
      right:10px;
      min-width: 10px;
      min-height: 10px;
      padding: 0px;
      border-radius: 29%;
      background-color: #8f8f8f;
      border: none;
      opacity: 0.8;
      color: #fff;
      transition: 0.3s ease-out;
      cursor: pointer;
    }

    button {
        outline: none;
        text-decoration: none;
        transition-property: background-color, color, box-shadow;
        transition-duration: calc(0.5* 0.25s);
        transition-timing-function: cubic-bezier(0.4,0.6,0.1,1);
        cursor: pointer;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        min-width: 32px;
        border: 0.0625rem solid transparent;
        border-radius: calc(0.5rem* 0.5);
        -webkit-user-select: none;
        user-select: none;
        padding: 0 1rem;
        --button-background-color: #ffffff;
        color: #076bc9;
        background-color: #ffffff;
        border-color: #076bc9;
    }

    input[type="text"] {
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
      margin-top: 5px;
      border: 1px #b6b6b6 solid;
      height: 40px;
      outline: none;
      border-radius: 4px;
    }

    tbody > tr > td, thead > tr > th {
      padding: 10px; border: 1px solid rgb(221, 221, 221);
    }

    input[type="checkbox"] {
      height: 15px;
      width: 15px;
      cursor: pointer;
    }

    div.data-container {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding: 20px;
      color: #646464;
      background-color: #fff;
      border-radius: 8px; /* Rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    }

    div.data-container.error {
      color: #646464 !important;
    }

    .popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backgroundColor: rgba(0, 0, 0, 0.5);
      display: flex;
      justifyContent: center;
      alignItems: center;
    }
  `;
});
