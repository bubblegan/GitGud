import React from 'react'
import format from 'date-fns/format'
import { Dimmer, Loader, Label } from 'semantic-ui-react'
import { VIEW_TYPE_WATCH, 
         VIEW_TYPE_CREATED_AT, 
         VIEW_TYPE_LAST_UPDATE, 
         VIEW_TYPE_FORK, 
         VIEW_TYPE_ISSUE, 
         VIEW_TYPE_PR, 
         VIEW_TYPE_SIZE,
         VIEW_TYPE_BUGS,
         VIEW_TYPE_GRABS,
         VIEW_TYPE_HELP,
         VIEW_LANGUAGE } from '../constant/optionsKeyword';
import InfiniteScroll from 'react-infinite-scroller';

//Thousand Separator Function
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const extraContentGenerator = (viewType, item) => {

  const totalStarView = <span> {numberWithCommas(item.stargazers.totalCount)} <i className="star icon"></i> </span>;

  const bugIssueUrl = item.bugIssues.totalCount > 0 ? <a href={item.url+'/issues?q=is%3Aissue+is%3Aopen+label%3Abug'} target="_blank"> Bug Reported </a> : <span> Bug Reported </span> 
  const helpWantedUrl = item.helpWantedIssues.totalCount > 0 ?  <a href={item.url+'/issues?q=is%3Aissue+is%3Aopen+label%3A"help+wanted"'} target="_blank">  Help Wanted </a> : <span>  Help Wanted </span> 
  const issueUrl = item.issues.totalCount > 0 ?  <a href={item.url+'/issues'} target="_blank">  Issues </a> : <span>  Issues </span> 
  const grabUrl = item.upForGrabIssues > 0 ?  <a href={item.url+'/issues?q=is%3Aissue+is%3Aopen+label%3AUp-For-Grabs"'} target="_blank">  Up-For-Grabs </a> : <span>  Up-For-Grabs </span> 

  let extraContent = null;

  switch (viewType) {
    case VIEW_TYPE_WATCH:
      extraContent = <span className="right floated"> {numberWithCommas(item.watchers.totalCount)} Watchers </span>;
      break;
    case VIEW_TYPE_CREATED_AT:
      extraContent = <span className="right floated"> Created At {format((item.createdAt), "MMM YYYY")} </span>;
      break;
    case VIEW_TYPE_LAST_UPDATE:
      extraContent = <span className="right floated"> Last Update At {format((item.pushedAt), "MMM YYYY")} </span>;
      break;
    case VIEW_TYPE_FORK:
      extraContent = <span className="right floated"> {numberWithCommas(item.watchers.totalCount)} Forks </span>;
      break;
    case VIEW_TYPE_ISSUE:
      extraContent = <span className="right floated"> {numberWithCommas(item.issues.totalCount)} {issueUrl} </span>;
      break;
    case VIEW_TYPE_GRABS:
      extraContent = <span className="right floated"> {numberWithCommas(item.upForGrabIssues.totalCount)} {grabUrl} </span>;
    break;
      case VIEW_TYPE_HELP:
      extraContent = <span className="right floated"> {numberWithCommas(item.helpWantedIssues.totalCount)} {helpWantedUrl} </span>;
    break;
      case VIEW_TYPE_BUGS:
      extraContent = <span className="right floated"> {numberWithCommas(item.bugIssues.totalCount)} {bugIssueUrl} </span>;
      break;
    case VIEW_TYPE_PR:
      extraContent = <span className="right floated"> {numberWithCommas(item.pullRequests.totalCount)} Pull Request </span>;
      break;
    case VIEW_TYPE_SIZE:
      extraContent = <span className="right floated"> {numberWithCommas(item.diskUsage)} KB</span>;
      break;
    case VIEW_LANGUAGE:
      let languageUsed = item.primaryLanguage ? item.primaryLanguage.name : "No Language Used";
      extraContent = <span className="right floated">{languageUsed}</span>;
      break;
    default:
      break;
  }
  return (
    <div>
      {totalStarView}
      {extraContent}
    </div>
  );
}

function RepoResultList({ loading, search, fetchMore, viewType }) {
  
  //Determine normal search or nested inside user
  let hasNextPage = false;

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>);
  } 
  else if (search) {

    let itemList = null;

    //Determine normal search or nested inside user
    if(search.nodes[0] && search.nodes[0].__typename === 'User'){
      itemList = search.nodes[0].repositories.nodes;
      hasNextPage = search.nodes[0].repositories.pageInfo.hasNextPage;        
    } else{
      itemList = search.nodes;
      if(search.pageInfo){
        hasNextPage = search.pageInfo.hasNextPage;        
      }
    }


    const nodeList = itemList.map((item) => {
      let topicLabels = null;

      //Get Topic
      if (item.repositoryTopics.nodes) {
        topicLabels = item.repositoryTopics.nodes.map((topic) => {
          return <Label color='teal' style={{ margin: 2 + 'px' }} key={topic.topic.id + '_' + topic.topic.name} horizontal> {topic.topic.name}</Label>;
        });
      }

      //Change Views
      let extraContentView = extraContentGenerator(viewType, item);

      return (
        <div className='card' key={item.id + '_' + item.name}>
          <div className="content">
            <img className="right floated mini ui image" src={item.owner.avatarUrl} alt="avatar" />
            <a className="header" href={item.url} target="_blank">{item.name} </a>
            <div className="meta">
              <a href={item.owner.url} target="_blank" >{item.owner.login}</a>
            </div>
            <div className="description" style={{overflowWrap : 'break-Word'}}>
              <p>{item.description}</p>
              {topicLabels}
            </div>
          </div>
          <div className="extra content">
            {extraContentView}
          </div>
        </div>
      )
    });
    
    return (
      <InfiniteScroll
        loadMore={fetchMore}
        hasMore={hasNextPage}
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

export default RepoResultList;