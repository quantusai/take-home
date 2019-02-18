
type Environment = 'development'|'staging'|'production'; 
type Encoding = 'utf8'|'latin1'; 

export interface Source {
    id: string,
    name: string,
    environment: Environment,
    encoding: Encoding,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
}


type Status = 'error' | 'enqueued' | 'processing' | 'finished';
export interface Message {
    id: string,
    source_id: string,
    message: string,
    status: Status,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
}