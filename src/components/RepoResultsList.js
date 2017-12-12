import React from 'react'
import { SEARCH_REPO_WITH_LANGUAGES } from '../queries';
import { graphql } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ResultList({ loading, search, fetchMore }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search) {
    const nodeList = search.nodes.map((item) => {
      return (

        <div className='card' key={item.name}>
          <div className="content">
            <img className="right floated mini ui image" src={item.owner.avatarUrl} alt="avatar" />
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
      <InfiniteScroll
        loadMore={fetchMore}
        hasMore={search.pageInfo.hasNextPage}
        loader={<p>Loading...</p>}
        element={'div'}
        className='ui cards'
      >
        {nodeList}
      </InfiniteScroll>
    );
  }
  return (null);
}

const RepoResultListWithData = graphql(SEARCH_REPO_WITH_LANGUAGES,
  {
    options: ({ queryString }) => ({ variables: { queryString } }),
    props({ data: { loading, search, fetchMore } }) 
    {
      return{
        loading,
        search,
        fetchMore(){
          return fetchMore({
            variables: { cursor: search.pageInfo.endCursor },
            updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
              const previousSearch = previousResult.search || {};
              const currentSearch = fetchMoreResult.search || {};
              const previousNodes = previousSearch.nodes || [];
              const currentNodes = currentSearch.nodes || [];
              return {
                ...previousResult,
                search: {
                  ...previousSearch,
                  nodes: [...previousNodes, ...currentNodes],
                  pageInfo: currentSearch.pageInfo,
                },
              };
            }
          });
        }
      }
    },
  })(ResultList);

export default RepoResultListWithData;