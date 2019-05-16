import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';

import { Container, Form } from './style';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const storageRepositories = JSON.parse(localStorage.getItem('repositories'));

    if (storageRepositories) this.setState({ repositories: storageRepositories });
  }

  saveLocalStorage = async () => {
    const { repositories } = this.state;
    await localStorage.setItem('repositories', JSON.stringify(repositories));
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      this.saveLocalStorage();
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  removeRepository = async (id) => {
    const { repositories } = this.state;
    const data = [...repositories];

    const updatedata = data.filter(item => item.id !== id);

    this.setState({
      repositories: updatedata,
    });

    await localStorage.setItem('repositories', JSON.stringify(updatedata));
  };

  updateRepository = async (id) => {
    const { repositories } = this.state;

    const dataUpdate = repositories.find(repository => repository.id === id);

    try {
      const { data } = await api.get(`/repos/${dataUpdate.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
        repositoryError: false,
      });

      await this.saveLocalStorage();
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            type="text"
            placeholder="usuário/repositório"
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList repositories={repositories} removeRepository={this.removeRepository} updateRepository={this.updateRepository} />
      </Container>
    );
  }
}
