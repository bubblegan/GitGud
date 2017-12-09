import React from 'react'
import { SEARCH_PROFILE_WITH_NAME } from '../queries';
import { graphql } from 'react-apollo';


function ResultList({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search.nodes.length > 0) {
    const item = search.nodes[0];

    return (
      <div className="ui card">
        <div className="image">
          <img src={item.avatarUrl} />
        </div>
        <div className="content">
          <a className="header">{item.name}</a>
          <div className="meta">
            <span className="date">{item.email}</span>
          </div>
          <div className="description">
            {item.bio}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            22 Friends
          </a>
        </div>
      </div>
    )
  }
  return (null);
}

const ResultListWithData = graphql(SEARCH_PROFILE_WITH_NAME,
  {
    props: ({ data: { loading, search } }) => ({
      loading,
      search,
    }),
    options: ({ queryString }) => ({ variables: { queryString } }),
  })(ResultList);

export default ResultListWithData;