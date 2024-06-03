export interface ServerToClientEvents {
    clients: (
        err: any,
        clients: any
    ) => void;
    offer: (description: any) => void;
    answer: (description: any) => void;
    ice_candidate: (data: any) => void;
    ready: (msg: string) => void;
  }

export interface ClientToServerEvents {
    join: (
        roomID: string,
        callback: (socketIds: string[])=>void
    ) => void;
    answer: (room: string, description: any) => void;
    ice_candidate: (room: string, data: any) => void;
    hangup: (room: string) => void;
    offer: (room: string, description: any) => void;
  }
