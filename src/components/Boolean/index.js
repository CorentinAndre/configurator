/* eslint-disable filenames/match-exported */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StdinContext, Box, Color, Text, Static } from 'ink';
import { cross, tick } from 'figures';
import { BooleanShape } from './shapes';

const isTrue = input => /^[ty1]/i.test(input);
const isFalse = input => /^[fn0]/i.test(input);

const handleInput = (data, onInput, setResult) => {
  const s = String(data);
  if (isTrue(s) || isFalse(s)) {
    setResult(isTrue(s));
    onInput(isTrue(s));
  }
};

const Layout = ({ icon, question, response }) => {
  return (
    <Box>
      {icon}
      {'\u00A0'}
      {question}
      {'\u00A0›\u00A0'}
      {response}
    </Box>
  );
};

Layout.propTypes = {
  icon: PropTypes.node,
  question: PropTypes.node,
  response: PropTypes.node,
};

const BooleanIcon = ({ result }) => {
  if (result === null) return <Color blue>?</Color>;
  return result ? <Color green>{tick}</Color> : <Color red>{cross}</Color>;
};

BooleanIcon.propTypes = {
  result: PropTypes.boolean || null,
};

const Response = ({ result, truthy, falsy }) => {
  if (result === null) return null;
  return result ? (
    <Color green>{truthy || 'true'}</Color>
  ) : (
    <Color red>{falsy || 'false'}</Color>
  );
};

Response.propTypes = {
  result: PropTypes.boolean || null,
  truthy: BooleanShape.truthy,
  falsy: BooleanShape.falsy,
};

const Boolean = ({
  question,
  truthy,
  falsy,
  setRawMode,
  stdin,
  onInput,
  withPersistingPromt,
}) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const dataHandler = data => handleInput(data, onInput, setResult);
    setRawMode(true);
    stdin.on('data', dataHandler);

    return () => {
      setRawMode(false);
      stdin.removeListener('data', dataHandler);
    };
  });

  const Content = () => (
    <Layout
      icon={<BooleanIcon result={result} />}
      question={<Text bold>{question || 'True or false ?'}</Text>}
      response={<Response result={result} truthy={truthy} falsy={falsy} />}
    />
  );

  return (
    <Box>
      <Content />
      {withPersistingPromt && result !== null && (
        <Static>
          <Content />
        </Static>
      )}
    </Box>
  );
};

Boolean.propTypes = {
  setRawMode: PropTypes.func.isRequired,
  stdin: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  ...BooleanShape,
};

const BooleanWithStdin = ({
  question,
  falsy,
  truthy,
  withPersistingPromt,
  onInput,
}) => {
  return (
    <StdinContext.Consumer>
      {stdInProps => (
        <Boolean
          {...stdInProps}
          question={question}
          falsy={falsy}
          truthy={truthy}
          withPersistingPromt={withPersistingPromt}
          onInput={onInput}
        />
      )}
    </StdinContext.Consumer>
  );
};

BooleanWithStdin.propTypes = {
  ...BooleanShape,
};

export default BooleanWithStdin;
