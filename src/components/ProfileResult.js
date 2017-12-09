import React from 'react'
import Chart from './FrappeChart'
import { SEARCH_PROFILE_WITH_NAME } from '../queries';
import { graphql } from 'react-apollo';


function ProfileCard({ loading, search }) {
  if (loading) {
    return <p> loading.... </p>;
  } else if (search.nodes.length > 0) {
    const item = search.nodes[0];

    return (
      <div className="ui cards">
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
              {item.followers.totalCount} Followers
          </a>
          </div>
        </div>

        <div className="ui card">
          <div className="content">
          <Chart
            title="Repos Languages"
            type="pie"
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
              datasets:[ {
                title: "Some Data",
                values: [25, 40, 30, 35, 8, 52, 17, -4]
              }]               
            }}
            onSelect={a => console.log(a.index)}
          />
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