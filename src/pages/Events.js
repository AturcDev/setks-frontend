import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EtkinlikEkle = () => {
  const [etkinlik, setEtkinlik] = useState({
    adi: '',
    tur: 'muzayede', // veya 'koleksiyon'
    eserler: [],
  });

  const handleSubmit = () => {
    // Etkinliği kaydet
    console.log('Etkinlik kaydedildi:', etkinlik);
  };

  return (
    <div className="container mt-5">
      <h1>Etkinlik Ekle</h1>
      <Form>
        <Form.Group controlId="formAdi">
          <Form.Label>Etkinlik Adı</Form.Label>
          <Form.Control
            type="text"
            value={etkinlik.adi}
            onChange={(e) => setEtkinlik({ ...etkinlik, adi: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTur">
          <Form.Label>Tür</Form.Label>
          <Form.Select
            value={etkinlik.tur}
            onChange={(e) => setEtkinlik({ ...etkinlik, tur: e.target.value })}
          >
            <option value="muzayede">Müzayede</option>
            <option value="koleksiyon">Koleksiyon</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Kaydet
        </Button>
      </Form>
    </div>
  );
};

export default EtkinlikEkle;