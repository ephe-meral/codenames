import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Card, Col, Row } from 'react-onsenui';
import * as data from '../data/codenames187.json';

const NUM_CARDS = 12;

const addRndWord = selected => {
  if (selected.length >= data.words.length) {
    return selected;
  }

  const newWord = data.words[Math.floor(Math.random() * data.words.length)];

  if (selected.find(s => s === newWord)) {
    return addRndWord(selected);
  }
  return [newWord, ...selected];
};

const selectRndCards = count =>
  Array(count)
    .fill(0)
    .reduce(acc => addRndWord(acc), []);

const selectRndColors = count =>
  Array(count)
    .fill(0)
    .map(() => Math.floor(Math.random() * 2));

const ColCard = ({ colored, disabled, onClick, word }) => (
  <Col>
    <div css="margin: 0.25em">
      <Button
        css={`
          width: 100%;
          ${colored
            ? `
            background-color: red !important;
            opacity: 0.3 !important;
            color: white !important;`
            : ''}
        `}
        disabled={disabled}
        onClick={onClick}
      >
        <p css="text-align: center;">{word}</p>
      </Button>
    </div>
  </Col>
);

const CodeNames = () => {
  const [board, setBoard] = useState(selectRndCards(NUM_CARDS));
  const [colors, setColors] = useState(selectRndColors(NUM_CARDS));
  const [selected, setSelected] = useState(Array(NUM_CARDS).fill(0));

  if (NUM_CARDS % 2 && NUM_CARDS % 3) {
    return null;
  }

  const cols = !(NUM_CARDS % 3) ? 3 : 2;
  const rows = NUM_CARDS / cols;

  return (
    <Col>
      {Array(rows)
        .fill(null)
        .map((r, i) => (
          <Row key={`${i}`}>
            {Array(cols)
              .fill(null)
              .map((c, j) => (
                <ColCard
                  key={`${i},${j}`}
                  colored={!!selected[cols * i + j] && !!colors[cols * i + j]}
                  disabled={!!selected[cols * i + j]}
                  word={board[cols * i + j]}
                  onClick={() => setSelected(Object.assign([...selected], { [cols * i + j]: 1 }))}
                />
              ))}
          </Row>
        ))}
    </Col>
  );
};

export { CodeNames };
