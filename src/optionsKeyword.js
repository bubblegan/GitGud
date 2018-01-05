
//View Types
export const VIEW_TYPE_FORK = "Total Fork";
export const VIEW_TYPE_LAST_UPDATE = "Last Update";
export const VIEW_TYPE_CREATED_AT = "Create At";
export const VIEW_TYPE_WATCH = "Total Watchers";
export const VIEW_TYPE_ISSUE = "Total Open Issues";
export const VIEW_TYPE_BUGS= "Total Open Bugs"
export const VIEW_TYPE_HELP = "Total Help Wanted"
export const VIEW_TYPE_GRABS = "Total Up-For-Grabs"
export const VIEW_TYPE_PR = "Total Pull Request";
export const VIEW_TYPE_SIZE = "Repo Size";
export const VIEW_LANGUAGE = "Primary Language";

//Date Dropdown Values
export const MONTH_VALUE = "month";
export const QUATER_VALUE = "quater";
export const YEAR_VALUE = "year";
export const LAST_MONTH_VALUE = "last_month";
export const LAST_QUATER_VALUE = "last_quater";
export const LAST_YEAR_VALUE = "last_year";


export const LANGUAGES_OPTIONS = [
    { text: 'All', value: 'All' },
    { text: 'Javascript', value: 'Javascript' },
    { text: 'Typescript', value: 'Typescript' },
    { text: 'Python', value: 'Python' },
    { text: 'C#', value: 'C#' },
    { text: 'Ruby', value: 'Ruby' },
    { text: 'HTML', value: 'HTML' },
    { text: 'CSS', value: 'CSS' },
    { text: 'Golang', value: 'Golang' },
    { text: 'Java', value: 'Java' },
    { text: 'PHP', value: 'PHP' },
    { text: 'Shell', value: 'Shell' },
    { text: 'C', value: 'C' },
    { text: 'C++', value: 'C++' },
    { text: 'Clojure', value: 'Clojure' },
    { text: 'Scala', value: 'Scala' },
    { text: 'Erlang', value: 'Erlang' },
    { text: 'Elixir', value: 'Elixir' },
    { text: 'Vue', value: 'Vue' },
    { text: 'Objective-C', value: 'Objective-C' },
    { text: 'Swift', value: 'Swift' },
    { text: 'Dart', value: 'Dart' },
    { text: 'Haskell', value: 'Haskell' },
];

export const MIN_STARS_OPTIONS = [{ text: '-', value: '0' },
{ text: 'At Least 10,000 Stars', value: 10000 },
{ text: 'At Least 8,000 Stars', value: 8000 },
{ text: 'At Least 5,000 Stars', value: 5000 },
{ text: 'At Least 3,000 Stars', value: 3000 },
{ text: 'At Least 1,000 Stars', value: 1000 },
];

export const MAX_STARS_OPTIONS = [{ text: '-', value: 500000 },
{ text: 'At Most 50,000 Stars', value: 50000 },
{ text: 'At Most 25,000 Stars', value: 25000 },
{ text: 'At Most 10,000 Stars', value: 10000 },
{ text: 'At Most 8,000 Stars', value: 8000 },
{ text: 'At Most 5,000 Stars', value: 5000 },
{ text: 'At Most 3,000 Stars', value: 3000 },
{ text: 'At Most 1,000 Stars', value: 1000 },
];

//TODO : Of course there is more Topics, I havent Figure out how-to include it yet. :P
export const TOPIC_OPTIONS = [
    { text: 'Testing', value: 'Testing' },
    { text: 'Frontend', value: 'Frontend' },
    { text: 'Machine Learning', value: 'Machine Learning' },
    { text: 'React', value: 'React' },
    { text: 'Angular', value: 'Angular' },
    { text: 'Vue', value: 'Vue' },
    { text: 'Ui', value: 'Ui' },
    { text: 'Library', value: 'Library' },
];

export const TRENDING_OPTION = [
    { text: 'Trending This Month', value: MONTH_VALUE },
    { text: 'Trending This Quater', value: QUATER_VALUE },
    { text: 'Trending This Year', value: YEAR_VALUE },
    { text: 'Trending Last Month', value: LAST_MONTH_VALUE },
    { text: 'Trending Last Quater', value: LAST_QUATER_VALUE },
    { text: 'Trending Last Year', value: LAST_YEAR_VALUE },
];

export const VIEW_OPTION = [
    { text: VIEW_TYPE_FORK, value: VIEW_TYPE_FORK },
    { text: VIEW_TYPE_LAST_UPDATE, value: VIEW_TYPE_LAST_UPDATE },
    { text: VIEW_TYPE_CREATED_AT, value: VIEW_TYPE_CREATED_AT },
    { text: VIEW_TYPE_WATCH, value: VIEW_TYPE_WATCH },
    { text: VIEW_TYPE_ISSUE, value: VIEW_TYPE_ISSUE},
    { text: VIEW_TYPE_BUGS, value: VIEW_TYPE_BUGS},
    { text: VIEW_TYPE_HELP, value: VIEW_TYPE_HELP},
    { text: VIEW_TYPE_GRABS, value: VIEW_TYPE_GRABS},    
    { text: VIEW_TYPE_PR, value: VIEW_TYPE_PR},
    { text: VIEW_TYPE_SIZE, value: VIEW_TYPE_SIZE},
    { text: VIEW_LANGUAGE, value: VIEW_LANGUAGE},
    
]
