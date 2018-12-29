import { AuthenticationService } from './../authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GitHubCore } from './github.core';
import { map, mergeMap, toArray, tap } from 'rxjs/operators';
import { RepositoryModel, PullRequestModel } from '../../models/index.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GitHubRepositoryService extends GitHubCore {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {
        super();
    }

    public findAll(): Observable<RepositoryModel[]> {
        return this.http
            .get(`${this.url}/users/${this.authService.profile.username}/repos`)
            .pipe(
                mergeMap((repositories: any) => repositories),
                map((repository: any) => ({
                        id: repository.id,
                        name: repository.name,
                        description: repository.description,
                        fullName: repository.full_name,
                        owner: repository.owner.login,
                        private: repository.private,
                        fork: repository.fork,
                        archived: repository.archived,
                        forks: repository.forks_count,
                        stargazers: repository.stargazers_count,
                        watchers: repository.watchers_count,
                        branch: repository.default_branch,
                        issues: repository.open_issues_count,
                        license: repository.license,
                    }) as RepositoryModel),
                toArray(),
            );
    }

    // @TODO: move to function after repo is added?
    public findAllOpenPullRequests(fullName: string): Observable<any> {
        console.log('calling to github repo', `${this.url}/repos/${fullName}/pulls?state=open`);
        return this.http
            .get(`${this.url}/repos/${fullName}/pulls?state=open`)
    }
}
