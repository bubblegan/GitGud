import React from 'react'
import { Pie } from 'react-chartjs-2';
import { SEARCH_PROFILE_WITH_NAME } from '../queries';
import { graphql } from 'react-apollo';
import { groupBy } from 'lodash';


function ProfileCard({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search.nodes.length > 0) {

    const item = search.nodes[0];
    let default_colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

    //Gonna Refactor out    
    const starredRepoList = groupBy(item.starredRepositories.nodes, "primaryLanguage.name");
    let repoLanguageArray = [];
    let repoLanguageCount = [];
    for (let RepoLanguage in starredRepoList) {
      repoLanguageCount.push(starredRepoList[RepoLanguage].length)
      if (RepoLanguage === 'undefined')
        RepoLanguage = 'Others'
      repoLanguageArray.push(RepoLanguage);

    }

    return (
      <div className="ui two column stackable grid">
      <div className="ui cards">
        <div className="ui card">
          <div className="image" >
            <img src={item.avatarUrl} alt='profile pic' />
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
              {item.followers.totalCount} Followers
          </a>
          </div>
        </div>
      </div>
      <div className='ui column segment' style={{marginTop : 0 + '%'}}>
      <Pie
        data={{
          labels: repoLanguageArray,
          datasets: [{
            data: repoLanguageCount,
            backgroundColor: default_colors,
            hoverBackgroundColor: default_colors
          }]
        }}
      />
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
  })(ProfileCard);

export default ResultListWithData;