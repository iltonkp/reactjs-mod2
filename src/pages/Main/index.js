import React, { Component } from 'react';

import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';

import { Container, Form } from './style';

export default class Main extends Component {
  state = {
    repositories: [],
  };

  render() {
    const { repositories } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form>
          <input type="text" placeholder="usuário/repositório" />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
