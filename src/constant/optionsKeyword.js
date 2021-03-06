
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

//Repo Type
export const OWNED_REPO = 'OwnedRepos';
export const FORKED_REPO = 'ForkedRepos';

export const LANGUAGES_OPTIONS = [
    { text: 'All', value: 'All' },
    { text: 'C', value: 'C' },
    { text: 'C#', value: 'C#' },
    { text: 'C++', value: 'C++' },
    { text: 'Clojure', value: 'Clojure' },    
    { text: 'CSS', value: 'CSS' },    
    { text: 'Dart', value: 'Dart' },
    { text: 'Elixir', value: 'Elixir' },    
    { text: 'Erlang', value: 'Erlang' },
    { text: 'Golang', value: 'Golang' },
    { text: 'Haskell', value: 'Haskell' },
    { text: 'HTML', value: 'HTML' },    
    { text: 'Java', value: 'Java' },
    { text: 'Javascript', value: 'Javascript' },
    { text: 'Objective-C', value: 'Objective-C' },    
    { text: 'PHP', value: 'PHP' },    
    { text: 'Python', value: 'Python' },
    { text: 'Ruby', value: 'Ruby' },
    { text: 'Rust', value: 'Rust' },
    { text: 'Scala', value: 'Scala' },    
    { text: 'Shell', value: 'Shell' },    
    { text: 'Swift', value: 'Swift' },
    { text: 'Typescript', value: 'Typescript' },    
    { text: 'Vue', value: 'Vue' },
];

export const MIN_STARS_OPTIONS = [
    { text: '-', value: 200 },
    { text: 'At Least 10,000 Stars', value: 10000 },
    { text: 'At Least 8,000 Stars', value: 8000 },
    { text: 'At Least 5,000 Stars', value: 5000 },
    { text: 'At Least 3,000 Stars', value: 3000 },
    { text: 'At Least 1,000 Stars', value: 1000 },
];

export const MAX_STARS_OPTIONS = [
    { text: '-', value: 500000 },
    { text: 'At Most 50,000 Stars', value: 50000 },
    { text: 'At Most 25,000 Stars', value: 25000 },
    { text: 'At Most 10,000 Stars', value: 10000 },
    { text: 'At Most 8,000 Stars', value: 8000 },
    { text: 'At Most 5,000 Stars', value: 5000 },
    { text: 'At Most 3,000 Stars', value: 3000 },
    { text: 'At Most 1,000 Stars', value: 1000 },
];

export const REPO_SEARCH_OPTIONS = [
    { text: 'Owned Repos', value: OWNED_REPO },
    { text: 'Forked Repos', value: FORKED_REPO },    
]

export const TRENDING_OPTION = [
    { text: 'This Month', value: MONTH_VALUE },
    { text: 'This Quarter', value: QUATER_VALUE },
    { text: 'This Year', value: YEAR_VALUE },
    { text: 'Last Month', value: LAST_MONTH_VALUE },
    { text: 'Last Quarter', value: LAST_QUATER_VALUE },
    { text: 'Last Year', value: LAST_YEAR_VALUE },
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
