import gql from 'graphql-tag';



export const SEARCH_REPO_WITH_LANGUAGES = gql`query TopSearchLanguage($queryString : String!, $cursor : String){
    search(query: $queryString ,type : REPOSITORY, first: 20, after : $cursor) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          name
          url
          description
          createdAt
          pushedAt
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

export const SEARCH_PROFILE_WITH_NAME = gql` query ProfileSearch($queryString : String!){
    search(query: $queryString ,type : USER, first: 1) {
      nodes {
        ... on User {
          name
          email
          login
          bio
          url
          avatarUrl
          followers{
            totalCount
          }
          starredRepositories(first: 80){
            totalCount
            nodes{
              ... on Repository{                
                name
                createdAt
                primaryLanguage {
                  name
                }
              }              
            }
          }
          repositories(first: 50, orderBy: {field: CREATED_AT, direction: DESC}){
            totalCount
            nodes {
              ... on Repository{
                name
                isFork
                createdAt
                repositoryTopics(first:100){
                  nodes{
                    topic{
                      name
                    }
                  }
                }
                primaryLanguage {
                  name
                }
                languages(first: 5){
                  nodes{
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }`

export const PROFILE_LIMIT_DETAIL = gql` query {
    viewer {
      login
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
  `;
