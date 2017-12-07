import gql from 'graphql-tag';



export const SEARCH_REPO_WITH_LANGUAGES = gql`query TopSearchLanguage($queryString : String!){
    search(query: $queryString ,type : REPOSITORY, first: 20) {
      repositoryCount
      pageInfo {
        hasNextPage
      }
      nodes {
        ... on Repository {
          name
          url
          description
          watchers{
            totalCount
          }
          stargazers {
            totalCount
          }
          primaryLanguage {
            name
          }
          owner{
            url
            login
            avatarUrl
          }
        }
      }
  }
  }`

