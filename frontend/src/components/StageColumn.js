import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const StageColumn = ({ stage, index, onCardClick }) => {
    return (
        <Col md={3} className="mb-4" data-cy={`stage-column-${index}`}>
            <Card className="shadow-sm h-100">
                <Card.Header className="bg-light" data-cy={`stage-title-${index}`}>
                    {stage.title}
                </Card.Header>
                <Card.Body>
                    <Droppable droppableId={index.toString()}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-vh-50"
                                data-cy={`droppable-area-${index}`}
                            >
                                {stage.candidates.map((candidate, candidateIndex) => (
                                    <Draggable
                                        key={candidate.id}
                                        draggableId={candidate.id}
                                        index={candidateIndex}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                data-cy={`candidate-card-${candidate.id}`}
                                            >
                                                <CandidateCard
                                                    candidate={candidate}
                                                    onClick={() => onCardClick(candidate)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default StageColumn;
