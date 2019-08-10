// Third party modules
import { firestore } from 'firebase';

// Dashboard hub models
import { AccessModel } from './access.model';
import { IMonitor, MonitorModel } from './monitor.model';
import { PingModel } from './ping.model';
import { ProjectTokenModel } from './project-token.model';

/**
 * Interface for project
 */
export interface IProject {
  uid?: string;
  type?: 'private' | 'public';
  title?: string;
  description?: string;
  url?: string;
  access?: AccessModel;
  repositories?: string[];
  monitors?: IMonitor[];
  pings?: PingModel[];
  tokens?: ProjectTokenModel[];
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
}

/**
 * Project class model
 */
export class ProjectModel {
  uid: string;
  type: 'private' | 'public';
  title: string;
  description: string;
  url?: string = '';
  access?: AccessModel;
  repositories: string[];
  monitors: MonitorModel[];
  pings: PingModel[] = [];
  tokens: ProjectTokenModel[] = [];
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;

  /**
   * Life cycle method
   * @param project project
   */
  constructor(project: IProject) {
    this.uid = project.uid;
    this.type = project.type ? project.type : 'public';
    this.title = project.title ? project.title : undefined;
    this.description = project.description ? project.description : undefined;
    this.url = project.url ? project.url : undefined;
    this.access = project.access ? project.access : new AccessModel();
    this.repositories = project.repositories ? project.repositories : [];
    this.monitors = project.monitors ? project.monitors.map((monitor: IMonitor) => new MonitorModel(monitor)) : [];
    this.pings = project.pings ? project.pings : [];
    this.tokens = project.tokens ? project.tokens : [];
    this.createdOn = project.createdOn ? project.createdOn : undefined;
    this.updatedOn = project.updatedOn ? project.updatedOn : undefined;
  }

  /**
   * Function to return the total ping count for each project
   */
  public getTotalPings(): number {
    let total: number = 0;
    this.monitors.forEach((monitor: MonitorModel) => monitor.getTotalPings());

    return total;
  }
}
