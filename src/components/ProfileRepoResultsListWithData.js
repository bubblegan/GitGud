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
            variables: { cursor: search.nodes[0].starredRepositories.pageInfo.endCursor },
            updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
              console.log(previousResult);
              console.log(fetchMoreResult);

              const previousSearch = previousResult.search || {};
              const currentSearch = fetchMoreResult.search || {};
              const previousRepo = previousSearch.nodes[0].starredRepositories || {}
              const previousRepoNodes = previousRepo.nodes || [];
              const currentRepo = currentSearch.nodes[0].starredRepositories || {}
              const currentRepoNodes = currentRepo.nodes || [];
              const previousNodes = previousSearch.nodes || [];
              const currentNodes = currentSearch.nodes || [];
              return {
                ...previousResult,
                search: {
                  ...previousSearch,
                  starredRepositories: {
                    ...previousRepo,
                    nodes: [...previousRepoNodes, ...currentRepoNodes],
                    pageInfo: currentRepo.pageInfo
                  }
                },
              };
            }
          });
        }
      }
    },
  })(RepoResultList);

export default RepoResultListWithData;
