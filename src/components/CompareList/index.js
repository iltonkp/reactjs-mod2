import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { Container, Repository } from './style';

const ComapareList = ({ repositories, removeRepository, updateRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            <i className="fa fa-star" /> {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            <i className="fa fa-star" /> {repository.forks_count} <small>forks</small>
          </li>
          <li>
            <i className="fa fa-star" /> {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            <i className="fa fa-star" /> {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>

        <div className="actions">
          <Button title="Atualizar" color="#50c1e9" action={updateRepository} data={repository} />
          <Button title="Excluir" color="#ed5485" action={removeRepository} data={repository} />
        </div>
      </Repository>
    ))}
  </Container>
);

ComapareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,

  updateRepository: PropTypes.func.isRequired,
  removeRepository: PropTypes.func.isRequired,
};

export default ComapareList;
