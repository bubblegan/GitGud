import { graphql } from 'react-apollo';
import { SEARCH_PROFILE_STARRED_REPO } from '../queries';
import RepoResultList from './RepoResultsList';

const RepoResultListWithData = graphql(SEARCH_PROFILE_STARRED_REPO,
  {
    options: ({ queryString, viewType }) => ({ variables: { queryString } }),
    props({ data: { loading, search, fetchMore }, viewType }) {
      return {
        loading,
        search,
        fetchMore() {
          return fetchMore({
            variables: { cursor: search.nodes[0].repositories.pageInfo.endCursor },
            updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {

              const previousSearch = previousResult.search || {};
              const currentSearch = fetchMoreResult.search || {};
              const previousRepo = previousSearch.nodes[0].repositories || {}
              const previousRepoNodes = previousRepo.nodes || [];
              const currentRepo = currentSearch.nodes[0].repositories || {}
              const currentRepoNodes = currentRepo.nodes || [];

              return {
                ...previousResult,
                search: {
                  ...previousResult.search,
                  nodes: [{
                    ...previousResult.search.nodes[0],
                    repositories: {
                      ...previousRepo,
                      nodes: [...previousRepoNodes, ...currentRepoNodes],
                      pageInfo: currentRepo.pageInfo
                    }
                  }],                  
                },
              };
            }
          });
        }
      }
    },
  })(RepoResultList);

export default RepoResultListWithData;
