import React from 'react';
import { Card } from 'react-bootstrap';

const CandidateCard = ({ candidate, onClick }) => {
    return (
        <Card 
            className="mb-2 shadow-sm" 
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            data-cy={`candidate-${candidate.id}`}
            data-candidate-id={candidate.id}
            data-application-id={candidate.applicationId}
        >
            <Card.Body className="p-2">
                <Card.Title className="h6">{candidate.name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Rating: {candidate.rating || 'N/A'}</small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CandidateCard;
