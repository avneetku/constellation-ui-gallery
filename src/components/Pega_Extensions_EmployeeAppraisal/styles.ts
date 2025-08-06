// style.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #fff;
    margin: 0;
    padding: 20px;
    color: #333;
  }

  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    color: #0b66c2;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
    color: #000;
  }

  button {
    background-color: #70707026;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.3s;
  }

  button:hover {
    background-color: #1564b3;
    color: white;
  }

  .notice {
    font-style: italic;
    color: gray;
    margin-bottom: 20px;
  }

  input[type="text"] {
    padding: 8px 12px;
    width: 300px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1em;
  }

  /* Accordion styles */
  .accordion-item {
    background: white;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
  }

  .accordion-header {
    padding: 12px 15px;
    background: #e3f2fd;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    color: #0b66c2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .accordion-header:hover {
    background: #bbdefb;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding: 0 15px;
    background: #fff;
  }

  .accordion-content.show {
    padding: 15px;
    max-height: 1000px;
    transition: max-height 0.5s ease;
  }

  .kra-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .kra-table th, .kra-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  .kra-table th {
    background-color: #f5f5f5;
    color: #000;
  }

  .comments {
    margin-top: 15px;
    font-size: 0.95em;
  }

  .comments h4 {
    margin-bottom: 5px;
    color: #0b66c2;
  }

  .comments p {
    background-color: #f1f1f1;
    padding: 10px;
    border-left: 4px solid #0b66c2;
    margin-bottom: 10px;
  }
`;

export default GlobalStyle;
