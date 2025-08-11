import React, { useState } from 'react';

interface KRA {
  name: string;
  weightage: string;
  selfRating: number;
  managerRating: number;
  finalRating: number;
}

interface Appraisal {
  yearRange: string;
  finalRating: number;
  score: number;
  kras: KRA[];
  employeeComments: string;
  managerComments: string;
  hrComments: string;
}

interface AppraisalsProps {
  EmployeeName: string | null;
  employeeId: string | null;
  appraisals: Appraisal[];
}

const Appraisals: React.FC<AppraisalsProps> = ({ EmployeeName, employeeId, appraisals }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
    return stars;
  };

  if (!appraisals || appraisals.length === 0) return null;

  return (
    <div id="appraisalDetailsContainer">
      <h2>Appraisals for {EmployeeName} ({employeeId})</h2>
      {appraisals.map((appraisal, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            {appraisal.yearRange} — Final Rating: {renderStars(appraisal.finalRating)} — Score: {appraisal.score}%
          </div>

          <div
            className={`accordion-content ${activeIndex === index ? 'show' : ''}`}
          >
            {activeIndex === index && (
              <>
                <table className="kra-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>KRA</th>
                      <th>Weightage</th>
                      <th>Self Rating</th>
                      <th>Manager Rating</th>
                      <th>Final Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appraisal.kras.map((kra, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: 'left' }}>{kra.name}</td>
                        <td>{kra.weightage}</td>
                        <td>{kra.selfRating}</td>
                        <td>{kra.managerRating}</td>
                        <td>{kra.finalRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="comments">
                  <h4>Employee Comments</h4>
                  <p>{appraisal.employeeComments}</p>
                  <h4>Manager Comments</h4>
                  <p>{appraisal.managerComments}</p>
                  <h4>HR Final Comments</h4>
                  <p>{appraisal.hrComments}</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appraisals;
