import { graphql } from 'react-apollo';
import { SEARCH_REPO_WITH_LANGUAGES } from '../queries';
import RepoResultList from './RepoResultsList';


const RepoResultListWithData = graphql(SEARCH_REPO_WITH_LANGUAGES,
  {
    options: ({ queryString, viewType }) => ({ variables: { queryString } }),
    props({ data: { loading, search, fetchMore }, viewType }) {
      return {
        loading,
        search,
        fetchMore() {
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
  })(RepoResultList);

export default RepoResultListWithData;
