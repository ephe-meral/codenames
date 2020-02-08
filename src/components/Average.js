import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Col, List, ListItem, Row, SearchInput } from 'react-onsenui';
import { Word2Vec } from '../nlp/Word2Vec';
import { TabPage } from './TabPage';

const ResultList = ({ results, onTap }) => (
  <List
    css="width: 100%"
    dataSource={results}
    renderRow={res => (
      <ListItem tappable onClick={() => onTap(res.word)}>
        <div className="left">{res.word}</div>
        <div css="color: gray" className="right">
          {Number.parseFloat(res.distance).toFixed(4)}
        </div>
      </ListItem>
    )}
  />
);

const Average = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState();

  const update = word => {
    setInput(word);
    setResults(Word2Vec.nearestAverage(word.trim().split(/\s+/)));
  };

  return (
    <TabPage label="Average">
      <Col css="height: 100%">
        <Row css="margin-bottom: 0.5em">
          <SearchInput
            css="width: 100%"
            value={input}
            placeholder="keyword"
            onChange={event => {
              update(event.target.value);
            }}
          />
        </Row>
        <Row>
          <ResultList results={results} onTap={update} />
        </Row>
      </Col>
    </TabPage>
  );
};

export { Average };
