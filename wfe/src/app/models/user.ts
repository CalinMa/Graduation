export interface User {
    id: number;
    userName?:string;
    name: string;
    password?:string
    firstName: string;
    email: string;
    roleId: number;
    role: {
      id: number;
      roleName: string;
    }
    isEditing?: boolean;
    preparingDelete?: boolean;
  }
  