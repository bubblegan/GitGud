import React from 'react'
import { SEARCH_REPO_WITH_LANGUAGES} from '../queries';
import { graphql } from 'react-apollo';


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ResultList({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search) {
    const nodeList = search.nodes.map((item) => {
      return (
        <div className='card' key={item.name}>
          <div className="content">
          <img className="right floated mini ui image" src={item.owner.avatarUrl} alt="avatar"/>
            <a className="header" href={item.url} target="_blank">{item.name} </a>
            <div className="meta">
              <a href={item.owner.url} target="_blank" >{item.owner.login}</a>
            </div>
            <div className="description">
              <p>{item.description}</p>
            </div>
          </div>
          <div className="extra content">
            <span> {numberWithCommas(item.stargazers.totalCount)} <i className="star icon"></i> </span>
            <span className="right floated"> {numberWithCommas(item.watchers.totalCount)} Watchers </span>
          </div>
        </div>
      )
    });
    return (
      <div className="ui cards">{nodeList}</div>
    );
  }
  return (null);
}

const RepoResultListWithData = graphql(SEARCH_REPO_WITH_LANGUAGES,
  {
    props: ({ data: { loading, search } }) => ({
      loading,
      search,
    }),
    options: ({ queryString }) => ({ variables: { queryString } }),
  })(ResultList);

export default RepoResultListWithData;