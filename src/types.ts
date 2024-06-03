export interface ServerToClientEvents {
    clients: (
        err: any,
        clients: any
    ) => void;
    exchange: (messageData:{
        to: string,
        from: string,
    }) => void;
  }

export interface ClientToServerEvents {
    join: (
        roomID: string,
        callback: (socketIds: string[])=>void
    ) => void;
    exchange: (messageData:any) => void;
  }
