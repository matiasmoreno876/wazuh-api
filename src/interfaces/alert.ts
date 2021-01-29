export interface Alert {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: Source;
}

export interface Source {
    id: string;
    '@sampledata': boolean;
    timestamp: string;
    rule: Rule;
    agent: Agent;
    manager: Manager;
    cluster: Cluster;
    predecoder?: string;
    decoder?: string;
    data?: string;
    location: string;
    syscheck: Syscheck;
}

export interface Rule {
    firedtimes: number;
    mail: boolean;
    level: number;
    pci_dss: string[];
    hipaa: string[];
    description: string;
    groups: string[];
    id: string;
    nist_800_53: string[];
    gpg13: string[];
    gdpr: string[];
}

export interface Agent {
    id: string;
    name: string;
    ip: string;
    total_alerts?: number;
}

export interface Manager {
    name: string;
}

export interface Cluster {
    name: string;
}

export interface Syscheck {
    event: string;
    path: string;
    uname_after: string;
    gname_after: string;
    mtime_after: Date;
    size_after: number;
    uid_after: string;
    gid_after: string;
    perm_after: string;
    inode_after: number;
    mtime_before?: Date;
    inode_before?: number;
    sha1_after: string;
    changed_attributes: string[];
    md5_after: string;
    sha256_after: string;
    tags: string[];
    audit: Audit;
}

export interface Audit {
    process: Process;
    effective_user: EffectiveUser;
    user: User;
    group: Group;
}

export interface Process {
    name: string;
    id: number;
    ppid: number;
}

export interface EffectiveUser {
    name: string;
    id: number;
}

export interface User {
    name: string;
    id: number;
}

export interface Group {
    name: string;
    id: number;
}

