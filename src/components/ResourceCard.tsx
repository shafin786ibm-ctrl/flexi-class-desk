import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  name: string;
  info?: string;
  availability?: string;
}

interface ResourceCardProps {
  title: string;
  resources: Resource[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  icon: React.ReactNode;
}

export const ResourceCard = ({ 
  title, 
  resources, 
  onAdd, 
  onEdit, 
  onDelete,
  icon 
}: ResourceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <Button onClick={onAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resources.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No {title.toLowerCase()} added yet
            </p>
          ) : (
            resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{resource.name}</p>
                  {resource.info && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {resource.info}
                    </p>
                  )}
                  {resource.availability && (
                    <p className="text-xs text-success mt-1">
                      {resource.availability}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(resource.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(resource.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
