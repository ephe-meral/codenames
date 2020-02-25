import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Button, ToolbarButton } from 'react-onsenui';
import { CodeWords } from '../nlp/CodeWords';
import { Clue } from '../nlp/Clue';
import { TabPage } from './TabPage';

const NUM_CARDS = 18;

const addRndWord = selected => {
  if (selected.length >= CodeWords.length) {
    return selected;
  }

  const newWord = CodeWords[Math.floor(Math.random() * CodeWords.length)];

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

const generateClue = (board, colors, selected) => {
  const toChoose = board.filter((c, i) => !!colors[i] && !selected[i]);
  const toAvoid = board.filter((c, i) => !colors[i] && !selected[i]);

  if (!toChoose.length || !toAvoid.length) {
    return !toChoose.length ? 'You won!' : 'You lost!';
  }

  const [clue, keys] = Clue.getClue(toChoose, toAvoid);
  return `${clue}, ${keys.length}`;
};

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
  const [clue, setClue] = useState('...');

  useEffect(() => {
    setClue(generateClue(board, colors, selected));
  }, [board, colors, selected]);

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

  return (
    <TabPage
      label="CodeNames"
      leftButton={<ToolbarButton icon="md-refresh" onClick={reload} />}
      rightButton={
        <ToolbarButton onClick={() => setClue(generateClue(board, colors, selected))}>
          Clue
        </ToolbarButton>
      }
    >
      <div css="display: flex; flex-direction: column; height: 100%">
        <>
          <p>Clue: {clue}</p>
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
                onClick={() => {
                  setSelected(Object.assign([...selected], { [i]: 1 }));
                  setClue('...');
                }}
              />
            ))}
          </div>
        </>
      </div>
    </TabPage>
  );
};

export { CodeNames };
