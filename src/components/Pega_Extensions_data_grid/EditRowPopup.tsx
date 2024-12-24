import React, { useState } from 'react';
import type { EditRowPopupProps, Data } from './interfaces';


const EditRowPopup: React.FC<EditRowPopupProps> = ({ rowData, onUpdate, onClose, savablePage, uniqueKey }) => {

  // eslint-disable-next-line no-console
  console.log(rowData);
  // eslint-disable-next-line no-console
  console.log(uniqueKey);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Data>(Object.fromEntries(Object.entries(rowData).filter(([key]) => !['pxUpdateDateTime', 'pxCreateDateTime','pxCommitDateTime','pxSaveDateTime'].includes(key))) || {});
  const handleInputChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    PCore.getRestClient().invokeRestApi('updateDataObject',{
      queryPayload: {
        data_view_ID: savablePage
      },
      body:{
        data: { ...formData }
      }
    })
    .then((response) => {
      setIsLoading(false);
      onUpdate(response);
    })
    .catch(() => {
      setIsLoading(false);
    });
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
        }}
      >
        <h3>Edit Row</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {Object.keys(formData).map((key : any) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label htmlFor={key} style={{ display: 'block', fontWeight: 'bold' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                type="text"
                value={formData[key] || ''}
                onChange={(e) => handleInputChange(key, e.target.value)}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="button" onClick={handleSubmit} style={{ marginLeft: '10px' }}>{isLoading ? 'Updating...' : 'Update'}</button>
      </div>
    </div>
  );
};

export default EditRowPopup;
