import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Col, List, ListItem, Row, SearchInput } from 'react-onsenui';
import { Word2Vec } from '../nlp/Word2Vec';

const ResultList = ({ results }) => (
  <List
    css="width: 100%"
    dataSource={results}
    renderRow={res => (
      <ListItem>
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

  return (
    <Col css="height: 100%">
      <Row css="margin-bottom: 0.5em">
        <SearchInput
          css="width: 100%"
          value={input}
          placeholder="keyword"
          onChange={event => {
            setInput(event.target.value);
            setResults(Word2Vec.nearestAverage(event.target.value.trim().split(/\s+/)));
          }}
        />
      </Row>
      <Row>
        <ResultList results={results} />
      </Row>
    </Col>
  );
};

export { Average };
