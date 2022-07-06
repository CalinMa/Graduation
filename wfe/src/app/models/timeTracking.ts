export interface TimeTracking 
{
    id?: number;
    name?: string;
    date?: string;
    description?: string;
    hours?: number;
    userId?: number;
    preparingDelete?: boolean;
    isEditing?: boolean;
}
