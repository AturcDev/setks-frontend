import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [artworks, setArtworks] = useState([]);

  // API'den veri çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5267/api/artworks');
        const result = await response.json();
        setArtworks(result);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h1>Sanat Eserleri</h1>
      <Row>
        {artworks.map((artwork) => (
          <Col key={artwork.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={artwork.imageUrl || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{artwork.name}</Card.Title>
                <Card.Text>
                  <strong>Sanatçı:</strong> {artwork.artist}<br />
                  <strong>Yıl:</strong> {artwork.year}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;