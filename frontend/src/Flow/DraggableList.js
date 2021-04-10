import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { Quote as QuoteType } from "../types";
import Button from "@material-ui/core/Button";

const getItems = (actions) =>
    Array.from({ length: actions.length }, (v, k) => k).map((k) => ({
        id: `id-${k}}`,
        content: `${actions[k]}`,
    }));

const grid = 4;

const QuoteItem = styled.div`
    // width: 400px;
    border: 1px solid grey;
    background-color: #f1faff;
    margin-left: auto;
    margin-right: auto;

    padding: ${grid}px;
    margin-bottom: ${grid}px;

    /* used for positioning the after content */
    position: relative;
    /* stylelint-disable  comment-empty-line-before */
    /* add little portal indicator when in a portal */
    ${(props) =>
        props.inPortal
            ? `
    ::after {
      position: absolute;
      background: lightgreen;
      padding: ${grid}px;
      bottom: 0;
      right: 0;
      content: "in portal";
    }
  `
            : ""}/* stylelint-enable */;
`;

export default function App(props) {
    // console.log("QuoteApp: " + props.pActions.actions);
    // console.log(props);
    const [state, setState] = useState(props.pActions);

    const removeAction = (quote) => {
        // console.log("remove");
        // console.log(quote.content);

        const currentState = state.actions;
        // console.log(currentState);
        const index = currentState.indexOf(quote.content);
        currentState.splice(index, 1);
        // console.log(currentState);

        setState({
            actions: currentState,
        });
    };

    function Quote({ quote, index }) {
        return (
            <Draggable draggableId={quote.id} index={index}>
                {(provided) => (
                    <QuoteItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {quote.content}
                        <Button
                            onClick={() => {
                                removeAction(quote);
                            }}
                        >
                            X
                        </Button>
                    </QuoteItem>
                )}
            </Draggable>
        );
    }

    const QuoteList = React.memo(function QuoteList({ quotes }) {
        return quotes.map((quote: QuoteType, index: number) => (
            <Quote quote={quote} index={index} key={quote.id} />
        ));
    });

    function onDragEnd(input) {
        if (!input.destination) {
            return;
        }

        if (input.destination.index === input.source.index) {
            return;
        }

        const result = state.actions;
        const [removed] = result.splice(input.source.index, 1);
        result.splice(input.destination.index, 0, removed);

        setState({
            actions: result,
        });
    }

    return (
        // <DragDropContext >
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <QuoteList quotes={getItems(state.actions)} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
