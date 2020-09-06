import { Users } from './users.model';

export class Repos {
    id: string;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner:Users ;
    html_url:string ;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url:string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url:string;
    git_tags_url:string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    User:Users;
    
}
