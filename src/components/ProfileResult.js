import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { SEARCH_PROFILE_WITH_NAME } from '../queries';
import { graphql } from 'react-apollo';
import { groupBy } from 'lodash';



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function ProfileCard({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search.nodes.length > 0) {


    const item = search.nodes[0];
    let default_colors = shuffle(['#AB7967', '#C594C5', '#6699CC', '#5FB3B3', '#99C794', '#FAC863', '#F99157', '#EC5f67', '#D8DEE9', '#CDD3DE', '#C0C5CE']);
    
    //Gonna Refactor out - starred Repos
    const starredRepoList = groupBy(item.starredRepositories.nodes, "primaryLanguage.name");
    let repoLanguageArray = [];
    let repoLanguageCount = [];
    for (let RepoLanguage in starredRepoList) {
      repoLanguageCount.push(starredRepoList[RepoLanguage].length)
      if (RepoLanguage === 'undefined')
        RepoLanguage = 'Others'
        repoLanguageArray.push(RepoLanguage);
    }

    //Personal Repos
    const personalRepoList = groupBy(item.repositories.nodes, "primaryLanguage.name");
    let personalRepoLanguageArray = [];
    let personalRepoLanguageCount = [];
    for (let RepoLanguage in personalRepoList) {
      personalRepoLanguageCount.push(personalRepoList[RepoLanguage].length)
      if (RepoLanguage === 'undefined')
        RepoLanguage = 'Others'
        personalRepoLanguageArray.push(RepoLanguage);
    }


    return (
      <div className="ui two column stackable grid">
        <div className="four wide column">
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
        </div>
        <div className="twelve wide column">
          <div className="ui two column stackable grid">
            <div className='column' style={{ marginTop: 1 + '%', paddingTop: 0 + '%' }}>
              <h3 style={{ marginTop: 2 + 'px' }}>Starred Repos Language</h3>
              <Doughnut
                data={{
                  labels: repoLanguageArray,
                  datasets: [{
                    data: repoLanguageCount,
                    backgroundColor: default_colors,
                    hoverBackgroundColor: default_colors
                  }],
                }}
                legend={{
                  position: 'left',
                }}
              />
            </div>
            <div className='column' style={{ marginTop: 1 + '%', paddingTop: 0 + '%' }}>
              <h3 style={{ marginTop: 0 + 'px' }}>Personal Repos</h3>
              <Doughnut
                data={{
                  labels: personalRepoLanguageArray,
                  datasets: [{
                    data: personalRepoLanguageCount,
                    backgroundColor: default_colors,
                    hoverBackgroundColor: default_colors
                  }],
                }}
                legend={{
                  position: 'left',
                }}
              />
            </div>
          </div>          
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