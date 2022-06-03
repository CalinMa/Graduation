export interface TimeTracking 
{
    id?: number;
    name?: string;
    date?: string;
    description?: string;
    hours?: number;

    preparingDelete?: boolean;
    isEditing?: boolean;
}
