import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, ToolbarButton } from 'react-onsenui';
import * as data from '../data/codenames187.json';
import { Suggest } from '../nlp/Suggest';
import { TabPage } from './TabPage';

const NUM_CARDS = 18;

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

const CardTitleContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.div`
  text-align: center;
  white-space: normal;
  line-height: 1em;
`;

const Card = ({ colored, disabled, onClick, word }) => (
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
    <CardTitleContainer>
      <CardTitle lang="en">{word}</CardTitle>
    </CardTitleContainer>
  </Button>
);

const CodeNames = () => {
  const [board, setBoard] = useState(selectRndCards(NUM_CARDS));
  const [colors, setColors] = useState(selectRndColors(NUM_CARDS));
  const [selected, setSelected] = useState(Array(NUM_CARDS).fill(0));
  const [hint, setHint] = useState(
    Suggest.getAssociation(
      board.filter((c, i) => !!colors[i] && !selected[i]),
      board.filter((c, i) => !colors[i] && !selected[i])
    )
  );

  if (NUM_CARDS % 2 && NUM_CARDS % 3) {
    return null;
  }

  const cols = !(NUM_CARDS % 3) ? 3 : 2;
  const rows = NUM_CARDS / cols;

  const reload = () => {
    setBoard(selectRndCards(NUM_CARDS));
    setColors(selectRndColors(NUM_CARDS));
    setSelected(Array(NUM_CARDS).fill(0));
  };

  const nextHint = () => {
    setHint(
      Suggest.getAssociation(
        board.filter((c, i) => !!colors[i] && !selected[i]),
        board.filter((c, i) => !colors[i] && !selected[i])
      )
    );
  };

  return (
    <TabPage
      label="CodeNames"
      leftButton={<ToolbarButton onClick={reload}>Reload</ToolbarButton>}
      rightButton={<ToolbarButton onClick={nextHint}>Hint</ToolbarButton>}
    >
      <div css="display: flex; flex-direction: column; height: 100%">
        <p>Hint: {hint}</p>
        <div
          className="break-text"
          css={`
            display: grid;
            grid-template: repeat(${rows}, 1fr) / repeat(${cols}, minmax(0, 1fr));
            grid-gap: 0.5em;
            height: 100%;
          `}
        >
          {board.map((card, i) => (
            <Card
              key={`${i}`}
              colored={!!selected[i] && !!colors[i]}
              disabled={!!selected[i]}
              word={board[i]}
              onClick={() => setSelected(Object.assign([...selected], { [i]: 1 }))}
            />
          ))}
        </div>
      </div>
    </TabPage>
  );
};

export { CodeNames };
