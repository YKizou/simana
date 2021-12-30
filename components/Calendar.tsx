import React, { FC, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import DayColumn from './DayColumn'
import { InitialColumnSize } from '../common/constants'
import { getWeekDays } from '../common/utils';
import { CalendarState, IAction, TaskState } from '../types';
import { DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';

interface Props {
    taskStore: TaskState
    calendarStore: CalendarState
    taskDispatch: (action: IAction) => void
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 250
});

const CalendarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6,16.66666%);
`

const Calendar: FC<Props> = ({ taskDispatch, taskStore, calendarStore }) => {
    const onDragEnd = (result: DropResult): void => {
        console.log('ondragend result', result);
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        taskDispatch({
            type: 'MOVE_TASK',
            data: {
                source,
                destination
            }
        });
    }

    const dayColumns = [];
    const days = getWeekDays(calendarStore);
    for (let i = 0; i < days.length; i++) {
        const element = days[i];
        const dayTasks = taskStore[element.timestamp];
        dayColumns.push(
            <Droppable
                key={element.timestamp}
                droppableId={element.timestamp.toString()}
            >
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                        ref={provided.innerRef}
                        //style={getListStyle}
                        {...provided.droppableProps}
                    >
                        <DayColumn
                            date={element}
                            key={i}
                            size={i < 5 ? InitialColumnSize.Full : InitialColumnSize.Half}
                            taskDispatch={taskDispatch}
                            tasks={dayTasks}
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );

    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <CalendarWrapper className="flex flex-1">
                {dayColumns.slice(0, 5)}
                <div>
                    {dayColumns.slice(-2)}
                </div>
            </CalendarWrapper>
        </DragDropContext>
    )
}

export default Calendar;