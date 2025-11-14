import { Card, CardContent } from "@/components/ui/card";
import { Users, DoorOpen, GraduationCap, Calendar } from "lucide-react";

interface StatsProps {
  teachersCount: number;
  roomsCount: number;
  groupsCount: number;
  scheduledClasses: number;
}

export const DashboardStats = ({ 
  teachersCount, 
  roomsCount, 
  groupsCount, 
  scheduledClasses 
}: StatsProps) => {
  const stats = [
    {
      label: "Teachers",
      value: teachersCount,
      icon: Users,
      color: "from-primary to-primary/80",
    },
    {
      label: "Rooms",
      value: roomsCount,
      icon: DoorOpen,
      color: "from-accent to-accent/80",
    },
    {
      label: "Groups",
      value: groupsCount,
      icon: GraduationCap,
      color: "from-success to-success/80",
    },
    {
      label: "Scheduled Classes",
      value: scheduledClasses,
      icon: Calendar,
      color: "from-warning to-warning/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label}
            className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
