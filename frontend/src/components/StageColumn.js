import { Droppable } from 'react-beautiful-dnd';
import { Card, Col } from 'react-bootstrap';
import CandidateCard from './CandidateCard';

const StageColumn = ({ stage, index, onCardClick }) => (
    <Col md={3}>
        <Droppable droppableId={`${index}`}>
            {(provided) => (
                <Card className="mb-4" ref={provided.innerRef} {...provided.droppableProps} data-cy="stage-column" data-stage-id={stage.id}>
                    <Card.Header className="text-center" data-cy="column-title">{stage.title}</Card.Header>
                    <Card.Body>
                        {stage.candidates.map((candidate, idx) => (
                            <CandidateCard key={candidate.id} candidate={candidate} index={idx} onClick={onCardClick} />
                        ))}
                        {provided.placeholder}
                    </Card.Body>
                </Card>
            )}
        </Droppable>
    </Col>
);

export default StageColumn;
