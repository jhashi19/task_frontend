import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import Header from './Header';

const Task = () => {
  return (
    <Container maxWidth='lg'>
      <Header title='Task List' />
    </Container>
  )
}

export default Task;
